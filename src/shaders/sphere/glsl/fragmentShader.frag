uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform sampler2D u_tex0;
uniform vec3 u_camera;

#define GLSLVIEWER 311
#define LIGHT_SHADOWMAP u_lightShadowMap
#define LIGHT_SHADOWMAP_SIZE 2048.0
#define MODEL_NAME_DRAGON 
#define MODEL_PRIMITIVE_TRIANGLES 
#define MODEL_VERTEX_COLOR v_color
#define MODEL_VERTEX_NORMAL v_normal
#define PLATFORM_OSX 

#include "lygia/lighting/sphereMap.glsl"

void main(void) {
	vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
	color = sphereMap(u_tex0, vNormal, u_camera);

	gl_FragColor = color;
}