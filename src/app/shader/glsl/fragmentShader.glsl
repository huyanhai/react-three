uniform float uTime;
uniform float u_dpi;
uniform vec2 uScreen;
uniform vec2 u_mouse;

uniform sampler2D u_texture;

#define PI 3.141592653589
#define COUNT 10.0

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
    vec2 uv = gl_FragCoord.xy / uScreen;

    uv *= 2.0;
    uv -= 1.0;

    vec2 mouse = u_mouse / uScreen;

    float radius = length(uv) * mix(1.0, 2.0, mouse.x);
    float angle = atan(uv.y, uv.x);

    angle /= PI * 2.0;
    angle *= COUNT;

    if(mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }

    angle += uTime * 0.2;
    angle += mouse.y;

    angle /= COUNT;
    angle *= PI * 2.0;

    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    point = fract(point);

    vec4 color = texture2D(u_texture, point);

    gl_FragColor = color;
}