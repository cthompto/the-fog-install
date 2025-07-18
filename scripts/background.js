// The Fog - Background Graphics

// Import three.js core
import * as THREE from "../build/three.module.js";

// Import add-ons
import { OrbitControls } from "../src/OrbitControls.js";
import { AsciiEffect } from "../src/AsciiEffect.js";

let container, scene, camera, effect, renderer, mesh2, mixer, controls, clock;

let material;

let start = Date.now();

// Call init and animate functions (defined below)
init();
animate();

function init() {
  //Identify div in HTML to place scene
  container = document.getElementById("bg-title-ani");

  //Crate clock for animation
  clock = new THREE.Clock();

  //Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);

  //ascii effects
  effect = new AsciiEffect(renderer, " .,:;|-=#", {
    scale: 1,
    resolution: 0.2,
    block: true,
    invert: true,
  });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "#353535";
  effect.domElement.style.backgroundColor = "black";
  container.appendChild(effect.domElement);

  material = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture(window.FOG_PATH_PREFIX + "/assets/fog8.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 0.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });

  mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 100), material);
  mesh2.position.set(0, 0, 0);
  mesh2.rotation.set(0, 0, 0);
  mesh2.scale.set(0.85, 0.85, 0.15);
  scene.add(mesh2);

  // Add Orbit Controls
  controls = new OrbitControls(camera, effect.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 25;
  controls.target.set(0, 0, -0.2);

  // Position our camera so we can see the shape
  camera.position.z = 20;

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);
}

// Define animate loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  render();
}

// Define the render loop
function render() {
  material.uniforms["time"].value = 0.00025 * (Date.now() - start);
  effect.render(scene, camera);
}

// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
  render();
}
