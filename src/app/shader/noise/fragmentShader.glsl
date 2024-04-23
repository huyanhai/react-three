uniform float uTime;
uniform vec2 uScreen;
uniform vec2 u_mouse;

uniform sampler2D u_texture;

varying vec2 vUv;

#define PI 3.141592653589
#define COUNT 32.0

#define NUM_OCTAVES 5

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for(int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

void main() {
    // 获取当前片元的坐标
    vec2 uv = vUv;


    float dist = distance(uv, u_mouse);
    float strenth = smoothstep(0.0, 0.2, dist);
    float hue = uTime * 0.1 + strenth * 0.02;

    vec3 hsv1 = vec3(hue, 1.0, 1.0);
    vec3 hsv2 = vec3(0.2 + hue, 1.0, 1.0);

    vec3 rgb1 = hsv2rgb(hsv1);
    vec3 rgb2 = hsv2rgb(hsv2);

    // uv = -2.0 * uv + 1.0;
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);

    // 小于0.1为0,否则为1 
    // step(0.1,uv.x)

    vec2 move = vec2(sin(uTime * 0.01), cos(uTime * -0.01));

    // 角度旋转
    move *= rotation2d(sin(uTime * 0.5));

    // 添加杂色 
    float grain = mix(-0.01, 0.01, rand(uv));

    // 生成云雾效果
    float f = fbm(uv + move);
    f *= 10.0;
    f += grain;
    f += sin(uTime * 0.1);
    f = fract(f);

    // float mixin = step(0.1, f) - smoothstep(0.2, 0.3, f);

    float mixin = smoothstep(0.0, 0.1, f) - smoothstep(0.1, 0.2, f);

    vec4 color = mix(color1, color2, mixin);

    gl_FragColor = color;
}