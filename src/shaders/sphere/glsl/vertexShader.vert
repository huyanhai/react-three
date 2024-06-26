uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vPoint;

#include "lygia/generative/fbm.glsl";

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    vec3 myPosition = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(myPosition, 1.0);

}