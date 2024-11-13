// ExtrudeGeometry.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export function createExtrude(config) {
    // Membuat bentuk 2D untuk diekstrusi
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(10, 0);
    shape.lineTo(10, 10);
    shape.lineTo(0, 10);
    shape.lineTo(0, 0);

    // Konfigurasi ekstrusi dari parameter
    const extrudeSettings = {
        steps: config.steps || 2,
        depth: config.depth || 5,
        bevelEnabled: config.bevelEnabled || true,
        bevelThickness: config.bevelThickness || 1,
        bevelSize: config.bevelSize || 1,
        bevelSegments: config.bevelSegments || 3
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({ color: config.color || 0x0077ff });
    return new THREE.Mesh(geometry, material);
}
