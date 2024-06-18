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

#include "lygia/lighting/diffuse.glsl";
#include "lygia/lighting/pbr.glsl";
#include "lygia/lighting/material/new.glsl"
#include "lygia/color/tonemap.glsl";
#include "lygia/lighting/material/normal.glsl";

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
	material.albedo.rgb = final.rgb;
	// 环境光
	// material.emissive.rgb = final.rgb;
	material.normal = vNormal;
	material.metallic = 0.9;
	material.roughness = .0;
	material.ambientOcclusion = 1.0;

	final = pbr(material);
	final.rgb = tonemap(final.rgb);

	gl_FragColor = final;
}