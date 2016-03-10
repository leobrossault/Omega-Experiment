import THREE from 'three';

export default class WaterLightHalo extends THREE.Object3D {
  constructor(size, camera) {
    super();

    this.geometry = new THREE.SphereGeometry(size, 32, 32);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        "c":   { type: "f", value: 0.1 },
        "p":   { type: "f", value: 2.8 },
        glowColor: { type: "c", value: new THREE.Color(0x00FFCF) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader: document.getElementById('halo-vertex').textContent,
      fragmentShader: document.getElementById('halo-fragment').textContent,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.waterLightHalo = new THREE.Mesh(this.geometry, this.material);
    this.add(this.waterLightHalo);
  }

  update(c, p) {
    this.material.uniforms.c.value = c;
    this.material.uniforms.p.value = p;
  }
}
