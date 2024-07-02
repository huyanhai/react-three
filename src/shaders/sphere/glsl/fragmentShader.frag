uniform float uTime;
uniform vec3 uCameraPosition;
uniform vec3 uColor;

uniform sampler2D uTexture;
uniform sampler2D uEnv;
uniform samplerCube uCubeMap;

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

#include "../../../blinnPhoneLight.glsl";
#include "lygia/lighting/fresnel.glsl"

#define RAYMARCH_MULTISAMPLE 4.0

void raymarchMap() {
}

void main() {
	vec3 newLightPosition = lightPosition;
	// vec3 cube = textureCube(uCubeMap);

	// 颜色题图
	vec4 color = vec4(uColor, 1.0);
	// 高光颜色
	vec4 specularColor = vec4(1.0);
	// 环境题图
	vec3 envMap = texture2D(uEnv, vUv).rgb;

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

	// 计算漫反射
	vec4 diffuseCol = diffuse(color, vec4(lightColor, 1.0), normal, lightDir, roughness);

	// 反射颜色
	vec4 specularCol = specular(specularColor, lightDir, normal, viewDir, metallic);

	// 折射颜色
	vec4 refractCol = refractColor(normal, uCameraPosition, uCubeMap);

	// 菲尼尔
	float fresnelNum = fresnel(normal, viewDir);

	vec4 finallyColor = diffuseCol + specularCol * (1.0 - fresnelNum) + refractCol;

	// gl_FragColor屏幕上的每一个像素
	gl_FragColor = finallyColor;

}
