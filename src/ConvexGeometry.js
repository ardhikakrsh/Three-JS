var spGroup;

function generatePoints() {
  if (spGroup) scene.remove(spGroup)
  var points = [];
  for (var i = 0; i < 20; i++) {
    var randomX = -15 + Math.round(Math.random() * 30);
    var randomY = -15 + Math.round(Math.random() * 30);
    var randomZ = -15 + Math.round(Math.random() * 30);
    points.push(new THREE.Vector3(randomX, randomY, randomZ));
  }
  spGroup = new THREE.Object3D();
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: false
  });
  points.forEach(function (point) {
    var spGeom = new THREE.SphereGeometry(0.2);
    var spMesh = new THREE.Mesh(spGeom, material);
    spMesh.position.copy(point);
    spGroup.add(spMesh);
  });
  // add the points as a group to the scene
  scene.add(spGroup);

  // use the same points to create a convexgeometry
  var convexGeometry = new THREE.ConvexGeometry(points);
  // if we want a smooth rendered object, we have to compute the vertex and face normals
  convexGeometry.computeVertexNormals();
  convexGeometry.computeFaceNormals();
  convexGeometry.normalsNeedUpdate = true;
}
