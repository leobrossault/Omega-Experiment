import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import domready from 'domready';

let webgl;
let gui;

domready(() => {
  // webgl settings
  if (window.innerHeight < 700) {
    webgl = new Webgl(window.innerWidth, 700);
  } else {
    webgl = new Webgl(window.innerWidth, window.innerHeight);
  }

  document.body.appendChild(webgl.renderer.domElement);

  // GUI settings
  // gui = new dat.GUI();
  // gui.add(webgl.params, 'cSphere', 0, 1);
  // gui.add(webgl.params, 'pSphere', 0, 6);
  // gui.add(webgl.params, 'cwaterLights', 0, 1);
  // gui.add(webgl.params, 'pwaterLights', 0, 6);
  // gui.addColor(webgl.params, 'color');
  // gui.add(webgl.params, 'controls');

  // handle resize
  window.addEventListener('resize', resizeHandler);

  // let's play !
  animate();

  function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    raf(animate);

    webgl.render();
  }
});
