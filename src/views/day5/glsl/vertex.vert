varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    v_uv = uv;
    v_normal = normal;
    v_position = newPosition;
}