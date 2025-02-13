varying vec2 vUv;
varying vec3 vPositions;

uniform sampler2D uPositions;

void main() {
    float dis = distance(vPositions, vec3(0.));

    vec3 color = vec3(0.34, 0.53, 0.96);
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 4.0);

    color = mix(vec3(0.97, 0.70, 0.45), color, dis);
    gl_FragColor = vec4(color, strength);
}
