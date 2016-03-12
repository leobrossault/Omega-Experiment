import THREE from 'three';

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry(15, 32, 32);
    this.material = new THREE.MeshBasicMaterial( {color: 0x00FFCF} );

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.add(this.sphere);
  }

  update() {

  }
}
