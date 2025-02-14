#include "lygia/generative/cnoise.glsl";
#include "lygia/space/rotate.glsl";
#include "lygia/generative/fbm.glsl";

// uniform float uTime;
// uniform vec2 uMouse;

// varying vec3 vPosition;
varying vec2 vUv;

// void main() {
//     // mvPosition.y += (cos(normal.x * 10.0 + uTime) - 0.5) * 0.1;
//     // mvPosition.z += sin(normal.z * 20.0 + uTime) * 0.2;
//     // mvPosition += (cnoise(mvPosition.xyz + uTime) - 0.5) * 0.05;

//     // gl_Position = projectionMatrix * mvPosition;

//     // vPosition = mvPosition.xyz;
//     vNormal = normal;
//     vUv = uv;
// }

varying float vPattern;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseStrength;
uniform float uDisplacementStrength;
uniform float uFractAmount;

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec3 fade(vec3 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float smoothMod(float axis, float amp, float rad) {
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float getDisplacement(vec3 position) {
    vec3 pos = position;
    pos.y -= uTime * 0.2;
    pos.z += uTime * 0.02;
    pos.x += uTime * 0.2;
    pos += cnoise(pos * 0.55) * 1.0;

    return smoothMod(pos.y * 1.0, 1., 1.5) * 1.0;
}

void main() {
    vec4 tangent = vec4(1.0);
    vec3 biTangent = cross(csm_Normal, tangent.xyz);
    float shift = 0.01;
    vec3 posA = csm_Position + tangent.xyz * shift;
    vec3 posB = csm_Position + biTangent * shift;

    float pattern = getDisplacement(csm_Position);
    vPattern = pattern;

    csm_Position += csm_Normal * pattern;
    posA += csm_Normal * getDisplacement(posA);
    posB += csm_Normal * getDisplacement(posB);

    vec3 toA = normalize(posA - csm_Position);
    vec3 toB = normalize(posB - csm_Position);

    vUv = uv;

    csm_Normal = normalize(cross(toA, toB));

    vNormal = csm_Normal;
}