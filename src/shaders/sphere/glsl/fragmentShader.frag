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

vec3 light() {

	vec3 u_MaterialColor = vec3(1.0);

	vec3 lightDir = normalize(uLightPosition - vPosition);
	vec3 lightDir1 = normalize(uLightPosition1 - vPosition);
	vec3 lightDir2 = normalize(uLightPosition2 - vPosition);

	vec3 viewDir = normalize(uCameraPosition - vPosition);

	float diffuseTerm = diffuse(lightDir, vNormal, viewDir, 0.);
	 // 计算光源方向
	vec3 lightDir = normalize(uLightPosition - gl_FragCoord.xyz);

    // 计算漫反射光照
	float diff = max(dot(n, lightDir), 0.0); // 仅考虑正面光照

    // 计算镜面反射（简化版）
	vec3 viewDir = normalize(-(gl_FragCoord.xyz));
	vec3 reflectDir = reflect(-lightDir, n);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32); // 镜面高光

    // 计算最终颜色
	vec3 objectColor = u_MaterialColor * diff * uLightColor;
	vec3 specularColor = vec3(1.0) * spec * uLightColor; // 假设白色高光

    // 将漫反射和镜面反射颜色与 MatCap 颜色结合
	return objectColor + specularColor;
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

	// final.rgb = diffuseTerm * uLightColor + diffuseTerm1 * uLightColor1 + diffuseTerm2 * uLightColor2;

	Material material = materialNew();
	// material.albedo.rgb = final.rgb;
	// 环境光
	// material.emissive.rgb = final.rgb;
	// material.normal = vNormal;
	// material.metallic = 0.9;
	// material.roughness = .0;
	// material.ambientOcclusion = 1.0;

	// final = pbr(material);

	// final = linear2gamma(final);

	// final = texture2D(uTexture, vPoint);
	final.rgb = raymarchCast(uCameraPosition, vNormal).rgb;

    // 使用 MatCap 纹理来获取颜色
	vec4 matcapColor = texture2D(uTexture, matcapUv());

	// 融合
	// smin()

	gl_FragColor = vec4(light() * matcapColor.rgb, matcapColor.a);
}