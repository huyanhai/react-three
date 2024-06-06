uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform float uProgression;
uniform float uStep;

varying vec2 vUv;

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

void main() {
	vec2 uv = vUv;
	uv = uv * 5.0;

	vec2 st = fract(uv);

	st = st - 0.5;

	// vec3 color = vec3(0.0);

	// color.rg = st - 0.5;

	// float d = length(st);

	vec3 color = vec3(0.0);

	float l = distance(vec2(sin(uTime) / 2.0, cos(uTime) / 2.0), st);

	float d = smoothstep(0.1, 0.09, l);
	color.r = d;
	color.g = d;
	color.b = d;

	gl_FragColor = vec4(color, 1.0);
}