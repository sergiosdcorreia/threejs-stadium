const skyCylinderObject = () => {

  const skyTexture = new THREE.TextureLoader().load('textures/starry-night.jpg');
  skyTexture.wrapS = THREE.RepeatWrapping;
  skyTexture.wrapT = THREE.RepeatWrapping;
  skyTexture.repeat.set(1, 2);

  const circleSky = new THREE.SphereGeometry(250, 50, 64, 0, Math.PI);
  const circleMaterialSky = new THREE.MeshBasicMaterial({
    map: skyTexture,
    side: THREE.DoubleSide,
  });
  const sky = new THREE.Mesh(circleSky, circleMaterialSky);
  sky.rotation.x = Math.PI * -0.5;
  sky.position.set(0, 40, 0);

  return sky;
}
