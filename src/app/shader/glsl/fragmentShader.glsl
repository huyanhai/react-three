uniform float uTime;
uniform vec2 uScreen;

float plot(vec2 st, float value) {
    // smoothstep(起始值,结束值,当前值) - 当前值小于起始值则返回0，大于结束值则返回1,如果目标值介于起始值和目标值之间，则返回介于0-1之间的值
    return smoothstep(value - 0.01, value, st.x);
    // return step(0.01, abs(st.x - st.y));
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
        43758.5453123);
}

mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722, -0.09991, -0.33609, 0.43600, 0.615, -0.5586, -0.05639);

vec2 gen(vec2 _index, vec2 _dot, bool x) {
    float num = x ? _index.x : _index.y;
    if(mod(num, 2.0) == 0.0) {
        return vec2(0.);
    } else {
        return vec2(1.0);
    }
}

void main() {
    // 获取当前片元的坐标
    vec2 st = gl_FragCoord.xy / uScreen;

    st *= 10.;

    // 整数部分
    vec2 intNum = floor(st);
    // 小数部分
    vec2 docNum = fract(st);

    vec2 num = gen(intNum, docNum, true);
    vec3 color = vec3(num, 0.);
    num = gen(intNum, docNum, false);
    color = color * vec3(num, 0.);

    gl_FragColor = vec4(color.x, 0., 0., 1.0);
}