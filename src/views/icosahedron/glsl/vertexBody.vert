
//  = cnoise(mvPosition * uTime * 0.01) * normal;
// mvPosition += fbm(normal);
// mvPosition += (cnoise(mvPosition.xyz + uTime) - 0.5) * 0.05;
mvPosition.y += (cos(normal.x * 10.0 + uTime) - 0.5) * 0.1;
mvPosition.z += sin(normal.z * 20.0 + uTime) * 0.2;

gl_Position = projectionMatrix * mvPosition;