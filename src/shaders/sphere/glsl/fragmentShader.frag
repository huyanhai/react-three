uniform float uTime;
uniform vec3 uCameraPosition;

uniform sampler2D uTexture;
uniform sampler2D uEnv;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// 使用贴图代替
// vec3 albedo = pow(texture(albedoMap, vUv).rgb, 2.2);
// float metallic = texture(metallicMap, vUv).r;
// float roughness = texture(roughnessMap, vUv).r;
// float ao = texture(aoMap, vUv).r;

// lights
uniform vec3 lightPositions[4];
uniform vec3 lightColors[4];

const float PI = 3.14159265359;

#include "../../../blinnPhoneLight.glsl";

void main() {
	// 颜色题图
	vec3 color = lightColors[1];
	// 高光颜色
	vec3 specularColor = vec3(1.0);
	// 环境题图
	vec3 envMap = texture2D(uEnv, vUv).rgb;

	// 物体表面粗糙度
	float roughness = 0.5;
	// 金属度
	float metallic = 100.0;

	// 法线单位向量
	vec3 normal = normalize(vNormal);
	// 视角单位向量
	vec3 viewDir = normalize(uCameraPosition - vPosition);
	// 光源到物体的单位向量
	vec3 lightDir = normalize(lightPositions[0] - vPosition);
	// 光线到物体的半径
	float distance = length(lightPositions[0] - vPosition);

	color = blinnPhoneLight(color, specularColor, lightColors[0], normal, lightDir, viewDir, roughness, metallic);
	gl_FragColor = vec4(color, 1.0);

}
