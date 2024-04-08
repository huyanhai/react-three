uniform float uTime;
uniform vec2 uScreen;

uniform sampler2D u_texture;

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

// 255.0 / 255.0 颜色值转换
vec4 rgb(float r, float g, float b) {
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

void main() {
    // 获取当前片元的坐标
    vec2 st = gl_FragCoord.xy / uScreen;

    vec2 uv = fract(st * .1 + sin(uTime * 0.1));
    // st *= 1.0;

    // 整数部分
    vec2 intNum = floor(st);
    // 小数部分
    vec2 docNum = fract(st);
    vec4 pic = texture2D(u_texture, uv);

    float disY = mix(-0.5, 0.5, uv.x);

    // 将贴图中的红色过滤掉
    // pic.x = 0.0;

    vec4 tl = rgb(251.0, 41., 212.);
    vec4 tr = rgb(0., 255.0, 224.);
    vec4 bl = rgb(250., 255., 0.0);
    vec4 br = rgb(231.0, 244.0, 255.0);

    vec4 color = mix(mix(tl, tr, pic.x - 0.5), mix(bl, br, pic.x - 0.5), pic.y);

    gl_FragColor = color;
}