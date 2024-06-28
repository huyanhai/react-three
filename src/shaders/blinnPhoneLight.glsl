// 漫反射
vec3 diffuse(inout vec3 color, vec3 lightColor, vec3 normal, vec3 lightDir, float roughness) {
	// 结果用来确定光线与表面法线之间的角度关系。这个值的范围是 [-1, 1]
	// 当点积为1时，表示光线垂直于表面法线，即光线直接照射到表面上，这是最大漫反射光照强度。
	// 当点积为0时，表示光线与表面法线正交，即光线平行于表面，不会产生漫反射。
	// 当点积为-1时，表示光线与表面法线方向相反，即光线从表面反射回光源方向

	// roughness表示漫反射的强度
	float nDotL = max(0.0, dot(normal, lightDir));
	return color * lightColor * nDotL * roughness;
}

// 反射光
/*
	color: 高光颜色
	lightColor: 灯光颜色
	normal: 表面法线
	lightDir: 灯光方向
	viewDir: 观察者方向
	shininess: 光泽度
*/
vec3 specular(inout vec3 color, vec3 lightDir, vec3 normal, vec3 viewDir, float shininess) {
	// 计算灯光的反射向量
	vec3 reflectDir = reflect(-lightDir, normal);
	// 计算反射向量和观察者向量的夹角的cos值
	// 值为0时，反射光与观察者向量垂直，此时反射光强度最大
	float vDotr = max(dot(reflectDir, viewDir), 0.0);
	return color * pow(vDotr, shininess);
}

// 环境光
vec3 ambient(vec3 color) {
	// 环境光强度
	float ambientStrength = 0.2;
	// 环境光颜色与强度相乘得到最终的环境光颜色
	return color * ambientStrength;
}

/*
	Phong光照模型
	color: 物体颜色
	specularColor: 高光颜色
	lightColor: 灯光颜色
	normal: 表面法线
	lightDir: 灯光方向
	viewDir: 观察者方向
	roughness: 粗糙度
	shininess: 光泽度 - 值越大，光点越强
*/
vec3 blinnPhoneLight(vec3 color, vec3 specularColor, vec3 lightColor, vec3 normal, vec3 lightDir, vec3 viewDir, float roughness, float shininess) {
	vec3 diff = diffuse(color, lightColors[0], normal, lightDir, roughness);

	vec3 spec = specular(specularColor, lightDir, normal, viewDir, shininess);
	
	vec3 amb = ambient(color);

	return diff + spec + amb;
}
