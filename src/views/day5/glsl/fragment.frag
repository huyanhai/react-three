varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

uniform sampler2D u_texture;
uniform float u_aspect;
uniform float u_delta;
uniform vec2 u_mouse;

uniform vec2 u_uv;
uniform vec2 u_move;
uniform float u_time;

#define UNIT 4.0

#include 'lygia/generative/random.glsl'

vec3 rgbShift(sampler2D img, float delta) {

    vec2 uv = v_uv;

    delta *= UNIT;
    float r = texture2D(img, vec2(uv.x, uv.y - delta)).r;
    vec2 gb = texture2D(img, uv).gb;
    return vec3(r, gb);
}


void main() {
    vec2 _uv = v_uv;

    vec3 color = rgbShift(u_texture, u_delta);

    gl_FragColor = vec4(color, 1.0);
}