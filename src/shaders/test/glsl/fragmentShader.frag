uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;

varying vec2 vUv;

#include "lygia/generative/fbm.glsl"
void main(void) {

	vec2 uv = fract(vUv * 50.0);

	vec2 s = vec2(step(0.1, fbm(vUv + uTime * 0.01)));

	vec3 color = vec3(s.y);

	gl_FragColor = vec4(uColor, min(uAlpha, s.y));
}