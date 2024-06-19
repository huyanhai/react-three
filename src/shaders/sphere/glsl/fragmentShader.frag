uniform float uTime;
uniform vec3 uCameraPosition;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

uniform vec3 uLightPosition1;
uniform vec3 uLightColor1;

uniform vec3 uLightPosition2;
uniform vec3 uLightColor2;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uTexture;

#define CAMERA_POSITION uCameraPosition
#define TONEMAP_FNC tonemapACES
#define RESOLUTION          vec2(1920,1080)
#define RAYMARCH_SAMPLES    200
#define RAYMARCH_MULTISAMPLE 1
#define RAYMARCH_BACKGROUND ( vec3(0.4588, 0.4588, 0.0784) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.949, 0.0, 0.0)

#include "lygia/lighting/diffuse.glsl";
#include "lygia/lighting/pbr.glsl";
#include "lygia/lighting/material/new.glsl"
#include "lygia/color/tonemap.glsl";
#include "lygia/lighting/material/normal.glsl";
#include "lygia/color/space/linear2gamma.glsl"

#include  "lygia/lighting/raymarch.glsl"


vec4 raymarchMap(in vec3 pos) {
	vec4 res = vec4(1.0);
	return res;
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

	final.rgb = diffuseTerm * uLightColor + diffuseTerm1 * uLightColor1 + diffuseTerm2 * uLightColor2;

	Material material = materialNew();
	// material.albedo.rgb = final.rgb;
	// 环境光
	// material.emissive.rgb = final.rgb;
	material.normal = vNormal;
	material.metallic = 0.9;
	material.roughness = .0;
	material.ambientOcclusion = 1.0;

	final = pbr(material);

	final.rgb = final.rgb * raymarch(uCameraPosition, vUv).rgb;

	final = linear2gamma(final);

	// 融合
	// smin()

	gl_FragColor = final;
}