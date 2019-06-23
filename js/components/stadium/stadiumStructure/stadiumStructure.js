const stadiumStructure = () => {

    const concrete = new THREE.TextureLoader().load('textures/concreteBuilding.jpg');
    concrete.wrapS = THREE.RepeatWrapping;
    concrete.wrapT = THREE.RepeatWrapping;
    concrete.repeat.set(0.75, 1);

    const concreteCover = new THREE.TextureLoader().load('textures/concreteCover.jpg');
    concreteCover.wrapS = THREE.RepeatWrapping;
    concreteCover.wrapT = THREE.RepeatWrapping;
    concreteCover.repeat.set(15, 2);

    const steelTexture = new THREE.TextureLoader().load('textures/steel-structure.png');
    steelTexture.wrapS = THREE.RepeatWrapping;
    steelTexture.wrapT = THREE.RepeatWrapping;
    steelTexture.repeat.set(15, 1);

    const steelBump = new THREE.TextureLoader().load('textures/steel-structure-bump.png');
    steelBump.wrapS = THREE.RepeatWrapping;
    steelBump.wrapT = THREE.RepeatWrapping;
    steelBump.repeat.set(15, 1);

    const steelSideTexture = new THREE.TextureLoader().load('textures/steel-structure.png');
    steelSideTexture.wrapS = THREE.RepeatWrapping;
    steelSideTexture.wrapT = THREE.RepeatWrapping;
    steelSideTexture.repeat.set(10, 1);

    const steelSideBump = new THREE.TextureLoader().load('textures/steel-structure-bump.png');
    steelSideBump.wrapS = THREE.RepeatWrapping;
    steelSideBump.wrapT = THREE.RepeatWrapping;
    steelSideBump.repeat.set(10, 1);

    // Materials
    const structureMaterial = new THREE.MeshBasicMaterial({
        map: concrete,
        side: THREE.DoubleSide,
    });

    const coverMaterial= new THREE.MeshBasicMaterial({
        map: concreteCover,
        side: THREE.DoubleSide,
    });

    const steelMaterial= new THREE.MeshBasicMaterial({
        map: steelTexture,
        transparent: true,
        // roughness: 0.2,
        // metalness: 0,
        depthTest: false,
        side: THREE.DoubleSide,
    });

    const steelSideMaterial= new THREE.MeshBasicMaterial({
        map: steelSideTexture,
        transparent: true,
        // roughness: 0.2,
        // metalness: 0,
        depthTest: false,
        side: THREE.DoubleSide,
    });

    const steelMaterialBack= new THREE.MeshBasicMaterial({
        map: steelTexture,
        transparent: true,
        // roughness: 0.2,
        // metalness: 0,
        side: THREE.DoubleSide,
    });

    const steelSideMaterialBack= new THREE.MeshBasicMaterial({
        map: steelSideTexture,
        transparent: true,
        // roughness: 0.2,
        // metalness: 0,
        side: THREE.DoubleSide,
    });

    // Geometries
    const stadiumCoverGeo = new THREE.PlaneGeometry( 300, 30, 1 );

    const stadiumSideCoverGeo = new THREE.PlaneGeometry( 200, 30, 1 );

    const structureGeo = new THREE.PlaneGeometry( 30, 44, 1 );

    const steelGeo = new THREE.PlaneGeometry( 300, 6, 1 );

    const steelSideGeo = new THREE.PlaneGeometry( 200, 6, 1 );

    // Meshes
    const structure = new THREE.Group();

    const coverFront = new THREE.Mesh( stadiumCoverGeo, coverMaterial );
    coverFront.position.set(0, 32.4, -115);
    coverFront.rotation.x = Math.PI * 0.4;

    const coverBack = new THREE.Mesh( stadiumCoverGeo, coverMaterial );
    coverBack.position.set(0, 32.4, 115);
    coverBack.rotation.x = Math.PI * -0.4;

    const coverLeft = new THREE.Mesh( stadiumSideCoverGeo, coverMaterial );
    coverLeft.position.set(-165, 32.4, 0);
    rotateAroundWorldAxis(coverLeft, new THREE.Vector3(1,0,0), THREE.Math.degToRad(-107));
    rotateAroundWorldAxis(coverLeft, new THREE.Vector3(0,1,0), THREE.Math.degToRad(90));

    const coverRight = new THREE.Mesh( stadiumSideCoverGeo, coverMaterial );
    coverRight.position.set(165, 32.4, 0);
    rotateAroundWorldAxis(coverRight, new THREE.Vector3(1,0,0), THREE.Math.degToRad(107));
    rotateAroundWorldAxis(coverRight, new THREE.Vector3(0,1,0), THREE.Math.degToRad(90));

    const structureFrontLeft = new THREE.Mesh( structureGeo, structureMaterial );
    structureFrontLeft.position.set(-165, 22, -100);
    structureFrontLeft.rotation.y = Math.PI;

    const structureFrontLeft2 = new THREE.Mesh( structureGeo, structureMaterial );
    structureFrontLeft2.position.set(-150, 22, -115);
    structureFrontLeft2.rotation.y = Math.PI * 0.5;

    const structureFrontRight = new THREE.Mesh( structureGeo, structureMaterial );
    structureFrontRight.position.set(165, 22, -100);

    const structureFrontRight2 = new THREE.Mesh( structureGeo, structureMaterial );
    structureFrontRight2.position.set(150, 22, -115);
    structureFrontRight2.rotation.y = Math.PI * 0.5;

    const structureRearLeft = new THREE.Mesh( structureGeo, structureMaterial );
    structureRearLeft.position.set(-165, 22, 100);
    structureRearLeft.rotation.y = Math.PI;

    const structureRearLeft2 = new THREE.Mesh( structureGeo, structureMaterial );
    structureRearLeft2.position.set(-150, 22, 115);
    structureRearLeft2.rotation.y = Math.PI * -0.5;

    const structureRearRight = new THREE.Mesh( structureGeo, structureMaterial );
    structureRearRight.position.set(165, 22, 100);

    const structureRearRight2 = new THREE.Mesh( structureGeo, structureMaterial );
    structureRearRight2.position.set(150, 22, 115);
    structureRearRight2.rotation.y = Math.PI * -0.5;

    const steelStructure = new THREE.Mesh( steelGeo, steelMaterial );
    steelStructure.position.set(0, 40, -100.7 );

    const steelBackStructure = new THREE.Mesh( steelGeo, steelMaterial );
    steelBackStructure.position.set(0, 40, 100.7 );

    const steelLeftStructure = new THREE.Mesh( steelSideGeo, steelSideMaterial );
    steelLeftStructure.position.set(-150.7, 40, 0 );
    steelLeftStructure.rotation.y = Math.PI * -0.5;

    const steelRightStructure = new THREE.Mesh( steelSideGeo, steelSideMaterial );
    steelRightStructure.position.set(150.7, 40, 0 );
    steelRightStructure.rotation.y = Math.PI * 0.5;

    const steelStructureBack = new THREE.Mesh( steelGeo, steelMaterialBack );
    steelStructureBack.position.set(0, 39, -105 );

    const steelBackStructureBack = new THREE.Mesh( steelGeo, steelMaterialBack );
    steelBackStructureBack.position.set(0, 39, 105 );

    const steelLeftStructureBack = new THREE.Mesh( steelSideGeo, steelSideMaterialBack );
    steelLeftStructureBack.position.set(-155, 39, 0 );
    steelLeftStructureBack.rotation.y = Math.PI * -0.5;

    const steelRightStructureBack = new THREE.Mesh( steelSideGeo, steelSideMaterialBack );
    steelRightStructureBack.position.set(155, 39, 0 );
    steelRightStructureBack.rotation.y = Math.PI * 0.5;

    structure.add(coverFront);
    structure.add(coverBack);
    structure.add(coverLeft);
    structure.add(coverRight);
    structure.add(structureFrontLeft);
    structure.add(structureFrontLeft2);
    structure.add(structureFrontRight);
    structure.add(structureFrontRight2);
    structure.add(structureRearLeft);
    structure.add(structureRearLeft2);
    structure.add(structureRearRight);
    structure.add(structureRearRight2);
    structure.add(steelStructure);
    structure.add(steelBackStructure);
    structure.add(steelLeftStructure);
    structure.add(steelRightStructure);
    // structure.add(steelStructureBack);
    // structure.add(steelBackStructureBack);
    // structure.add(steelLeftStructureBack);
    // structure.add(steelRightStructureBack);

    return structure;
}
