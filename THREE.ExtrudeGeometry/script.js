// Import modules dan addons
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup Scene, Camera, dan Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Membuat 2D Shape untuk di-ekstrusi menjadi 3D (Persegi)
const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(10, 0);
shape.lineTo(10, 10);
shape.lineTo(0, 10);
shape.lineTo(0, 0);

// Konfigurasi Ekstrusi untuk 3D dari Shape 2D
const extrudeSettings = {
    steps: 2,               // Jumlah segmen sepanjang kedalaman ekstrusi (semakin tinggi, semakin halus)
    depth: 5,               // Kedalaman ekstrusi dari bentuk 2D untuk membuat objek 3D
    bevelEnabled: true,     // Mengaktifkan bevel (atau tepi miring) pada objek
    bevelThickness: 1,      // Ketebalan bevel dari permukaan objek hingga tepi bevel
    bevelSize: 1,           // Ukuran bevel, menentukan seberapa jauh bevel memanjang dari tepi objek
    bevelSegments: 3        // Jumlah segmen yang membentuk bevel (semakin tinggi, semakin halus tepi bevel)
};


// Membuat Geometri 3D dari Ekstrusi Persegi
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Posisi Kamera
camera.position.z = 20;

// Menambahkan Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// Mengatur OrbitControls untuk Interaksi Kamera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Pergerakan kamera lebih halus
controls.dampingFactor = 0.05;

// Fungsi Animasi Utama
function animate() {
    requestAnimationFrame(animate);
    controls.update();          // Memperbarui OrbitControls
    mesh.rotation.x += 0.01;    // Rotasi objek pada sumbu x
    mesh.rotation.y += 0.01;    // Rotasi objek pada sumbu y
    renderer.render(scene, camera);
}
animate();

// Menangani Resize Window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
