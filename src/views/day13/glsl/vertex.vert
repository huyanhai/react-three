varying vec2 vUv;
varying float vDistance;

uniform float uRadius;
uniform float uTime;
uniform sampler2D uPositions;

mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

void main() {
    vUv = uv;

    vec3 pos = texture2D(uPositions, position.xy).xyz;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 3.0;
    // gl_PointSize *= step(1.0 - (1.0 / 64.0), position.x) + 0.5;
}
