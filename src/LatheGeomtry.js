import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Define controls for the number of points
const controls = { numberOfPoints: 12 }; // Adjust number as needed

// Generate points for LatheGeometry in the X-Y plane
const points = [];
for (let i = 0; i < controls.numberOfPoints; i++) {
  const x = 5 + Math.sin(i * 0.2) * 10; // X coordinate (radius)
  const y = i - controls.numberOfPoints / 2; // Y coordinate (height)
  points.push(new THREE.Vector2(x, y)); // Using Vector2 for X-Y plane
}

// Define LatheGeometry properties
const segments = 100; // Number of segments (smoothness)
const phiStart = 0; // Starting angle (in radians)
const phiLength = Math.PI * 2; // Angle length (full circle)

// Create the LatheGeometry and mesh
const latheGeometry = new THREE.LatheGeometry(
  points,
  segments,
  phiStart,
  phiLength
);
const latheMesh = createMesh(latheGeometry);

// Add the mesh to the scene
const scene = new THREE.Scene();
scene.add(latheMesh);

// Add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Define the camera and renderer
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls for camera movement
const control = new OrbitControls(camera, renderer.domElement);
control.update();

// Create a function to add material to the mesh
function createMesh(geometry) {
  const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  return new THREE.Mesh(geometry, material);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  latheMesh.rotation.x += 0.01; // Rotate on X-axis
  latheMesh.rotation.y += 0.01; // Rotate on Y-axis
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
