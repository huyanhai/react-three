varying float vDistance;
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform sampler2D uPositionA;
uniform sampler2D uPositionB;

#include "lygia/generative/random.glsl"
#include "lygia/generative/curl.glsl"

void main() {

    vec3 color = texture2D(uPositionA, vUv).rgb;
    float time = abs(sin(uTime * 0.2));

    float speed = pow(time - 0.5, 2.0) + 1.0;

    vec3 spherePositions = texture2D(uPositionA, vUv).rgb;
    vec3 boxPositions = texture2D(uPositionB, vUv).rgb;

    vec3 pos = mix(boxPositions, spherePositions, speed);

    gl_FragColor = vec4(pos, 1.0);
}
