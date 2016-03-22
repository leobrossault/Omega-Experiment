import THREE from 'three';
import Water from '../shader/water';

export default class Plane extends THREE.Object3D {
  constructor(renderer, camera, scene) {
    super();

    // Load textures
    THREE.ImageUtils.crossOrigin = '';
    this.waterNormals = THREE.ImageUtils.loadTexture('http://leobrossault.github.io/images/waternormals.jpg');
    this.waterNormals.wrapS = this.waterNormals.wrapT = THREE.RepeatWrapping;

    this.directionalLight = new THREE.DirectionalLight(0xe92121, 1);
    this.directionalLight.position.set(0, 100, 0);
    this.directionalLight.rotation.x += 1.5;
    this.add(this.directionalLight);

    this.ms_Water = new THREE.Water(renderer, camera, scene, {
      waterNormals: this.waterNormals,
      alpha: 1,
      sunDirection: this.directionalLight.position.normalize(),
      sunColor: 0x342C3C,
			waterColor: 0x342C3C,
    });

    this.castShadow = true;

    this.aMeshMirror = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(80, 80),
      this.ms_Water.material
    );
    this.aMeshMirror.add(this.ms_Water);
    this.aMeshMirror.rotation.x -= 1.5;
    this.add(this.aMeshMirror);
  }

  update() {
    this.ms_Water.material.uniforms.time.value += 1.0 / 120.0;
    this.ms_Water.render();
  }
}
