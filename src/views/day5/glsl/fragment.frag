varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

uniform sampler2D u_texture;
uniform float u_aspect;
uniform float u_delta;
uniform vec2 u_mouse;

#define UNIT 4.0

#include 'lygia/generative/cnoise.glsl'

vec3 rgbShift(sampler2D img, float delta) {
    delta *= UNIT;
    float r = texture2D(img, vec2(v_uv.x, v_uv.y - delta)).r;
    vec2 gb = texture2D(img, v_uv).gb;
    return vec3(r, gb);
}

void main() {
    vec2 _uv = v_uv;

    gl_FragColor = vec4(rgbShift(u_texture, u_delta), 1.0);
}