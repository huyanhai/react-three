uniform float uTime;
uniform vec2 uMouse;

#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef USE_SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
varying vec3 vBitangent;
varying vec2 vUv;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

#include "lygia/generative/fbm.glsl"
#include "lygia/generative/cnoise.glsl"

float draw_line(vec2 uv, float offset) {
	return smoothstep(0., 0.5 + offset * 0.5, 0.6 * abs(sin(uv.x * 30.) + offset * .5));
}

float hue2rgb(float f1, float f2, float hue) {
	if(hue < 0.0)
		hue += 1.0;
	else if(hue > 1.0)
		hue -= 1.0;
	float res;
	if((6.0 * hue) < 1.0)
		res = f1 + (f2 - f1) * 6.0 * hue;
	else if((2.0 * hue) < 1.0)
		res = f2;
	else if((3.0 * hue) < 2.0)
		res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
	else
		res = f1;
	return res;
}

vec3 hsl2rgb(vec3 hsl) {
	vec3 rgb;

	if(hsl.y == 0.0) {
		rgb = vec3(hsl.z); // Luminance
	} else {
		float f2;

		if(hsl.z < 0.5)
			f2 = hsl.z * (1.0 + hsl.y);
		else
			f2 = hsl.z + hsl.y - hsl.y * hsl.z;

		float f1 = 2.0 * hsl.z - f2;

		rgb.r = hue2rgb(f1, f2, hsl.x + (1.0 / 3.0));
		rgb.g = hue2rgb(f1, f2, hsl.x);
		rgb.b = hue2rgb(f1, f2, hsl.x - (1.0 / 3.0));
	}
	return rgb;
}

vec3 hsl2rgb(float h, float s, float l) {
	return hsl2rgb(vec3(h, s, l));
}

void main() {
	vec4 diffuseColor = vec4(diffuse, opacity);
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
	float sheenEnergyComp = 1.0 - 0.157 * max3(material.sheenColor);
	outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
	float dotNVcc = saturate(dot(geometryClearcoatNormal, geometryViewDir));
	vec3 Fcc = F_Schlick(material.clearcoatF0, material.clearcoatF90, dotNVcc);
	outgoingLight = outgoingLight * (1.0 - material.clearcoat * Fcc) + (clearcoatSpecularDirect + clearcoatSpecularIndirect) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

	#ifdef DITHERING
	gl_FragColor.rgb = vec4(1.0, 1.0, 1.0, 1.0);
	#endif

	float bm = draw_line(cnoise(vUv + uTime * 0.01) * vec2(0.5, 0.5), 2.0);

	vec2 center = vec2(0.5, 0.5);

	vec2 v = vUv;

	v.x *= 2.0;

	vec2 pos = mod(v * 8.0, 1.0);


	float d = distance(pos, center);
	
	float n = cnoise(floor(v));
	float left = step(0.25 + n, d);

	gl_FragColor.a = 1.0 - left;
	gl_FragColor = linearToOutputTexel(gl_FragColor);
}