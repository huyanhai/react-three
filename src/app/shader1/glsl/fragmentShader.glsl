uniform float uTime;
uniform vec2 uScreen;
uniform vec2 u_mouse;
uniform float u_strength;

uniform sampler2D u_nextTexture;
uniform sampler2D u_texture;

varying vec2 vUv;

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

void main() {
    vec2 uv = vUv;

    uv -= 0.5;
    // 生成波浪效果
    float water = fbm(10.0 * uv + 2.0 + uTime);
    float strength = smoothstep(0.5, 1.0, u_strength);
    float distortion = mix(1.0, 1.2 * strength, water);
    uv *= distortion;
    uv += 0.5;

    // 清除拉伸的区域
    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
    }

    vec4 current = texture2D(u_texture, uv);
    vec4 next = texture2D(u_nextTexture, uv);

    float mixin = step(smoothstep(0.1, 0.7, sin((u_strength - 10.0) / 10.0)), water);

    vec4 color = mix(current, next, mixin);

    gl_FragColor = color;
}