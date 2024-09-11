uniform vec2 center;
uniform float angle;
uniform float scale;
uniform vec2 tSize;
uniform float uTime;

uniform sampler2D tDiffuse;

varying vec2 vUv;
#include "lygia/generative/fbm.glsl"

void main() {
    vec3 color = texture2D(tDiffuse, vUv).rgb;
    float noise = gnoise(vec3(0.0, 100.0, uTime));
    vec2 uv = vUv;

    float strength = 0.1 + 0.2 * gnoise(vec3(0.0, 1.0, uTime));

    float dis = mod(uv.y * 1000.0 + uTime * 0.1, 4.0) < 2.0 ? 1.0 : -1.0;
    uv.x += dis * (1.0 + 4.0 * noise) / tSize.x;
    vec3 lineColor = texture2D(tDiffuse, uv).rgb;

    vec3 finallyColor = color + lineColor * strength;

    gl_FragColor = vec4(finallyColor, 1.0);
}