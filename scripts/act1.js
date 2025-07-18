// Act 1: The Fog of War
//By Chelsea Thompto

// Import three.js core
import * as THREE from "../build/three.module.js";

// Import add-ons
import { OrbitControls } from "../src/OrbitControls.js";
import { FontLoader } from "../src/FontLoader.js";
import { AsciiEffect } from "../src/AsciiEffect.js";

// Declare variables
let container,
  scene,
  camera,
  effect,
  renderer,
  material,
  material2,
  material3,
  material4,
  mesh,
  mesh2,
  mesh3,
  mesh4,
  message,
  message2,
  message3,
  messageB,
  messageB2,
  messageB3,
  shapes,
  shapes2,
  shapes3,
  shapesB,
  shapesB2,
  shapesB3,
  mixer,
  text,
  text2,
  text3,
  textB,
  textB2,
  textB3,
  controls,
  clock,
  color,
  geometry,
  geometry2,
  geometry3,
  xMid,
  xMid2,
  xMid3,
  geometryB,
  geometryB2,
  geometryB3,
  xMidB,
  xMidB2,
  xMidB3,
  matDark;

let start = Date.now();
let chosen = false;
let ticker = 0;
let ticker2 = 0;
let loader3 = new FontLoader();

let fogTexts = [
  "In summer, fog",
  "increases the dangers",
  "to shipping.",
  "Mists and fogs militate",
  "against observation",
  "by aircraft...",
  "...especially as we",
  "were compassed round",
  "by a very thick fog.",
  "Fog dissipation by charge",
  "and electric field has",
  "become a research hotspot",
  "FIDO was a technique of fog",
  "dissipation over runways",
  "developed by the British",
  "the U.S. Army conducted",
  "a joint helicopter fog",
  "clearing program",
  "The fog will lead to",
  "poor transportation and",
  "heavy economic losses",
];

let fogTextsB = [
  "fog gives to things",
  "exaggerated dimensions and",
  "an unnatural appearance.",
  "estimates frequently exceed",
  "the correct range when",
  "made during foggy weather",
  "Here the fog prevents",
  "the enemy from being",
  "discovered in time",
  "friction and the fog of",
  "war will always be the chief",
  "characteristic of real war",
  "Fog disrupts marine transport,",
  "harbor activities, and causes",
  "life threatening situations.",
  "Fog clearing in open-pit mines",
  "can allow the safe resumption",
  "of mining operations.",
  "Extended periods of fog",
  "can have large economic",
  "impacts.",
];

// Call init and animate functions (defined below)
init();
animate();

function init() {
  //Identify div in HTML to place scene
  container = document.getElementById("space");

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
    scale: 0.82,
    resolution: 0.4,
    block: true,
    invert: true,
  });
  //effect.setSize(window.innerWidth * .9, window.innerHeight * .9);
  effect.setSize(window.innerWidth * 1.01, window.innerHeight * 1.21);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";
  document.body.appendChild(effect.domElement);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
  const button = document.getElementById("startButton");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  button.addEventListener("click", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
    chosen = true;
    audioStart();
    if (audioOn) {
      audioToggle();
    }
  });

  window.addEventListener("keyup", onKeyUp);

  // Mesh materials
  material = new THREE.ShaderMaterial({
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
  });

  material2 = new THREE.ShaderMaterial({
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
  });

  material3 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    wireframe: true,
  });

  material4 = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("../assets/fog1.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 5.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  // Fog and grid objects in space
  mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 50), material);
  mesh2.position.set(0, 2, 0);
  mesh2.rotation.set(0, 0, 0);
  mesh2.scale.set(0.55, 0.25, 0.35);
  scene.add(mesh2);

  mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(40, 80), material2);
  mesh.position.set(0, 0, 0);
  mesh.scale.set(1.25, 1.25, 1.25);
  scene.add(mesh);

  mesh3 = new THREE.Mesh(new THREE.IcosahedronGeometry(41, 82), material3);
  mesh3.position.set(0, 0, 0);
  mesh3.scale.set(1.3, 1.3, 1.3);
  scene.add(mesh3);

  mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 150), material4);
  mesh4.position.set(0, 0, 0);
  mesh4.scale.set(2, 2, 2);
  scene.add(mesh4);

  // Fog graphs
  const textureI = new THREE.TextureLoader().load("../assets/graph_1_t.png");
  const materialI = new THREE.MeshBasicMaterial({
    map: textureI,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI = new THREE.PlaneGeometry(48, 48);
  const planeI = new THREE.Mesh(geometryI, materialI);
  planeI.position.set(0, 0, -50);
  //planeI.rotation.set(0,0,-1.5708);
  scene.add(planeI);

  const textureI2 = new THREE.TextureLoader().load(
    "../assets/graph_2_t.png"
  );
  const materialI2 = new THREE.MeshBasicMaterial({
    map: textureI2,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI2 = new THREE.PlaneGeometry(48, 48);
  const planeI2 = new THREE.Mesh(geometryI2, materialI2);
  planeI2.position.set(0, -35, 0);
  planeI2.rotation.set(-1.5708, 0, 0);
  scene.add(planeI2);

  const textureI3 = new THREE.TextureLoader().load(
    "../assets/graph_3_t.png"
  );
  const materialI3 = new THREE.MeshBasicMaterial({
    map: textureI3,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI3 = new THREE.PlaneGeometry(48, 48);
  const planeI3 = new THREE.Mesh(geometryI3, materialI3);
  planeI3.position.set(-50, 0, 0);
  planeI3.rotation.set(0, 1.5708, 0);
  scene.add(planeI3);

  const textureI4 = new THREE.TextureLoader().load(
    "../assets/graph_4_t.png"
  );
  const materialI4 = new THREE.MeshBasicMaterial({
    map: textureI4,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI4 = new THREE.PlaneGeometry(48, 48);
  const planeI4 = new THREE.Mesh(geometryI4, materialI4);
  planeI4.position.set(0, 0, 50);
  planeI4.rotation.set(0, 3.14159, 0);
  scene.add(planeI4);

  const textureI5 = new THREE.TextureLoader().load(
    "../assets/graph_5_t.png"
  );
  const materialI5 = new THREE.MeshBasicMaterial({
    map: textureI5,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI5 = new THREE.PlaneGeometry(48, 48);
  const planeI5 = new THREE.Mesh(geometryI5, materialI5);
  planeI5.position.set(0, 50, 0);
  planeI5.rotation.set(1.5708, 0, 0);
  scene.add(planeI5);

  const textureI6 = new THREE.TextureLoader().load(
    "../assets/graph_6_t.png"
  );
  const materialI6 = new THREE.MeshBasicMaterial({
    map: textureI6,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const geometryI6 = new THREE.PlaneGeometry(48, 48);
  const planeI6 = new THREE.Mesh(geometryI6, materialI6);
  planeI6.position.set(50, 0, 0);
  planeI6.rotation.set(0, -1.5708, 0);
  scene.add(planeI6);

  // Orbit Controls
  controls = new OrbitControls(camera, effect.domElement);
  controls.touches.ONE = THREE.TOUCH.PAN;
  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
  controls.minDistance = 3;
  controls.maxDistance = 40;
  controls.target.set(0, 0, -0.2);

  // Position our camera so we can see the shape
  camera.position.set(0, 40, 10);

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Texts that will move in and out of fog
  loader3.load("../assets/IBM_Plex_Mono_Regular.json", function (font) {
    // Define font color
    color = 0xdfdfdf;
    // Define font material
    matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    // Generate side one line one
    message = "The fog had now";
    shapes = font.generateShapes(message, 1.75);
    geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    text = new THREE.Mesh(geometry, matDark);
    text.position.set(0, -5.5, 0);
    //scene.add(text);

    // Generate side one line two
    message2 = "buried all heaven.";
    shapes2 = font.generateShapes(message2, 1.75);
    geometry2 = new THREE.ShapeGeometry(shapes2);
    geometry2.computeBoundingBox();
    xMid2 = -0.5 * (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x);
    geometry2.translate(xMid2, 0, 0);
    text2 = new THREE.Mesh(geometry2, matDark);
    text2.position.set(0, -8, 0);
    //scene.add(text2);

    // Generate side one line three
    message3 = "buried all heaven.";
    shapes3 = font.generateShapes(message3, 1.75);
    geometry3 = new THREE.ShapeGeometry(shapes3);
    geometry3.computeBoundingBox();
    xMid3 = -0.5 * (geometry3.boundingBox.max.x - geometry3.boundingBox.min.x);
    geometry3.translate(xMid3, 0, 0);
    text3 = new THREE.Mesh(geometry3, matDark);
    text3.position.set(0, -8, 0);
    //scene.add(text2);

    // Generate side two line one
    messageB = "The fog had now";
    shapesB = font.generateShapes(messageB, 1.75);
    geometryB = new THREE.ShapeGeometry(shapesB);
    geometryB.computeBoundingBox();
    xMidB = -0.5 * (geometryB.boundingBox.max.x - geometryB.boundingBox.min.x);
    geometryB.translate(xMidB, 0, 0);
    textB = new THREE.Mesh(geometryB, matDark);
    textB.position.set(0, -10, 0);
    //textB.position.rotation(3.14159,0,0);
    //scene.add(textB);

    // Generate side two line two
    messageB2 = "buried all heaven.";
    shapesB2 = font.generateShapes(messageB2, 1.75);
    geometryB2 = new THREE.ShapeGeometry(shapesB2);
    geometryB2.computeBoundingBox();
    xMidB2 =
      -0.5 * (geometryB2.boundingBox.max.x - geometryB2.boundingBox.min.x);
    geometryB2.translate(xMidB2, 0, 0);
    textB2 = new THREE.Mesh(geometryB2, matDark);
    textB2.position.set(0, -12, 0);
    //textB2.position.rotation(3.14159,0,0);
    //scene.add(textB2);

    // Generate side two line three
    messageB3 = "buried all heaven.";
    shapesB3 = font.generateShapes(messageB3, 1.75);
    geometryB3 = new THREE.ShapeGeometry(shapesB3);
    geometryB3.computeBoundingBox();
    xMidB3 =
      -0.5 * (geometryB3.boundingBox.max.x - geometryB3.boundingBox.min.x);
    geometryB3.translate(xMidB3, 0, 0);
    textB3 = new THREE.Mesh(geometryB3, matDark);
    textB3.position.set(0, -14, 0);
    //textB3.position.rotation(3.14159,0,0);
    //scene.add(textB3);
  });

  // Respond to window resizing
  window.addEventListener("resize", onWindowResize);
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
  material2.uniforms["time"].value = 0.00025 * (Date.now() - start);
  material4.uniforms["time"].value = 0.00025 * (Date.now() - start);
  textAnimation1();
  textAnimation2();
  effect.render(scene, camera);
}

// Text animation side 1
function textAnimation1() {
  if (ticker == 0) {
    if (text.position.z > 1) {
      text.position.z -= 0.01;
      text2.position.z -= 0.01;
      text3.position.z -= 0.01;
    } else if (text.position.z <= 1) {
      text.geometry.dispose();
      text.material.dispose();
      scene.remove(text);
      text2.geometry.dispose();
      text2.material.dispose();
      scene.remove(text2);
      text3.geometry.dispose();
      text3.material.dispose();
      scene.remove(text3);
      let newText = Math.floor(Math.random() * (fogTexts.length / 3));
      console.log(
        fogTexts[newText * 3] +
          "\n" +
          fogTexts[newText * 3 + 1] +
          "\n" +
          fogTexts[newText * 3 + 2]
      );
      loader3.load("../assets/IBM_Plex_Mono_Regular.json", function (font) {
        // Define font color
        color = 0x757575;
        // Define font material
        matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });
        //line 1
        message = fogTexts[newText * 3];
        shapes = font.generateShapes(message, 1);
        geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        text = new THREE.Mesh(geometry, matDark);
        text.position.set(0, 1.75, 1);
        //text.rotation.set(-1.5708, 0 , 0);
        scene.add(text);
        //line 2
        message2 = fogTexts[newText * 3 + 1];
        shapes2 = font.generateShapes(message2, 1);
        geometry2 = new THREE.ShapeGeometry(shapes2);
        geometry2.computeBoundingBox();
        xMid2 =
          -0.5 * (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x);
        geometry2.translate(xMid2, 0, 0);
        text2 = new THREE.Mesh(geometry2, matDark);
        text2.position.set(0, 0, 1);
        scene.add(text2);
        //line 3
        message3 = fogTexts[newText * 3 + 2];
        shapes3 = font.generateShapes(message3, 1);
        geometry3 = new THREE.ShapeGeometry(shapes3);
        geometry3.computeBoundingBox();
        xMid3 =
          -0.5 * (geometry3.boundingBox.max.x - geometry3.boundingBox.min.x);
        geometry3.translate(xMid3, 0, 0);
        text3 = new THREE.Mesh(geometry3, matDark);
        text3.position.set(0, -1.75, 1);
        scene.add(text3);
      });
      ticker = 1;
    }
  }
  if (ticker == 1) {
    if (text.position.z < 12) {
      text.position.z += 0.01;
      text2.position.z += 0.01;
      text3.position.z += 0.01;
    } else if (text.position.z > 12) {
      ticker = 0;
    }
  }
}

// Define text animation side 2
function textAnimation2() {
  if (ticker2 == 0) {
    if (textB.position.z < 1) {
      textB.position.z += 0.01;
      textB2.position.z += 0.01;
      textB3.position.z += 0.01;
    } else if (textB.position.z >= 1) {
      textB.geometry.dispose();
      textB.material.dispose();
      scene.remove(textB);
      textB2.geometry.dispose();
      textB2.material.dispose();
      scene.remove(textB2);
      textB3.geometry.dispose();
      textB3.material.dispose();
      scene.remove(textB3);
      let newTextB = Math.floor(Math.random() * (fogTextsB.length / 3));
      console.log(
        fogTextsB[newTextB * 3] +
          "\n" +
          fogTextsB[newTextB * 3 + 1] +
          "\n" +
          fogTextsB[newTextB * 3 + 2]
      );
      loader3.load("../assets/IBM_Plex_Mono_Regular.json", function (font) {
        // Define font color
        //color = 0xdfdfdf;
        color = 0x757575;
        // Define font material
        matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });
        //line 1
        messageB = fogTextsB[newTextB * 3];
        shapesB = font.generateShapes(messageB, 1);
        geometryB = new THREE.ShapeGeometry(shapesB);
        geometryB.computeBoundingBox();
        xMidB =
          -0.5 * (geometryB.boundingBox.max.x - geometryB.boundingBox.min.x);
        geometryB.translate(xMidB, 0, 0);
        textB = new THREE.Mesh(geometryB, matDark);
        textB.position.set(0, 1.75, 1);
        textB.rotation.set(0, 3.14159, 0);
        scene.add(textB);
        //line 2
        messageB2 = fogTextsB[newTextB * 3 + 1];
        shapesB2 = font.generateShapes(messageB2, 1);
        geometryB2 = new THREE.ShapeGeometry(shapesB2);
        geometryB2.computeBoundingBox();
        xMidB2 =
          -0.5 * (geometryB2.boundingBox.max.x - geometryB2.boundingBox.min.x);
        geometryB2.translate(xMidB2, 0, 0);
        textB2 = new THREE.Mesh(geometryB2, matDark);
        textB2.position.set(0, 0, 1);
        textB2.rotation.set(0, 3.14159, 0);
        scene.add(textB2);
        //line 3
        messageB3 = fogTextsB[newTextB * 3 + 2];
        shapesB3 = font.generateShapes(messageB3, 1);
        geometryB3 = new THREE.ShapeGeometry(shapesB3);
        geometryB3.computeBoundingBox();
        xMidB3 =
          -0.5 * (geometryB3.boundingBox.max.x - geometryB3.boundingBox.min.x);
        geometryB3.translate(xMidB3, 0, 0);
        textB3 = new THREE.Mesh(geometryB3, matDark);
        textB3.position.set(0, -1.75, 1);
        textB3.rotation.set(0, 3.14159, 0);
        scene.add(textB3);
      });
      ticker2 = 1;
    }
  }
  if (ticker2 == 1) {
    if (textB.position.z > -12) {
      textB.position.z -= 0.01;
      textB2.position.z -= 0.01;
      textB3.position.z -= 0.01;
    } else if (textB.position.z < 12) {
      ticker2 = 0;
    }
  }
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight * 1.25);
  render();
}

// Respond to 'esc' key being pressed
function onKeyUp(event) {
  if (event.keyCode === 27) {
    instructions.style.display = "";
    blocker.style.display = "";
    chosen = false;
    audioToggle();
  }
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
var context;
var o;
var frequency;
var g;

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

  lastOut = 0;

  if (cb.checked) {
    if (!audioOn) {
      for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * whiteNoise) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      context = new AudioContext();
      o = context.createOscillator();
      frequency = 125.0;
      g = context.createGain();

      o.type = "sine";
      o.frequency.value = frequency;
      g.gain.value = 0.1;
      o.connect(g);
      g.connect(context.destination);
      o.start();

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

    // Play 100 Hz tone every 18 seconds
    setInterval(() => {
      if (chosen && cb.checked) {
      g.gain.exponentialRampToValueAtTime(0.9, context.currentTime + 2.5);
      setTimeout(() => {
        g.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 2.5);
      }, 3500);
      } else {
        g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + .5);
      }
    }, 18000);
  } else {
    g.gain.value = 0;
    noiseGain.gain.value = 0;
  }
}

function audioToggle() {
  if (cb.checked) {
    if (chosen) {
      noiseGain.gain.value = 0.15;
    } else if (!chosen) {
      g.gain.exponentialRampToValueAtTime(0.001, context.currentTime + .5);
      noiseGain.gain.value = 0;
    }
  }
}
