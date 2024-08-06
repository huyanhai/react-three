varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec4 v_mvPosition;

#define PI 3.14159265359

uniform float u_delta;
uniform vec2 u_move;

#include "lygia/generative/cnoise.glsl";

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + sin(uv.y * 3.14159265359) * offset.x;
    position.y = position.y + sin(smoothstep(0.1, 0.9, fract(uv.x * 5.0)) * 3.14159265359) * offset.y;
    return position;
}

void main() {
    vec3 newPosition = position;
    newPosition = deformationCurve(newPosition, uv, vec2(0, u_delta * 200.0));
    // newPosition.xy += cnoise(u_move);
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    v_uv = uv;
    v_normal = normal;
    v_position = newPosition;
    v_mvPosition = mvPosition;
}