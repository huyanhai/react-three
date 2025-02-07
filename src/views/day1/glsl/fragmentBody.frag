

// gl_FragColor =vec4(color, 1.0);

// uniform float uTime;
// uniform vec2 uMouse;

// varying vec3 vPosition;
// varying vec2 vUv;

// #include "lygia/generative/cnoise.glsl";

// vec3 palette(float t) {
//     vec3 a = vec3(0.5, 0.5, 0.5);
//     vec3 b = vec3(0.5, 0.5, 0.5);
//     vec3 c = vec3(1.0, 1.0, 1.0);
//     vec3 d = vec3(0.263, 0.416, 0.557);
//     return a + b * cos(6.28318 * (c * t + d));
// }
// void main() {
//     float n = cnoise(vPosition);

//     vec3 color = palette(n);

//     gl_FragColor = mix(gl_FragColor, vec4(color, 1.0), -1.0);
// }

varying vec2 vUv;
void main() {
    // float x = step(0.9, fract(vUv.y * 100.0));
    // vec3 color = csm_Position * x;

    // csm_DiffuseColor = csm_DiffuseColor + ;
}