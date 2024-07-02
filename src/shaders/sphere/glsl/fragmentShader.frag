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
	vec3 color = uColor;
	// 高光颜色
	vec3 specularColor = vec3(1.0);
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

	color = blinnPhoneLight(color, specularColor, lightColor, normal, lightDir, viewDir, uCameraPosition, uCubeMap, roughness, metallic);

	// 计算折射
	// refract();

	// 折射方向向量
	// float ior = 1.52; // 折射率
	// vec3 refractedDirection = refract(uCameraPosition, normal, ior);
	// // 折射后看到的颜色
	// vec4 color2 = texture(uCubeMap, refractedDirection);

	// // 控制折射的透明度
	// color2.a *= 0.1;

	// float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 5.0);

	// vec4 finallyColor = mix(color2, vec4(color, 1.0), fresnel);

	// gl_FragColor屏幕上的每一个像素
	gl_FragColor = vec4(color, 1.0);

}
