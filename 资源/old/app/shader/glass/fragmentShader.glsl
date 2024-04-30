uniform float uTime;
uniform vec2 uScreen;
uniform vec2 u_mouse;

uniform sampler2D u_texture;

varying vec2 vUv;

#define PI 3.141592653589
#define COUNT 32.0

#define NUM_OCTAVES 5

void main() {
    // 获取当前片元的坐标
    vec2 uv = vUv;

    // y轴翻转
    uv.y = 1.0 - uv.y;

    // floor 向下取整 3.14 -> 3.0
    // ceil 向上取整 3.14 -> 4.0
    float x = floor(uv.x * 12.0) / 12.0;
    float y = floor(uv.y * 12.0) / 12.0;

    vec2 distortion = 0.1 * vec2(sin(uTime + x), cos(uTime + y));

    vec4 color = texture2D(u_texture, uv + distortion);

    gl_FragColor = color;
}