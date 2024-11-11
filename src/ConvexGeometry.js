import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { ConvexGeometry } from 'https://threejs.org/examples/jsm/geometries/ConvexGeometry.js';

export function createConvex(config) {
    // Generate random points for ConvexGeometry
    const points = [];
    for (let i = 0; i < config.numberOfPoints; i++) {
        const randomX = -15 + Math.round(Math.random() * 30);
        const randomY = -15 + Math.round(Math.random() * 30);
        const randomZ = -15 + Math.round(Math.random() * 30);
        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    // Create point group for visualization
    const spGroup = new THREE.Group();
    const pointMaterial = new THREE.MeshBasicMaterial({ color: config.pointColor || 0xff0000 });

    points.forEach((point) => {
        const spGeom = new THREE.SphereGeometry(config.pointSize || 0.2);
        const spMesh = new THREE.Mesh(spGeom, pointMaterial);
        spMesh.position.copy(point);
        spGroup.add(spMesh);
    });

    // Create ConvexGeometry from points
    const convexGeometry = new ConvexGeometry(points);
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const convexMesh = new THREE.Mesh(convexGeometry, material);

    // Create a group to hold the points and the convex hull mesh
    const convexGroup = new THREE.Group();
    convexGroup.add(spGroup);
    convexGroup.add(convexMesh);

    return convexGroup; // Return the group containing points and convex mesh
}
