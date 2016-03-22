import THREE from 'three';
window.THREE = THREE;
import Plane from './objects/Plane';
import Sphere from './objects/Sphere';
import Rect from './objects/Rect';
import Halo from './objects/Halo';
import Hide from './objects/Hide';
import WaterLight from './objects/WaterLight';
import WaterLightHalo from './objects/WaterLightHalo';
import OrbitControls from './objects/Orbit'

export default class Webgl {
  constructor(width, height) {
    this.params = {
      cSphere: 0.1,
      pSphere: 2.8,
      cwaterLights: 1,
      pwaterLights: 6,
      color: '#93bbb3',
      controls: false
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x342C3C);

    this.clock = new THREE.Clock();
    this.delta = 0;
    this.nbStart = 0;

    // this.composer = null;
    // this.initPostprocessing();

    // SEA
    this.sea = new Plane(this.renderer, this.camera, this.scene, this.directionalLight);
    this.sea.position.set(0, -5, 60);
    this.scene.add(this.sea);

    // SPHERE
    this.sphere = new Sphere();
    this.sphere.position.set(0, 16, 20);
    this.scene.add(this.sphere);

    // HALO
    this.halo = new Halo(this.camera, this.params.cSphere, this.params.pSphere);
    this.halo.position.set(0, 16, 20);
    this.scene.add(this.halo);

    // RECTS
    this.rects = [];
    this.nbRects = 11;
    this.posY = 1.8;

    for (let i = 0; i < this.nbRects; i++) {
      this.rect = new Rect();
      this.rect.position.set(0, this.posY, 38);
      this.posY += 2.2;
      this.rects.push(this.rect);
      this.scene.add(this.rect);
    }

    // HIDE
    this.hides = [];

    for (let k = 0; k < 3; k++) {
      switch (k) {
        case 0:
          this.hide = new Hide(this.camera, this.params.cHide, this.params.pHide, 'side');
          this.hide.position.set(-40, -8.9, 70);
          break;
        case 1:
          this.hide = new Hide(this.camera, this.params.cHide, this.params.pHide, 'behind');
          this.hide.position.set(0, -5, 20);
          break;
        case 2:
          this.hide = new Hide(this.camera, this.params.cHide, this.params.pHide, 'side');
          this.hide.position.set(40, -8.9, 70);
          break;
        default:
          break;
      }

      this.scene.add(this.hide);
      this.hides.push(this.hide);
    }

    // WATER LIGHTS
    this.waterLights = [];
    this.waterLightsHalo = [];

    for (let p = 0; p < 2; p++) {
      switch (p) {
        case 0:
          this.waterLight = new WaterLight(3);
          this.waterLight.position.set(-13, -6, 70);
          this.waterLightHalo = new WaterLightHalo(3, this.camera);
          this.waterLightHalo.position.set(-13, -6, 70);
          break;
        case 1:
          this.waterLight = new WaterLight(2);
          this.waterLight.position.set(15, -5, 60);
          this.waterLightHalo = new WaterLightHalo(2, this.camera);
          this.waterLightHalo.position.set(15, -5, 60);
          break;
        default:
          break;
      }

      // BACKGROUND
      // this.geomBack = new THREE.PlaneGeometry(width, 100, 32);
      // this.matBack = new THREE.MeshPhongMaterial({
      //   color: 0x342C3C,
      // });
      // this.back = new THREE.Mesh(this.geomBack, this.matBack);
      // this.scene.add(this.back);

      // this.light = new THREE.PointLight(0x1059d3, 1, 200);
      // this.scene.add(this.light);

      this.scene.add(this.waterLight);
      this.waterLights.push(this.waterLight);
      this.scene.add(this.waterLightHalo);
      this.waterLightsHalo.push(this.waterLightHalo);
    }

    this.controls = new THREE.OrbitControls(this.camera);
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.controls == true) {
      this.controls.enabled = true;
    } else {
      this.controls.enabled = false;
    }

    this.renderer.render(this.scene, this.camera);

    this.sea.update();
    this.halo.update(this.params.cSphere, this.params.pSphere);

    for (let l = 0; l < 2; l++) {
      this.waterLights[l].update(this.params.color);
      this.waterLightsHalo[l].update(this.params.cwaterLights, this.params.pwaterLights);
    }

    for (let j = 0; j < this.rects.length; j++) {
      this.rects[j].update();
    }
  }
}
