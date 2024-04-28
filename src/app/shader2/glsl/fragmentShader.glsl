#define MAX 3
#define NUM_OCTAVES 5

uniform float u_time;
uniform vec2 u_screen;
uniform vec2 u_mouse;
uniform float u_strength;

uniform sampler2D u_textures[MAX];

uniform float u_start;
uniform float u_end;
uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform vec3 u_camera;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;

struct Light {
    vec3 position;
    vec3 color;
};

vec3 addLight(Light l) {
    float strength = 0.9;
    vec3 color = strength * l.color;

    vec3 L = normalize(l.position - v_position);

    float diffScore = max(dot(L, v_normal), 0.0);
    vec3 diffColor = diffScore * l.color;

    return color * diffColor;
}

void main() {
    vec2 uv = v_uv;

    vec3 l = addLight(Light(vec3(-10.0, 0.0, 5.0), vec3(1.0, 0.0, 0.0)));
    vec3 l1 = addLight(Light(vec3(10.0, 0.0, 5.0), vec3(0.0, 1.0, 0.0)));

    vec4 color1 = vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color2 = vec4(0.0, 1.0, 0.0, 1.0);

    vec4 color = mix(color1, color2, step(1.0, v_radio));
    vec3 obj = color.rgb;



    gl_FragColor = vec4(obj + l + l1, 1.0);
}