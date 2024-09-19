varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

uniform float u_aspect;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;
uniform float u_delta;

void main() {

    vec2 uv = v_uv;
    vec3 color = vec3(sin(u_time * 0.5), cos(u_time * 0.5), 1.0);
    float stripes = smoothstep(.95, 1., sin(v_position.z * 50. - u_time));
    float fadeOut = smoothstep(-.9, .1, v_position.z);
    gl_FragColor.rgba = vec4(fadeOut * .9 * stripes * color, 1.);
}