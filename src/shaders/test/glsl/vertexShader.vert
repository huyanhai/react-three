varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}