uniform float uTime;
uniform vec3 uCameraPosition;

uniform vec3 uLightPosition;
uniform vec3 uLightColor;

uniform vec3 uLightPosition1;
uniform vec3 uLightColor1;

uniform vec3 uLightPosition2;
uniform vec3 uLightColor2;

uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

#define CAMERA_POSITION uCameraPosition
#define TONEMAP_FNC tonemapACES
#define RESOLUTION          vec2(1920,1080)

#define LIGHT_COLOR         vec3(0.95, 0.65, 0.5)

#define RAYMARCH_SAMPLES 100
#define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

#include "lygia/lighting/diffuse.glsl";
#include "lygia/lighting/pbr.glsl";
#include "lygia/lighting/material/new.glsl"
#include "lygia/color/tonemap.glsl";
#include "lygia/lighting/material/normal.glsl";
#include "lygia/color/space/linear2gamma.glsl"

#include  "lygia/lighting/raymarch.glsl"
#include  "lygia/lighting/raymarch/cast.glsl"
#include "lygia/sdf.glsl"

float sdSphere(vec3 p, float s) {
	return length(p) - s;
}

vec4 raymarchMap(in vec3 pos) {
	vec4 res = vec4(1.0);
	return res;
}

vec2 matcapUv() {
	vec3 viewDir = normalize(vPosition);
	vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
	vec3 y = cross(viewDir, x);

	return vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;
}

void main(void) {

	vec4 final = vec4(0.0, 0.0, 0.0, 1.0);

	vec3 lightDir = normalize(uLightPosition - vPosition);
	vec3 lightDir1 = normalize(uLightPosition1 - vPosition);
	vec3 lightDir2 = normalize(uLightPosition2 - vPosition);

	vec3 viewDir = normalize(uCameraPosition - vPosition);

	float diffuseTerm = diffuse(lightDir, vNormal, viewDir, 0.);
	float diffuseTerm1 = diffuse(lightDir1, vNormal, viewDir, 0.);
	float diffuseTerm2 = diffuse(lightDir2, vNormal, viewDir, 0.);



    // 使用 MatCap 纹理来获取颜色
	vec4 matcapColor = texture2D(uTexture, matcapUv());

	// 融合
	// smin()

	// 光照
	// 一个叫做环境光（ambient），一个叫做漫反射光（diffuse），一个叫做镜面反射光（specular）
	// color = ambient + diffuse + specular

	// 环境光的计算

	vec3 result = vec3(1.0);

	// 环境光 - 光照颜色*光照强度
	vec3 _ambient = uLightColor * 0.5;

	// 漫反射
	vec3 _normal = normalize(vNormal);
	vec3 _lightDir = normalize(uLightPosition - vPosition); // 灯光到物体顶点的距离
	float _diff = max(dot(_lightDir, _normal), 0.0);
	vec3 _diffuse = _diff * uLightColor;

	// 镜面反射
	float _specularStrength = 1.0; // 镜面反射强度
	vec3 _reflect = normalize(reflect(-_lightDir, _normal));
	vec3 _viewDir = normalize(uCameraPosition - vPosition); //相机到物体顶点的距离
	float _specular = pow(max(dot(_reflect, _viewDir), 0.0), 100.0);
	vec3 _specularColor = uLightColor * _specularStrength * _specular;

	// 最终颜色
	result = _ambient + _diffuse + _specularColor;

	gl_FragColor = matcapColor * vec4(pow((result), vec3(1.0 / 2.2)), 1.0);
}