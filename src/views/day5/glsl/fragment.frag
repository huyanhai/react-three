varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

uniform float u_aspect;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

#include "lygia/generative/fbm.glsl"
#include "lygia/generative/gnoise.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/space/rotate.glsl"

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

    vec2 uv = v_uv;
    uv = uv * 2.0 - 1.0;

    uv.x *= u_aspect;

    uv = rotate(uv, u_time * 0.01);

    float dist = distance(u_mouse, uv);

    float strenth = smoothstep(0.0, 0.2, dist);

    float n = mix(0.01, 0.02, strenth) * random(uv);

    vec3 hsv1 = vec3(0.0);

    float f = 0.0;
    f += fbm(uv * 0.2);
    f += fbm(vec2(f) / 0.1);
    f += gnoise(vec2(f + strenth, f + strenth));
    f += n;
    f += u_time * 0.05;

    f = fract(f);

    vec3 middleColor = vec3(1.0, 0.0, 0.0);
    vec3 endColor = vec3(0.0, 0., 1.0);

    vec3 startColor = mix(endColor, middleColor, smoothstep(0.05, 0.1, f));

    vec3 mixColor = mix(startColor, endColor, smoothstep(0.1, 0.15, f));

    float mixer = smoothstep(0., 0.1, f) - smoothstep(0.1, .2, f);

    vec3 finally = mix(hsv1, mixColor, mixer);

    gl_FragColor = vec4(finally, 1.0 - f);
}