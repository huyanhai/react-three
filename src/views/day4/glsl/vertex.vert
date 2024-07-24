varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_uv = uv;
    v_normal = normal;
}