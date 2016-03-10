import THREE from 'three';

export default class Hide extends THREE.Object3D {
  constructor(camera, c, p, position) {
    super();

    if (position == 'side') {
      this.geometry = new THREE.BoxGeometry(2, 10, 100);
    } else {
      this.geometry = new THREE.BoxGeometry(80, 10, 2);
    }

    this.material = new THREE.MeshBasicMaterial( {color: 0x00FFCF} );
    // this.material = new THREE.ShaderMaterial({
    //   uniforms: {
    //     "c":   { type: "f", value: c },
    //     "p":   { type: "f", value: p },
    //     glowColor: { type: "c", value: new THREE.Color(0x342C3C) },
    //     viewVector: { type: "v3", value: camera.position }
    //   },
    //   vertexShader: document.getElementById('halo-vertex').textContent,
    //   fragmentShader: document.getElementById('halo-fragment').textContent,
    //   side: THREE.FrontSide,
    //   blending: THREE.AdditiveBlending,
    //   transparent: true
    // });
    this.hide = new THREE.Mesh(this.geometry, this.material);
    this.hide.rotation.x += 0.08;
    this.add(this.hide);
  }

  update(c, p, color) {
    // this.material.uniforms.c.value = c;
    // this.material.uniforms.p.value = p;
    // this.material.uniforms.glowColor.value = new THREE.Color(color);
  }
}
