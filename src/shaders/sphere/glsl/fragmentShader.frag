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

vec2 matcapUv() {
	vec3 viewDir = normalize(vPosition);
	vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
	vec3 y = cross(viewDir, x);

	return vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;
}


vec3 light () {

	 // ambient lighting (global illuminance)
  vec3 ambient = vec3(0.5, 0.5, 0.5); // color - grey

  // diffuse (lambertian) lighting
  // lightColor, lightSource, normal, diffuseStrength
  vec3 normal = normalize(vNormal);
  vec3 lightColor = uLightColor; // color - white
  vec3 lightSource = uLightPosition; // coord - (1, 0, 0)
  float diffuseStrength = max(0.0, dot(lightSource, normal));
  vec3 diffuse = diffuseStrength * lightColor;

  // specular light
  // lightColor, lightSource, normal, specularStrength, viewSource
  vec3 cameraSource = uCameraPosition;
  vec3 viewSource = normalize(cameraSource);
  vec3 reflectSource = normalize(reflect(-lightSource, normal));
  float specularStrength = max(0.0, dot(viewSource, reflectSource));
  specularStrength = pow(specularStrength, 256.0);
  vec3 specular = specularStrength * lightColor;

  // lighting = ambient + diffuse + specular
  vec3 lighting = uLightColor; // color - black
  // lighting = ambient;
  // lighting = ambient * 0.0 + diffuse;
  // lighting = ambient * 0.0 + diffuse * 0.0 + specular;
  lighting = ambient * 0.0 + diffuse * 0.5 + specular * 0.5;

  return lighting;
}

void main(void) {



    // 使用 MatCap 纹理来获取颜色
	vec4 matcapColor = texture2D(uTexture, matcapUv());

	// 融合
	// smin()

	// 光照
	// 环境光（ambient），漫反射光（diffuse），镜面反射光（specular）
	// color = ambient + diffuse + specular

	
	gl_FragColor = matcapColor * vec4(light(), 1.0);
}