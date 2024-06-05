uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform float uProgression;
uniform float uStep;

varying vec2 vUv;
varying vec3 vPosition;

#include "lygia/space/rotate.glsl"
#include "lygia/generative/fbm.glsl"

float DistLine(vec2 p, vec2 a, vec2 b) {
	vec2 pa = p - a;
	vec2 ba = b - a;
	float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
	return length(pa - ba * t);
}

float Line(vec2 p, vec2 a, vec2 b) {
	float d = DistLine(p, a, b);
	float m = smoothstep(0.02, 0.01, d);
	return m;
}

float line1(vec2 uv, float offset) {
	return smoothstep(
		0., 
		0.5 + offset * 0.5, 
		0.6*abs(sin(uv.x * 30.) + offset * .5)
	);
}

mat2 rotate2D(float angle) {
	return mat2(
	cos(angle), -sin(angle), 
	sin(angle), cos(angle)
	);
}

void main(void) {

	float f = fbm(vUv+uTime*0.1);

	vec2 uv = rotate2D(f) * vPosition.xy*0.1;

	float n = line1(uv, 0.4);
	float n1 = line1(uv, 0.5);

	vec3 color1 = vec3(1.0, 0.0, 0.0);
	vec3 color2 = vec3(0.0, 1.0, 0.0);
	vec3 color3 = vec3(0.0, 0.0, 1.0);

	vec3 c = mix(color1, color2, n);
	vec3 c1 = mix(c, color3, n1);

	gl_FragColor = vec4(c1, 1.0);
}