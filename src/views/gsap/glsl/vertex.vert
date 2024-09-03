varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

void main() {
    vec3 newPosition = position;
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    v_uv = uv;
    v_normal = normal;
    v_position = newPosition;
    v_mvPosition = mvPosition;
}