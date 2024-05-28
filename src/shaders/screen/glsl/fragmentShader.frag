uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uTexture;
uniform sampler2D uTexture1;
uniform float uProgression;
uniform float uStep;

varying vec2 vUv;

#include "lygia/generative/fbm.glsl"

void main(void) {
	vec2 uv = vUv;

	vec4 _texture = texture2D(uTexture, uv);
	vec4 _texture1 = texture2D(uTexture1, uv);

	vec4 color = vec4(step(0.5, fbm(vec3(uv * 5.0, uTime)) * .1 + uProgression));

	vec4 final = mix(_texture, _texture1, color);

	gl_FragColor = final;
}