import THREE from 'three';

export default class WaterLight extends THREE.Object3D {
  constructor(size) {
    super();

    this.geometry = new THREE.SphereGeometry(size, 32, 32);
    this.material = new THREE.MeshBasicMaterial( {color: 0x93bbb3} );
    this.waterLight = new THREE.Mesh(this.geometry, this.material);
    this.add(this.waterLight);
  }

  update(color) {
    this.material.color = new THREE.Color(color);
  }
}
