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

#include "../../node_modules/lygia/generative/fbm.glsl";

void main(void) {

	vec3 color1 = vec3(1.0);
	vec3 color2 = vec3(0.0);

	// 1.0 * u_time * 0.5

	vec3 color = mix(color1, color2, step(0.1, fbm(v_position)));

	gl_FragColor = vec4(color, 1.0);
}