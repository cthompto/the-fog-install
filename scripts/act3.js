//Act 3: Of the Fog
//By Chelsea Thompto

import * as THREE from "../build/three.module.js";

// Import add-ons
import { DragControls } from "../src/DragControls.js";
import { AsciiEffect } from "../src/AsciiEffect.js";

let container, effect;
let camera, scene, renderer;
let controls, group;
let enableSelection = false;
let textureX;
let textureY;
let textureX2;
let textureY2;
let plane;
let plane2;
let overlayText;
let otOp = 1;
let rate = 0.001;
let start = false;

let fogTexts = [
  "Of the fog…",
  "luxuriating in obscurity",
  "being seen but not indexed",
  "disrupting the normal flow",
  "being volumetrically ethereal",
  "nurturing and shrouding",
  "making things vanish and vanishing in turn",
  "making the familiar unfamiliar",
  "articulating the spaces in between",
  "concealing and protecting",
  "ever changing",
  "eliciting the fear of the unknown",
  "roiling between fixed states",
  "occupying space and resisting visibility",
  "shifting churning revealing concealing",
];

const objects = [];

const mouse = new THREE.Vector2(),
  raycaster = new THREE.Raycaster();

init();
animate();

function init() {
  textureX = Math.random() * 0.001;
  textureY = Math.random() * 0.001;
  textureX2 = Math.random() * -0.001;
  textureY2 = Math.random() * -0.001;

  overlayText = document.getElementById("ACT3-TEXT");
  overlayText.innerHTML = fogTexts[0];

  container = document.createElement("div");
  container.style.zIndex = -1;
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.z = 20;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  scene.add(new THREE.AmbientLight(0xaaaaaa, 3));

  const light = new THREE.SpotLight(0xffffff);
  light.position.set(0, 25, 50);
  light.angle = Math.PI / 9;

  light.castShadow = true;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 100;
  light.shadow.mapSize.width = window.innerWidth;
  light.shadow.mapSize.height = window.innerHeight;

  scene.add(light);

  group = new THREE.Group();
  scene.add(group);

  var initPlaneX = (Math.random() - 1) * 3.4;
  var initPlaneY = (Math.random() - 1) * 2;
  var initPlaneX2 = (Math.random() - 1) * 2.9;
  var initPlaneY2 = (Math.random() - 1) * 2;
  console.log("init pos 1:" + initPlaneX + initPlaneY);
  console.log("init pos 2:" + initPlaneX2 + initPlaneY2);

  const texture = new THREE.TextureLoader().load(
    "../assets/fog_trans_sm1_e.png"
  );
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  const geometry2 = new THREE.PlaneGeometry(12, 8);
  plane = new THREE.Mesh(geometry2, material);
  plane.position.set(initPlaneX, initPlaneY, 18);
  scene.add(plane);

  const texture2 = new THREE.TextureLoader().load(
    "../assets/fog_trans_sm1_i_ee.png"
  );
  const material2 = new THREE.MeshBasicMaterial({
    map: texture2,
    transparent: true,
  });
  const geometry3 = new THREE.PlaneGeometry(12, 8);
  plane2 = new THREE.Mesh(geometry3, material2);
  plane2.position.set(initPlaneX2, initPlaneY2, 17.9);
  scene.add(plane2);

  const geometry = new THREE.SphereGeometry();
  for (let i = 0; i < 200; i++) {
    const object = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    );
    object.position.x = Math.random() * 30 - 15;
    object.position.y = Math.random() * 15 - 7.5;
    object.position.z = Math.random() * 20 - 10;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() * 2 + 1;
    object.scale.y = Math.random() * 2 + 1;
    object.scale.z = Math.random() * 2 + 1;

    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);

    objects.push(object);
  }

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.useLegacyLights = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  //ascii effects
  effect = new AsciiEffect(renderer, " .,:;|-~=#", {
    scale: 0.92,
    resolution: 0.25,
    invert: false,
  });
  effect.setSize(window.innerWidth * 1, window.innerHeight * 1.075);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";
  effect.domElement.style.overflow = "hidden";
  effect.domElement.style.margin = "auto";
  container.appendChild(effect.domElement);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
  const button = document.getElementById("startButton");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  button.addEventListener("click", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
    start = true;
    audioStart();
    if (audioOn) {
      audioToggle();
    }
  });

   const exitCheck = function (event) {
    if (event.which == 3) {
      blocker.style.display = "block";
      instructions.style.display = "";
    }
  }; 

  controls = new DragControls([...objects], camera, effect.domElement);
  controls.addEventListener("drag", render);

  window.addEventListener("resize", onWindowResize);

  document.addEventListener("click", onClick);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  document.addEventListener("mousedown", exitCheck);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth * 0.9, window.innerHeight * 1.075);
  //renderer.setSize( window.innerWidth, window.innerHeight );

  render();
}

function onKeyDown(event) {
  enableSelection = event.keyCode === 16 ? true : false;
}

function onKeyUp(event) {
  if (event.keyCode === 27) {
    instructions.style.display = "";
    blocker.style.display = "";
    start = false;
    audioToggle();
  }
}

function onClick(event) {
  if (start) {
    event.preventDefault();

    if (enableSelection === true) {
      const draggableObjects = controls.getObjects();
      draggableObjects.length = 0;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersections = raycaster.intersectObjects(objects, true);

      if (intersections.length > 0) {
        const object = intersections[0].object;

        if (group.children.includes(object) === true) {
          object.material.emissive.set(0x000000);
          scene.attach(object);
        } else {
          object.material.emissive.set(0xaaaaaa);
          group.attach(object);
        }

        controls.transformGroup = true;
        draggableObjects.push(group);
      }

      if (group.children.length === 0) {
        controls.transformGroup = false;
        draggableObjects.push(...objects);
      }
    }
  }
}

function textureAnimation() {
  plane.position.x += textureX;
  plane.position.y += textureY;
  if (plane.position.x >= 3.5) {
    textureX = Math.random() * -0.001;
    console.log("x neg");
  } else if (plane.position.x <= -3.5) {
    textureX = Math.random() * 0.001;
    console.log("x pos");
  }
  if (plane.position.y >= 2) {
    textureY = Math.random() * -0.001;
    console.log("y neg");
  } else if (plane.position.y <= -2) {
    textureY = Math.random() * 0.001;
    console.log("y pos");
  }
}

function textureAnimation2() {
  plane2.position.x += textureX2;
  plane2.position.y += textureY2;
  if (plane2.position.x >= 3) {
    textureX2 = Math.random() * -0.001;
    console.log("x2 neg");
  } else if (plane2.position.x <= -3) {
    textureX2 = Math.random() * 0.001;
    console.log("x2 pos");
  }
  if (plane2.position.y >= 2) {
    textureY2 = Math.random() * -0.001;
    console.log("y2 neg");
  } else if (plane2.position.y <= -2) {
    textureY2 = Math.random() * 0.001;
    console.log("y2 pos");
  }
}

function textAnimation() {
  otOp -= rate;
  overlayText.style.opacity = otOp;
  if (otOp <= 0.01) {
    let randoText = Math.floor(Math.random() * fogTexts.length);
    let spacer = Math.floor(Math.random() * 40) + 50;
    let spacerText = spacer.toString() + "%";
    console.log(spacerText);
    let overlayBody = document.getElementById("a3ol");
    overlayBody.style.width = spacerText;

    overlayText.innerHTML = fogTexts[randoText];
    rate = rate * -1;
  } else if (otOp > 1) {
    rate = rate * -1;
  }
}

function animate() {
  requestAnimationFrame(animate);
  textureAnimation();
  textureAnimation2();
  textAnimation();
  render();
}

function render() {
  effect.render(scene, camera);
}

// Audio Stuff

var audioOn = false;
var audioContext;
var bufferSize;
var brownNoiseBuffer;
var data;
var cb;
var noiseGain;
var lastOut = 0;
var brownNoiseSource;

function audioStart() {
  // Initialize AudioContext
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create a Brown noise buffer
  bufferSize = 2 * audioContext.sampleRate;
  brownNoiseBuffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate
  );
  data = brownNoiseBuffer.getChannelData(0);

  cb = document.querySelector("#audioCheck");
  console.log(cb.checked);

  lastOut = 0;

  if (cb.checked) {
    if (!audioOn) {
      for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * whiteNoise) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      // Play brown noise
      brownNoiseSource = audioContext.createBufferSource();
      brownNoiseSource.buffer = brownNoiseBuffer;
      brownNoiseSource.loop = true;
      noiseGain = audioContext.createGain();
      noiseGain.gain.value = 0.15;
      brownNoiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      brownNoiseSource.start();
      audioOn = true;
    }
  } 
}

function audioToggle() {
  if (cb.checked) {
    if (start) {
      noiseGain.gain.value = 0.15;
    } else if (!start) {
      noiseGain.gain.value = 0;
    }
  }
}