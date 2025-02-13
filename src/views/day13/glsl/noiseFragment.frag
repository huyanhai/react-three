varying float vDistance;
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform sampler2D uPositionA;
uniform sampler2D uPositionB;

#include "lygia/generative/random.glsl"
#include "lygia/generative/curl.glsl"

void main() {
    // float random = random(vec3(vUv, 1.));
    // vec3 color = curl(vec3(uv,uTime * 0.01));
    vec3 color = texture2D(uPositionA, vUv).rgb;
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - strength;
    // strength = pow(strength, 3.0);

    // color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.5);
    // color = mix(vec3(0.0), color, strength);
    // gl_FragColor = vec4(color, strength);

    float time = abs(sin(uTime * 0.35));

    vec3 spherePositions = texture2D(uPositionA, vUv).rgb;
    vec3 boxPositions = texture2D(uPositionB, vUv).rgb;

    vec3 pos = mix(boxPositions, spherePositions, time);

    gl_FragColor = vec4(pos, 1.0);
}
