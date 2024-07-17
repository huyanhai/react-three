float n = cnoise(vPosition);

vec3 color = palette(n);

// float d = length(vUv);

gl_FragColor = mix(gl_FragColor, vec4(color, 1.0), -0.5);

gl_FragColor =gl_FragColor;
