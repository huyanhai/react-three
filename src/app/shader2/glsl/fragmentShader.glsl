#define MAX 3
#define NUM_OCTAVES 5

uniform float uTime;
uniform vec2 uScreen;
uniform vec2 u_mouse;
uniform float u_strength;

uniform sampler2D u_textures[MAX];

uniform float u_start;
uniform float u_end;

varying vec2 u_uv;
varying vec3 u_normal;

void main() {
    vec2 uv = u_uv;

    vec4 color = texture2D(u_textures[1], u_normal.xz);

    gl_FragColor = color;
}