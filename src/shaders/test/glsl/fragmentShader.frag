uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;

varying vec2 vUv;

#include "lygia/generative/voronoi.glsl"
#include "lygia/generative/curl.glsl"
#include "lygia/generative/worley.glsl"
#include "lygia/math/highPass.glsl"
#include "lygia/color/palette.glsl"

void main(void) {

	// vec2 uv = fract(vUv * 50.0);
	vec2 uv = vUv;

	// vec2 s = vec2(step(0.1, fbm(vUv + uTime * 0.01)));

	// vec3 color = vec3(s.y);

	vec4 final = vec4(1.0, 0.0, 0.0, 1.0);

	float t = uTime * 0.25;

	vec3 c = curl(vec3(uv * 2.0, uTime * 0.05));
	float w = worley(vec3(uv * 20.0 * c.yz + c.x, c.x));
	vec3 v = voronoi(uv * 2.0, w * length(c) * c.r + t);
	vec3 p = palette(v.b * 2.0, vec3(0.7, sin(t * 1.1) * 0.2, 0.0), vec3(0.3, 0.2, cos(t * 1.2)), vec3(sin(t * 0.8), 0.2, 0.3), vec3(0.2, 0.2, cos(t * 0.9)));
	final.r = smoothstep(0.9, 0.91, length(v));
	final.rgb = mix(vec3(0.2) - p, p, final.r);

	gl_FragColor = vec4(vec3(final), min(final.a, uAlpha));
}