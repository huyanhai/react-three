
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(1., 0., 0., 1.0);
}