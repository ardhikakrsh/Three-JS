import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Define controls for number of points
const controls = { numberOfPoints:12}; // Adjust number as needed

// Generate random points for the curve
const points = [];
for (let i = 0; i < controls.numberOfPoints; i++) {
   const randomX = -20 + Math.round(Math.random() * 50);
   const randomY = -15 + Math.round(Math.random() * 40);
   const randomZ = -20 + Math.round(Math.random() * 40);
   points.push(new THREE.Vector3(randomX, randomY, randomZ));
}

// add first point to the end to close the curve
// points.push(points[0]);

// Define TubeGeometry properties
const segments = 1000;
const radius = 2;
const radialSegments = 100;
const closed = false;

// Create the tube geometry and mesh
const tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radialSegments, closed);
const tubeMesh = createMesh(tubeGeometry);

// Add the mesh to the scene
const scene = new THREE.Scene();
scene.add(tubeMesh);

// add axes helper
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Define the camera and renderer
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
   // tubeMesh.rotation.x += 0.01;
   // tubeMesh.rotation.y += 0.01;
   renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
});
