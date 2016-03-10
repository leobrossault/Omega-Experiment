import THREE from 'three';

export default class Halo extends THREE.Object3D {
  constructor(camera, c, p) {
    super();

    this.geometry = new THREE.SphereGeometry(16, 32, 32);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        "c":   { type: "f", value: c },
        "p":   { type: "f", value: p },
        glowColor: { type: "c", value: new THREE.Color(0x00FFCF) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader: document.getElementById('halo-vertex').textContent,
    	fragmentShader: document.getElementById('halo-fragment').textContent,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.halo = new THREE.Mesh(this.geometry, this.material);
    this.add(this.halo);
  }

  update(c, p) {
    this.material.uniforms.c.value = c;
    this.material.uniforms.p.value = p;
  }
}
