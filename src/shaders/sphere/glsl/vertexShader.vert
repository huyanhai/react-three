uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vPoint;

#include "lygia/generative/fbm.glsl";
#include "lygia/generative/cnoise.glsl";

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    vec3 myPosition = position;

    // modelViewMatrix 模型视图矩阵 模型和相机
    // 每个顶点都是这样的操作
    gl_Position = projectionMatrix * modelViewMatrix * vec4(myPosition, 1.0);

}