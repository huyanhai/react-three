#define MAX 3
#define NUM_OCTAVES 5

uniform float u_time;
uniform vec2 u_screen;
uniform vec2 u_mouse;
uniform float u_strength;

uniform sampler2D u_textures[MAX];

uniform float u_start;
uniform float u_end;
uniform vec3 u_light;
uniform vec3 u_camera;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;

void main() {
    vec2 uv = v_uv;

    vec4 color1 = vec4(0.0, 1.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 0.0, 1.0, 1.0);

    vec4 color = mix(color1, color2, step(1.0, v_radio));

    gl_FragColor = color;
}