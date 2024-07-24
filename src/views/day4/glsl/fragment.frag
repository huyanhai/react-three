varying vec2 v_uv;
varying vec3 v_normal;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_camera;
uniform float u_aspect;
uniform vec3 u_lightColor;
uniform sampler2D u_env;

// 辅助函数：计算球体的有符号距离场
float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// 辅助函数：最小化两个距离场
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

float sdf(vec3 pos) {
    vec3 translatedPos = pos + vec3(sin(u_time), 0.0, 0.0);

    float sphere = sdSphere(translatedPos, 0.5);
    float secondSphere = sdBox(pos, vec3(0.4));

    return smin(secondSphere, sphere, 0.3);
}

// 辅助函数：计算表面法线
vec3 calcNormal(vec3 p) {
    vec2 eps = vec2(0.0001, 0.0);
    return normalize(vec3(sdf(p + eps.xyy) - sdf(p - eps.xyy), sdf(p + eps.yxy) - sdf(p - eps.yxy), sdf(p + eps.yyx) - sdf(p - eps.yyx)));
}

// 辅助函数：计算光照
vec3 lighting(vec3 ro, vec3 r) {
    vec3 normal = calcNormal(r);
    vec3 viewDir = normalize(ro - r);

    // Step 1: Ambient light
    vec3 ambient = vec3(1.0);

    // Step 2: Diffuse lighting
    vec3 lightDir = normalize(vec3(1, 1, 1));
    vec3 lightColor = u_lightColor;
    float dp = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = dp * lightColor;

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

    // Lighting is a mix of ambient, hemi, diffuse, then specular added at the end
    vec3 lighting = ambient * 0.;
    lighting += diffuse * 0.5;
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
    int MAX_STEPS = 100;
    float MIN_DIST = 0.001;
    float MAX_DIST = 50.0;
    for(int i = 0; i < MAX_STEPS; i++) {
        // 物体的距离
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

    vec3 ray = rayPosition + rayDirection * rayMarch(rayPosition, rayDirection);

    // 计算光照
    vec3 color = lighting(rayPosition, ray);

    gl_FragColor = vec4(color, 1.0);

}