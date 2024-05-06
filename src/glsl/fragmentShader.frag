// #ifdef GL_ES
// precision mediump float;
// #endif

uniform float u_time;
uniform float u_roughness;
uniform float u_thickness;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;

#include "lygia/generative/fbm.glsl"

void main(void) {

	vec3 color1 = u_color1;
	vec3 color2 = u_color2;

	// 1.0 * u_time * 0.5

	vec3 color = mix(color1, color2, step(u_time, fbm(v_position * 1.0) * 0.5 + 0.5));

	gl_FragColor = vec4(color, 1.0);
}