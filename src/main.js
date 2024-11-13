import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createTube } from './TubeGeometry.js';
import { createConvex } from './ConvexGeometry.js';
import { createLathe } from './LatheGeometry.js';
import { createExtrude } from './ExtrudeGeometry.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17.0/dist/lil-gui.esm.min.js';

// Scene and camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

// Light setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 1);
pointLight3.position.set(10, -10, -10);
scene.add(pointLight3);


let currentMesh;

// Shared Controls
const controls = {
    geometryType: 'Tube', // Default geometry type
};

// Tube-specific controls
const tubeControls = {
    numberOfPoints: 12,
    segments: 100,
    radius: 1.5,
    closed: false,
    radialSegments: 8,
};

// Lathe-specific controls
const latheControls = {
    numberOfPoints: 12,
    segments: 100,
    phiStart: 0,
    phiLength: Math.PI * 2,
};

// Convex-specific controls
const convexControls = {
   numberOfPoints: 20,
   pointSize: 0.2,
   pointColor: 0xff0000,
};

// Extrude-specific controls
const extrudeControls = {
    steps: 2,
    depth: 5,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 3,
    color: 0x0077ff,
};

// GUI Setup
const gui = new GUI();
const geometryTypeController = gui.add(controls, 'geometryType', ['Tube', 'Convex', 'Lathe', 'Extrude']).onChange(updateGeometry);

// Tube GUI controls
const tubeGuiFolder = gui.addFolder('Tube Controls');
tubeGuiFolder.add(tubeControls, 'numberOfPoints', 3, 20, 1).onChange(updateGeometry);
tubeGuiFolder.add(tubeControls, 'segments', 50, 200, 1).onChange(updateGeometry);
tubeGuiFolder.add(tubeControls, 'radius', 0.5, 5, 0.1).onChange(updateGeometry);
tubeGuiFolder.add(tubeControls, 'closed').onChange(updateGeometry);
tubeGuiFolder.add(tubeControls, 'radialSegments', 3, 20, 1).onChange(updateGeometry);

// Lathe GUI controls
const latheGuiFolder = gui.addFolder('Lathe Controls');
latheGuiFolder.add(latheControls, 'numberOfPoints', 3, 50, 1).onChange(updateGeometry);
latheGuiFolder.add(latheControls, 'segments', 4, 80, 1).onChange(updateGeometry);
latheGuiFolder.add(latheControls, 'phiStart', 0, Math.PI * 2, 0.1).onChange(updateGeometry);
latheGuiFolder.add(latheControls, 'phiLength', 0, Math.PI * 2, 0.1).onChange(updateGeometry);

// GUI Setup for Convex controls
const convexGuiFolder = gui.addFolder('Convex Controls');
convexGuiFolder.add(convexControls, 'numberOfPoints', 3, 50, 1).onChange(updateGeometry);
convexGuiFolder.add(convexControls, 'pointSize', 0.1, 1, 0.1).onChange(updateGeometry);
convexGuiFolder.addColor(convexControls, 'pointColor').onChange(updateGeometry);
convexGuiFolder.hide(); // Hide initially

// GUI Setup for Extrude controls
const extrudeGuiFolder = gui.addFolder('Extrude Controls');
extrudeGuiFolder.add(extrudeControls, 'steps', 1, 10, 1).onChange(updateGeometry);
extrudeGuiFolder.add(extrudeControls, 'depth', 1, 10, 1).onChange(updateGeometry);
extrudeGuiFolder.add(extrudeControls, 'bevelEnabled').onChange(updateGeometry);
extrudeGuiFolder.add(extrudeControls, 'bevelThickness', 0.1, 3, 0.1).onChange(updateGeometry);
extrudeGuiFolder.add(extrudeControls, 'bevelSize', 0.1, 3, 0.1).onChange(updateGeometry);
extrudeGuiFolder.add(extrudeControls, 'bevelSegments', 1, 30, 1).onChange(updateGeometry);
extrudeGuiFolder.addColor(extrudeControls, 'color').onChange(updateGeometry);
extrudeGuiFolder.hide();  // Sembunyikan folder ini saat awal

// Initially hide Lathe and Convex GUI controls
latheGuiFolder.hide();

// Function to update the displayed geometry based on selected type
function updateGeometry() {
    if (currentMesh) scene.remove(currentMesh);

    // Show/hide relevant GUI folders
    tubeGuiFolder.hide();
    latheGuiFolder.hide();
    convexGuiFolder.hide();
    extrudeGuiFolder.hide();

    console.log(controls.geometryType);

    switch (controls.geometryType) {
        case 'Tube':
            currentMesh = createTube(tubeControls);
            tubeGuiFolder.show();
            break;
        case 'Convex':
            currentMesh = createConvex(convexControls);
            convexGuiFolder.show();
            break;
        case 'Lathe':
            currentMesh = createLathe(latheControls);
            latheGuiFolder.show();
            break;
        case 'Extrude':
            currentMesh = createExtrude(extrudeControls);
            extrudeGuiFolder.show();
            break
    }
    console.log("Extrude Mesh Position:", currentMesh.position);
    console.log("Extrude Mesh Scale:", currentMesh.scale);

    scene.add(currentMesh);
}

// Initialize the first geometry
updateGeometry();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});