import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(20, 30, 45);

// Create a renderer with alpha channel
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadow maps

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Transparent plane to receive shadows
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.ShadowMaterial({ opacity: 0.5 }) // Semi-transparent shadow material
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Ambient light
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Point light that casts shadow
const light1 = new THREE.PointLight(0xff00ff, 0.8);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

// Secondary light source
const light2 = new THREE.PointLight(0x00ffff, 0.6);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

// Load the font and create text
const loader = new FontLoader();
loader.load("./src/fonts/Open_Sans_Bold.json", function (font: Font) {
  const geometry = new TextGeometry("Grafika Komputer #1", {
    font: font,
    size: 8,
    height: 2,
    bevelThickness: 0.3,
    bevelSize: 0.02,
    bevelEnabled: true,
    bevelSegments: 4,
    curveSegments: 5,
  });

  const textMaterial = new THREE.MeshNormalMaterial();
  const text = new THREE.Mesh(geometry, textMaterial);
  text.castShadow = true;
  geometry.center();
  scene.add(text);
});

// Function to update light position based on camera position
function updateLightPosition() {
  const offset = 20; // Adjust offset to control distance between camera and light

  // Position light1 slightly offset from camera to create shadow at camera angle
  light1.position.set(
    camera.position.x + offset,
    camera.position.y + offset,
    camera.position.z + offset
  );

  // Position light2 for additional shadow effect
  light2.position.set(
    camera.position.x - offset,
    camera.position.y + offset,
    camera.position.z - offset
  );
}

// Listen for changes in OrbitControls to update light position
controls.addEventListener("change", updateLightPosition);

// Initial light position update
updateLightPosition();

// Animate the scene
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

document.body.appendChild(renderer.domElement);
animate();
