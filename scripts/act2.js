// Act 2: The Horror of Fog
//By Chelsea Thompto

// Import required source code
// Import three.js core
import * as THREE from "../build/three.module.js";

// Import add-ons
import { PointerLockControls } from "../src/PointerLockControls.js";
import { FontLoader } from "../src/FontLoader.js";
import { AsciiEffect } from "../src/AsciiEffect.js";

// Establish variables
let camera,
  scene,
  renderer,
  controls,
  fogMaterial,
  fogMaterial2,
  effect,
  fogMesh,
  fogMesh2,
  message,
  shapes,
  textGeometry,
  text,
  matDark,
  color2,
  fogUtterance;

let fogTexts = [
  "The fog had now buried all heaven.",
  "The fog was peopled with phantoms.",
  "His head swam; the fog and smoke stupefied him.",
  "Come in, or the fog will get into the house.",
  "Could see nothing in the fog.",
  "Still fog, which the sunrise cannot pierce.",
  "as though fixing upon one unshakable solidity in a world of fog",
  "while from the fog others rose up, swept past and were engulfed.",
  "I must go in, the fog is rising.",
];

let otherTexts = [];
let buildingMaterial = [];
let buildings = [];

const objects = [];
let raycaster;
let start = Date.now();
let textLoader = new FontLoader();
let spoken = false;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let cb = document.querySelector("#audioCheck");
let chosen = false;

// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {
  // Establish the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;

  // Define basic scene parameters
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);

  // Define scene lighting
  const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  // Define controls
  controls = new PointerLockControls(camera, document.body);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
  const button = document.getElementById("startButton");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  button.addEventListener("click", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
    chosen = true;
    controls.lock();
  });

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function () {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  const exitCheck = function (event) {
    if (event.which == 3) {
      blocker.style.display = "block";
      instructions.style.display = "";
      controls.unlock();
    }
  }; 

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("mousedown", exitCheck);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  // Materials
  fogMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("../assets/fog6.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 0.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.DoubleSide,
    fog: false,
  });

  fogMaterial2 = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("../assets/fog6id.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 10.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.DoubleSide,
    fog: false,
  });

  // Building Materials

  buildingMaterial[0] = new THREE.MeshBasicMaterial({ color: 0x000000 });
  buildingMaterial[1] = new THREE.MeshBasicMaterial({ color: 0x383838 });
  buildingMaterial[2] = new THREE.MeshBasicMaterial({ color: 0x808080 });
  buildingMaterial[3] = new THREE.MeshBasicMaterial({ color: 0xdedede });

  for (let i = 0; i < 30; i++) {
    let ranX = Math.floor(Math.random() * 800 + +-400);
    let ranZ = Math.floor(Math.random() * 800 + +-400);
    let ranSpin = Math.floor(Math.random() * 3.14);
    let ranW = Math.floor(10 + Math.random() * 300);
    let ranH = Math.floor(10 + Math.random() * 75);
    let ranD = Math.floor(10 + Math.random() * 75);
    let geometry = new THREE.BoxGeometry(ranW, ranH, ranD);
    let material =
      buildingMaterial[Math.floor(Math.random() * buildingMaterial.length)];
    buildings[i] = new THREE.Mesh(geometry, material);
    buildings[i].position.set(ranX, 0, ranZ);
    buildings[i].rotation.set(0, ranSpin, -1.5708);
    scene.add(buildings[i]);
  }

  // Fog floor and backdrop
  fogMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(80, 160), fogMaterial);
  fogMesh.position.set(0, -85, 0);
  fogMesh.rotation.set(0, 0, 0);
  fogMesh.scale.set(10, 1, 10);
  scene.add(fogMesh);

  fogMesh2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(80, 160),
    fogMaterial2
  );
  fogMesh2.position.set(0, 0, 0);
  fogMesh2.scale.set(15, 15, 15);
  scene.add(fogMesh2);

  // Initial text

  textLoader.load("../assets/IBM_Plex_Mono_Regular.json", function (font) {
    // Define font color
    color2 = 0xdfdfdf;
    // Define font material
    matDark = new THREE.LineBasicMaterial({
      color: color2,
      side: THREE.DoubleSide,
      fog: false,
    });
    // Generate side one line one
    let randoText = Math.floor(Math.random() * fogTexts.length);
    message = fogTexts[randoText];
    shapes = font.generateShapes(message, 3);
    textGeometry = new THREE.ShapeGeometry(shapes);
    textGeometry.computeBoundingBox();
    text = new THREE.Mesh(textGeometry, matDark);
    text.position.set(0, -5, 0);
    text.rotation.set(0, 0, -1.5708);
    scene.add(text);

    for (let i = 0; i < 40; i++) {
      let ranX = Math.floor(Math.random() * 1000 + +-500);
      let ranZ = Math.floor(Math.random() * 1000 + +-500);
      let ranSpin = Math.floor(Math.random() * 3.14);
      otherTexts[i] = new THREE.Mesh(textGeometry, matDark);
      otherTexts[i].position.set(ranX, -10, ranZ);
      otherTexts[i].rotation.set(0, ranSpin, -1.5708);
      scene.add(otherTexts[i]);
    }
  });

  scene.fog = new THREE.Fog(0x000000, 50, 120);

  // Define Rendered and html document placement
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);

  //ascii effects
  effect = new AsciiEffect(renderer, " .,:;|-~=#", {
    scale: 0.92,
    resolution: 0.3,
    invert: true,
  });
  effect.setSize(window.innerWidth * 0.9, window.innerHeight * 1.075);
  effect.domElement.style.color = "black";
  effect.domElement.style.backgroundColor = "LightGray";
  effect.domElement.style.overflow = "hidden";
  document.body.appendChild(effect.domElement);

  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth * 0.9, window.innerHeight * 1.075);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);
  textRender();

  fogMaterial.uniforms["time"].value = 0.00025 * (Date.now() - start);
  fogMaterial2.uniforms["time"].value = 0.00025 * (Date.now() - start);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    let utterance = new SpeechSynthesisUtterance("Hello world!");
    utterance.pitch = 0.01;
    utterance.rate = 0.1;

    if (controls.getObject().position.x > 550) {
      controls.getObject().position.x = 549;
    } else if (controls.getObject().position.x < -550) {
      controls.getObject().position.x = -549;
    }

    if (controls.getObject().position.z > 550) {
      controls.getObject().position.z = 549;
    } else if (controls.getObject().position.z < -550) {
      controls.getObject().position.z = -549;
    }

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;

  effect.render(scene, camera);
}

function textRender() {
  if (text.position.y < 200) {
    text.position.y += 0.15;
    for (let i = 0; i < 20; i++) {
      otherTexts[i].position.y += 0.15;
    }
  } else if (text.position.y >= 200 && text.position.y < 350) {
    text.position.y += 0.5;
    for (let i = 0; i < 20; i++) {
      otherTexts[i].position.y += 0.5;
    }
  } else if (text.position.y >= 350) {
    text.position.y += 0.9;
    for (let i = 0; i < 20; i++) {
      otherTexts[i].position.y += 0.9;
    }
  }

  if (text.position.y > 950) {
    text.geometry.dispose();
    text.material.dispose();
    scene.remove(text);
    for (let i = 0; i < 40; i++) {
      otherTexts[i].geometry.dispose();
      otherTexts[i].material.dispose();
      scene.remove(otherTexts[i]);
    }
    textLoader.load("../assets/IBM_Plex_Mono_Regular.json", function (font) {
      // Define font color
      color2 = 0xdfdfdf;
      // Define font material
      matDark = new THREE.LineBasicMaterial({
        color: color2,
        side: THREE.DoubleSide,
        fog: false,
      });
      // Generate side one line one
      let randoText = Math.floor(Math.random() * fogTexts.length);
      message = fogTexts[randoText];
      shapes = font.generateShapes(message, 3);
      textGeometry = new THREE.ShapeGeometry(shapes);
      textGeometry.computeBoundingBox();
      text = new THREE.Mesh(textGeometry, matDark);
      for (let i = 0; i < 40; i++) {
        let ranX = Math.floor(Math.random() * 1000 + +-500);
        let ranZ = Math.floor(Math.random() * 1000 + +-500);
        otherTexts[i] = new THREE.Mesh(textGeometry, matDark);
        otherTexts[i].position.set(ranX, -10, ranZ);
        otherTexts[i].rotation.set(0, 0, -1.5708);
        scene.add(otherTexts[i]);
      }
      text.position.set(0, -10, 0);
      text.rotation.set(0, 0, -1.5708);
      scene.add(text);
      spoken = false;
    });
  }

  if (!spoken) {
    if (text.position.y > 5) {
      fogUtterance = new SpeechSynthesisUtterance(message);
      fogUtterance.pitch = 0.01;
      fogUtterance.rate = 0.1;
      if (cb.checked && chosen) {
        speechSynthesis.speak(fogUtterance);
        spoken = true;
      }
    }
  }
}
