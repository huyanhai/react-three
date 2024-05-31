uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform float uProgression;
uniform float uStep;

varying vec2 vUv;

// #include "lygia/generative/fbm.glsl"
// #include "lygia/generative/cnoise.glsl"
// #include "lygia/generative/gnoise.glsl"
// #include "lygia/generative/pnoise.glsl"
// #include "lygia/generative/noised.glsl"
#include "lygia/generative/worley.glsl"

void main(void) {
	vec2 uv = vUv;

	vec4 _texture = texture2D(uTexture, uv);
	vec4 _texture1 = texture2D(uTexture1, uv);

	vec4 color = vec4(step(0.5, worley(vec3(uv * 5.0, uTime)) * .1 + uProgression));

	// vec4 color = vec4(step(0.5, pnoise(uv, uv * uTime) * .1 + uProgression));

	vec4 final = mix(_texture, _texture1, color);

	// vec4 noisedColor = vec4(noised(uv), 1.0) * noised(vec3(uv, uTime));

	vec4 v = worley(vec3(uv * 5.0, uTime)) * _texture * _texture1;

	gl_FragColor = v;
}