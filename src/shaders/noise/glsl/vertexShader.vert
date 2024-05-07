varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;

uniform float u_time;
uniform float u_speed;
uniform float u_roughness;
uniform float u_thickness;

#include "lygia/generative/fbm.glsl"

void main() {

    vec3 myPosition = position;

    float radio = 1.0;

    // float time = u_time * 0.1;

    // float noise = fbm(position * time * u_speed * 0.6);
    // float noise1 = fbm(position * time * u_speed * 2.0);

    // radio *= mix(1.0 - u_roughness, 1.0 + u_roughness, noise);
    // radio *= mix(1.0 - u_thickness, 1.0 + u_thickness, noise1);

    // myPosition *= radio;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(myPosition, 1.0);

    // uv
    v_uv = uv;
    // 法线
    v_normal = normal;
    // 位置
    v_position = myPosition;

    v_radio = radio;
}