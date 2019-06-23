const stadiumField = () => {
    const grassTexture = new THREE.TextureLoader().load('textures/ground-grass-night.jpg');
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(50, 50);

    const grassBump = new THREE.TextureLoader().load('textures/ground-grass-bump.jpg');
    grassBump.wrapS = THREE.RepeatWrapping;
    grassBump.wrapT = THREE.RepeatWrapping;
    grassBump.repeat.set(50, 50);

    const fieldTexture = new THREE.TextureLoader().load('textures/field.png');

    const fieldTexture2 = new THREE.TextureLoader().load('textures/field2.png');

    // Materials
    const grassMaterial = new THREE.MeshPhongMaterial({
        map: grassTexture,
        bumpMap: grassBump,
        bumpScale: 0.8,
        shininess: 0.6,
        side:THREE.BackSide,
    })

    const fieldMaterial = new THREE.MeshBasicMaterial({
        map: fieldTexture,
        transparent: true,
        opacity: 0.2,
        // roughness: 0.7,
        side: THREE.BackSide,
    });

    const fieldMaterial2 = new THREE.MeshBasicMaterial({
        map: fieldTexture2,
        transparent: true,
        opacity: 0.2,
        // roughness: 0.7,
        side: THREE.BackSide,
    });

    const boardMat = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
    })

    // Geometries
    const grassGeo = new THREE.PlaneGeometry( 300, 300, 1 );

    const fieldGeo = new THREE.PlaneGeometry( 200, 200, 1 );

    const boardGeo = new THREE.PlaneGeometry( 294, 2, 1 );

    const boardSidesGeo = new THREE.PlaneGeometry( 194, 2, 1 );

    // Meshes
    const gameField = new THREE.Group();

    const grass = new THREE.Mesh( grassGeo, grassMaterial);
    grass.rotation.x = Math.PI * 0.5;

    const fieldLeft = new THREE.Mesh( fieldGeo, fieldMaterial );
    fieldLeft.position.set(-100, .01, 0);
    fieldLeft.rotation.x = Math.PI * 0.5;

    const fieldRight = new THREE.Mesh( fieldGeo, fieldMaterial2 );
    fieldRight.position.set(100, .01, 0);
    fieldRight.rotation.x = Math.PI * 0.5;

    const board = new THREE.Mesh( boardGeo, boardMat );
    board.position.set(0, 1, -97);

    const boardBack = new THREE.Mesh( boardGeo, boardMat );
    boardBack.position.set(0, 1, 97);

    const boardLeft = new THREE.Mesh( boardSidesGeo, boardMat );
    boardLeft.position.set(147, 1, 0);
    boardLeft.rotation.y = Math.PI * 0.5;

    const boardRight = new THREE.Mesh( boardSidesGeo, boardMat );
    boardRight.position.set(-147, 1, 0);
    boardRight.rotation.y = Math.PI * 0.5;

    gameField.add(grass);
    gameField.add(fieldLeft);
    gameField.add(fieldRight);
    gameField.add(board);
    gameField.add(boardBack);
    gameField.add(boardLeft);
    gameField.add(boardRight);

    return gameField;
}