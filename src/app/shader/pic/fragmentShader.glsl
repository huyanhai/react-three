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

    // 屏幕uv
    // vec2 uv = (gl_FragCoord.xy - 100.0) / (uScreen + 200.0);
    // 获取当前片元的坐标
    vec2 uv = vUv;

    vec2 distortion = u_strength * vec2(sin(uTime + uv.x * 10.0 + uv.y * 8.0), sin(uTime + uv.x * 10.0 + uv.y * 10.0));

    distortion *= mix(0.0, 1.5, rand2(uv * 0.1));

    // 红色通道
    vec4 redChannel = samplerImg(uv + distortion * rotation2d(10.0));
    redChannel.g = 0.0;
    redChannel.b = 0.0;

    // 绿色通道
    vec4 greenChannel = samplerImg(uv - distortion * rotation2d(20.0));
    greenChannel.r = 0.0;
    greenChannel.b = 0.0;

    // 蓝色通道
    vec4 blueChannel = samplerImg(uv + distortion * rotation2d(30.0));
    blueChannel.r = 0.0;
    blueChannel.g = 0.0;

    vec4 mixin = redChannel + greenChannel + blueChannel;

    gl_FragColor = mixin;
}