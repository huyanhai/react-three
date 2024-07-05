uniform float uTime;
uniform vec3 uCameraPosition;
uniform vec3 uColor;

uniform sampler2D uTexture;
uniform sampler2D uEnv;
uniform samplerCube uCubeMap;
uniform sampler2D uWl;

// lights
uniform vec3 lightPosition;
uniform vec3 lightColor;

// uv相当于是纹理坐标
varying vec2 vUv;
// 顶点法线
varying vec3 vNormal;
// 顶点坐标
varying vec3 vPosition;

// 使用贴图代替
// vec3 albedo = pow(texture(albedoMap, vUv).rgb, 2.2);
// float metallic = texture(metallicMap, vUv).r;
// float roughness = texture(roughnessMap, vUv).r;
// float ao = texture(aoMap, vUv).r;

const float PI = 3.14159265359;

vec3 envmap_func(const in vec3 _normal, const in float _roughness, const in float _metallic) {
	return texture(uCubeMap, _normal).rgb * _roughness;
}

#define SURFACE_POSITION vPosition
#define IBL_LUMINANCE 0.1
#define LIGHT_COLOR lightColor
#define SHADING_MODEL_CLOTH uColor
#define ENVMAP_FNC(_normal, _roughness, _metallic) envmap_func(_normal, _roughness, _metallic)

#define FNC_SAMPLE(TEX, UV) texture(TEX, UV)
#define LIGHT_POSITION lightPosition
#define CAMERA_POSITION uCameraPosition
#define ATMOSPHERE_LIGHT_SAMPLES 8
#define TONEMAP_FNC tonemapACES

#define position vPosition

#include "../../../blinnPhoneLight.glsl";
#include "lygia/lighting/fresnel.glsl"
#include "lygia/lighting/pbrGlass.glsl"
#include "lygia/lighting/material/new.glsl"

void main() {
	vec3 newLightPosition = lightPosition;

	// 物体颜色
	vec4 color = vec4(uColor, 1.0);
	// 高光颜色
	vec4 specularColor = vec4(1.0);
	// 环境贴图图
	vec3 envMap = texture2D(uEnv, vUv).rgb;

	vec4 wl = texture2D(uWl, fract(vUv * 5.0));

	// 物体表面粗糙度
	float roughness = 1.0;
	// 金属度
	float metallic = 100.0;

	// 法线单位向量
	vec3 normal = normalize(vNormal);
	// 视角单位向量
	vec3 viewDir = normalize(uCameraPosition - vPosition);
	// 光源到物体的单位向量
	vec3 lightDir = normalize(newLightPosition - vPosition);
	// 光线到物体的半径
	float distance = length(lightPosition - vPosition);

	vec4 ambientColor = ambient(color);

	// 计算漫反射
	vec4 diffuseCol = diffuse(color, vec4(lightColor, 1.0), normal, lightDir, roughness);

	// 反射颜色
	vec4 specularCol = specular(specularColor, lightDir, normal, viewDir, metallic);

	// 折射颜色
	vec4 refractCol = refractColor(normal, uCameraPosition, uCubeMap);

	// 菲尼尔
	float fresnelNum = fresnel(normal, viewDir);

	// vec4 finallyColor = diffuseCol + specularCol * (1.0 - fresnelNum) + refractCol;
	// 磨损效果
	vec4 finallyColor = (ambientColor + diffuseCol + specularCol) + (wl.r * color);

	// 光滑的金属
	// vec3 reflectDir = -reflect(vPosition, normal);
	// vec3 refractedDirection = refract(uCameraPosition, normal, 1.42);
	// vec4 cube = texture(uCubeMap, refractedDirection);
	// finallyColor = pow(cube, vec4(1.0)); 

	Material m = materialNew();
	m.ior = vec3(1.42);
	m.normal = vNormal;
	m.roughness = 0.9;
	m.metallic = 0.1;

	finallyColor = pbrGlass(m);

	// gl_FragColor屏幕上的每一个像素
	gl_FragColor = finallyColor;

}
