varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

uniform sampler2D u_texture;
uniform float u_aspect;

void main() {
    vec2 _uv = v_uv;

    // _uv -= 0.5;
    // _uv *= 2.0;
    // _uv.y /= u_aspect;

    // if(_uv.x < 0.0 || _uv.y < 0.0) {
    //     discard;
    // }

    gl_FragColor = texture2D(u_texture, vec2(v_position.x, v_position.y));
}