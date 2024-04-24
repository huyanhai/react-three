varying vec2 u_uv;
varying vec3 u_normal;
varying vec3 u_position;

void main() {
    u_uv = uv;
    u_normal = normal;
    u_position = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}