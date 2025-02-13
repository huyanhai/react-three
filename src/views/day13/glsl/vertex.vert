varying vec2 vUv;
varying vec3 vPositions;

uniform sampler2D uPositions;

void main() {
    vUv = uv;

    vec3 pos = texture2D(uPositions, position.xy).xyz;
    vPositions = pos;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    float size = 10.0;

    if(pos.x == 0. && pos.y == 0. && pos.z == 0.) {
        size = 0.;
    }

    gl_Position = projectedPosition;
    gl_PointSize = size;
}
