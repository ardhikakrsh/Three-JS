import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export function createTube(config) {
    const points = [];
    for (let i = 0; i < config.numberOfPoints; i++) {
        const randomX = -20 + Math.round(Math.random() * 50);
        const randomY = -15 + Math.round(Math.random() * 40);
        const randomZ = -20 + Math.round(Math.random() * 40);
        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, config.segments, config.radius, config.radialSegments, config.closed);
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
}
