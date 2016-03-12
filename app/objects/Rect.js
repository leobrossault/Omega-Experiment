import THREE from 'three';

export default class Rect extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(25, 0.5, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x342C3C,
      transparent: true
    });
    this.rect = new THREE.Mesh(this.geometry, this.material);
    this.rect.rotation.x -= 1.5;
    this.add(this.rect);

    this.posY = 0;
  }

  update() {
    this.position.y += 0.05;

    // if (this.position.y > 22 && this.position.y < 25) {
    //   if (this.posY != Math.round(this.position.y)) {
    //     this.material.opacity -= 0.1;
    //   }
    // } else if (this.position.y >= 0 && this.position.y < 5) {
    //   if (this.posY != Math.round(this.position.y)) {
    //     this.material.opacity += 0.1;
    //   }
    // }
    //
    // this.posY = Math.round(this.position.y);

    if (this.position.y > 25) {
      this.position.y = 0.6;
    }
  }
}
