import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export function createLathe(config) {
    // Generate points for LatheGeometry in the X-Y plane based on the number of points in the config
    const points = [];
    for (let i = 0; i < config.numberOfPoints; i++) {
        const x = 5 + Math.sin(i * 0.2) * 10;
        const y = i - config.numberOfPoints / 2;
        points.push(new THREE.Vector2(x, y));
    }

    // Create LatheGeometry with dynamic segments, phiStart, and phiLength from the config
    const geometry = new THREE.LatheGeometry(points, config.segments, config.phiStart, config.phiLength);
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
}
