varying vec2 vUv;
varying float vDistance;
varying vec3 vPosition;

uniform float uRadius;
uniform float uTime;
uniform sampler2D uPositions;

void main() {
    vUv = uv;
    vPosition = position;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
