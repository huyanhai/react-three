varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;
varying float v_radio;

uniform float u_time;
uniform float u_speed;
uniform float u_roughness;
uniform float u_thickness;

#define NUM_OCTAVES 5

float mod289(float x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 perm(vec4 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float noise(vec3 p) {
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for(int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

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