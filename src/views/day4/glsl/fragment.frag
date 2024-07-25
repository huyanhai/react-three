varying vec2 v_uv;
varying vec3 v_normal;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_camera;
uniform float u_aspect;
uniform vec3 u_lightColor;
uniform sampler2D u_env;
uniform samplerCube u_cube;
uniform sampler2D u_matcap;
uniform vec2 u_mouse;
uniform float u_shape;

#define MAX_STEPS 100
#define MIN_DIST 0.001
#define MAX_DIST 50.0

#include "lygia/space/rotate.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/generative/cnoise.glsl"

float dot2(in vec2 v) {
    return dot(v, v);
}
float dot2(in vec3 v) {
    return dot(v, v);
}

// 辅助函数：计算球体的有符号距离场
float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdCappedCone(vec3 p, float h, float r1, float r2) {
    vec2 q = vec2(length(p.xz), p.y);
    vec2 k1 = vec2(r2, h);
    vec2 k2 = vec2(r2 - r1, 2.0 * h);
    vec2 ca = vec2(q.x - min(q.x, (q.y < 0.0) ? r1 : r2), abs(q.y) - h);
    vec2 cb = q - k1 + k2 * clamp(dot(k1 - q, k2) / dot2(k2), 0.0, 1.0);
    float s = (cb.x < 0.0 && ca.y < 0.0) ? -1.0 : 1.0;
    return s * sqrt(min(dot2(ca), dot2(cb)));
}

// 辅助函数：最小化两个距离场
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

float sdf(vec3 pos) {

    vec3 translatedPos = pos;

    translatedPos.x -= u_mouse.x * 2.5;
    translatedPos.y -= u_mouse.y * 2.5;

    translatedPos += scale(translatedPos, sin(u_time) * 0.5 + 1.0);

    float noice = cnoise(translatedPos);
    float sphere = sdSphere(translatedPos, 0.5);

    vec3 r_pos = rotate(pos, u_time, vec3(1.0, 0.0, 1.0));
    r_pos = rotate(pos, u_time * 0.5, vec3(0.0, 1.0, 1.0));
    r_pos = rotate(pos, u_time * 0.5, vec3(1.0, 1.0, 0.0));

    float boxSphere = sdBox(r_pos, vec3(0.7));
    float octahedronSphere = sdOctahedron(r_pos, 1.2);
    float sdCappedSphere = sdCappedCone(r_pos, 0.6, 1.0, 0.5);

    float shape = boxSphere;

    if(u_shape == 0.0) {
        shape = boxSphere;
    }

    if(u_shape == 1.0) {
        shape = octahedronSphere;
    }

    if(u_shape == 2.0) {
        shape = sdCappedSphere;
    }

    return smin(shape, sphere, 0.3);
}

// 辅助函数：计算表面法线
vec3 calcNormal(vec3 p) {
    vec2 eps = vec2(0.0001, 0.0);
    return normalize(vec3(sdf(p + eps.xyy) - sdf(p - eps.xyy), sdf(p + eps.yxy) - sdf(p - eps.yxy), sdf(p + eps.yyx) - sdf(p - eps.yyx)));
}

// 返回vu
vec2 getMatcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt(reflected.z + 1.0);
    return reflected.xy / m + 0.5;
}

float normalLine(vec3 normal) {
    normal = scale(normal, 2.0);
    return (normal.x + normal.y + normal.z);
}

// 辅助函数：计算光照
vec3 lighting(vec3 ro, vec3 r) {
    vec3 normal = calcNormal(r);
    vec3 viewDir = normalize(ro - r);

    // Step 1: Ambient light
    vec3 ambient = texture2D(u_env, v_uv).rgb;

    // Step 2: Diffuse lighting
    vec3 lightDir = normalize(ro);
    vec3 lightColor = u_lightColor;
    float dp = max(dot(lightDir, normal), 0.9);
    vec3 diffuse = dp * lightColor * texture2D(u_matcap, getMatcap(viewDir, normal)).rgb;

    // Step 3: Hemisphere light
    vec3 skyColor = vec3(1.0, 1.0, 1.0);
    vec3 groundColor = vec3(0.102, 0.3176, 0.6);
    float hemiMix = (normal.y * 0.5 + 0.5);
    vec3 hemi = mix(groundColor, skyColor, hemiMix);

    // Step 4: Phong specular
    vec3 ph = normalize(reflect(-lightDir, normal));
    float phongValue = pow(max(dot(viewDir, ph), 0.0), 32.0);
    vec3 specular = vec3(phongValue);

    // Step 5: Fresnel effect
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0);
    specular *= fresnel;

    // 折射 
    vec3 refractedDirection = refract(ro, normal, 1.52);
    vec3 refractedColor = texture(u_cube, refractedDirection).rgb;

    // Lighting is a mix of ambient, hemi, diffuse, then specular added at the end
    vec3 lighting = ambient * 0.;
    lighting += diffuse * 0.9;
    lighting += hemi * 0.2;

    vec3 finalColor = lighting;
    finalColor += specular;

    return finalColor;
}

/**
 * Ray Marching
 * ro: 光线起始位置
 * rd: 光线传播方向
 * 返回光线传播的距离-物体的场景深度
*/
float rayMarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    for(int i = 0; i < MAX_STEPS; i++) {
        // 当前点到物体表面的距离，大于0则在物体外部，小于0在内部，等于0在表面

        float dis = sdf(ro + rd * t);
        if(dis < MIN_DIST || dis > MAX_DIST) {
            break;
        }
        t += dis * 0.5; // 步进
    }
    return t;
}

void main() {

     // 使用片段坐标获取一个适应比例的 UV
     // 将uv转为-1到1的坐标
    vec2 _uv = v_uv * 2.0 - 1.0;
    // 修正画面比例
    _uv.y /= u_aspect;

    // 相机起始位置
    vec3 rayPosition = vec3(0.0, 0.0, -3.0);
    // 相机方向
    vec3 rayDirection = normalize(vec3(_uv, 1.0));

    float rayD = rayMarch(rayPosition, rayDirection);
    vec3 color = vec3(0.0);

    float alpha = 0.0;
    if(rayD < MAX_DIST) {
        vec3 ray = rayPosition + rayDirection * rayD;
        color = lighting(rayPosition, ray);
        color = mix(color, color * 0.90, step(0.1, fract(normalLine(ray) * 20.0)));
        alpha = 1.0;
    }

    gl_FragColor = vec4(color, alpha);

}