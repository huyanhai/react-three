varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

uniform float u_aspect;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;
uniform float u_delta;

#include "lygia/generative/fbm.glsl"
#include "lygia/generative/gnoise.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/space/rotate.glsl"
#include "lygia/math/map.glsl"
#include "lygia/math/saturate.glsl"

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {

    vec2 uv = v_uv;

    float noise = fbm(uv * vec2(70.0, 500.0));
    noise = map(noise, -1., 1., 0., 1.);
    noise = pow(saturate(noise - 0.1), 13.0);
    noise = smoothstep(0.0, 0.04, noise);

    // noise *= smoothstep(.02, .5, uv.x) * smoothstep(.02, .5, 1. - uv.x);
    noise *= smoothstep(.01, .1, uv.y) * smoothstep(.01, .1, 1. - uv.y);

    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, noise * clamp(0.0, 1.0, u_delta));
}