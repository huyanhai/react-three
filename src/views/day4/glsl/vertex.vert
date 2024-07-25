varying vec2 v_uv;
varying vec3 v_normal;

uniform float u_time;

void main() {
    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    v_uv = uv;
    v_normal = normal;
}