uniform float uTime;
uniform vec3 uCameraPosition;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D uTexture;

#include "lygia/lighting/diffuse.glsl";
#include "lygia/lighting/pbr.glsl";
#include "lygia/lighting/material/new.glsl"
#include "lygia/color/tonemap.glsl";

void main(void) {
	vec4 final = vec4(0.0, 0.0, 0.0, 1.0);


	vec3 normal = normalize(vNormal);
	vec3 lightDir = normalize(uLightPosition - vPosition);
	vec3 viewDir = normalize(uCameraPosition - vPosition);

	float diffuseTerm = diffuse(lightDir, vPosition, viewDir, 0.0);
	final.rgb = diffuseTerm * uLightColor;

	Material material = materialNew();
	material.albedo.rgb = final.rgb;
	// material.color.rgb = final.rgb;
	// 环境光
	// material.emissive.rgb = final.rgb;
	material.normal = normalize(vNormal + uTime * 0.01);
	// material.metallic = .0;
	// material.roughness = 0.;
	material.clearCoat = .0;
	material.clearCoatRoughness = 0.1;
	material.ambientOcclusion = 1.0;

	final = pbr(material);
	final.rgb = tonemap(final.rgb);

	gl_FragColor = final;
}