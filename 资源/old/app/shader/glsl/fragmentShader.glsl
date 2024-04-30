uniform float uTime;
uniform vec2 uScreen;
uniform vec2 u_mouse;
uniform float u_strength;

uniform sampler2D u_texture;

varying vec2 vUv;

#define PI 3.141592653589
#define COUNT 32.0

#define NUM_OCTAVES 5

vec4 samplerImg(vec2 uv) {
    vec4 color = texture2D(u_texture, uv);
    if(uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {
        color = vec4(0.0);
    }
    return color;
}

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

float rand2(vec2 seed) {
    return fract(sin(dot(seed.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {

    // 将uv变为 -1.0 ~ 1.0
    vec2 uv = -1.0 + 2.0 * vUv;

    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(1.0, 1.0, 1.0, 1.0);

    float dis = distance(uv, vec2(0.0, 0.0));

    float mixin = step(1.0, dis);
    vec4 color = mix(color1, color2, mixin);

    gl_FragColor = color;
}