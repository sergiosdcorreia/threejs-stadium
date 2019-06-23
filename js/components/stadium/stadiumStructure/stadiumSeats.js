const stadiumSeats = () => {

    // Textures
    const seatsTexture = new THREE.TextureLoader().load('textures/seats1.jpg');
    seatsTexture.wrapS = THREE.RepeatWrapping;
    seatsTexture.wrapT = THREE.RepeatWrapping;
    seatsTexture.repeat.set(15, 2);

    const seatsSidesTexture = new THREE.TextureLoader().load('textures/seats1.jpg');
    seatsSidesTexture.wrapS = THREE.RepeatWrapping;
    seatsSidesTexture.wrapT = THREE.RepeatWrapping;
    seatsSidesTexture.repeat.set(10, 2);

    // Materials
    const seatsMaterial = new THREE.MeshBasicMaterial({
        map: seatsTexture,
        // emissive: 0xfceeb6,
        // emissiveIntensity: 0.3,
        // metalness: 0.2,
        side: THREE.DoubleSide,
    });

    const seatsSideMaterial = new THREE.MeshBasicMaterial({
        map: seatsSidesTexture,
        // emissive: 0xfceeb6,
        // emissiveIntensity: 0.3,
        // metalness: 0.2,
        side: THREE.DoubleSide,
    });

    // Geometries
    const seatsGeo = new THREE.PlaneGeometry( 300, 40, 1 );

    const seatsSideGeo = new THREE.PlaneGeometry( 200, 40, 1 );
    seatsSideGeo.translate.x = -200;

    // Meshes
    const seatsObject = new THREE.Group();

    const seats = new THREE.Mesh( seatsGeo, seatsMaterial );
    seats.position.set(0, 14, -114);
    seats.rotation.x = -Math.PI * 0.25;

    const seatsRear =  new THREE.Mesh( seatsGeo, seatsMaterial );
    seatsRear.rotation.x = Math.PI * 0.25;
    seatsRear.position.set(0, 14, 114);

    const seatsSideLeft = new THREE.Mesh( seatsSideGeo, seatsSideMaterial );
    seatsSideLeft.position.set(-164, 14, 0);
    rotateAroundWorldAxis(seatsSideLeft, new THREE.Vector3(1,0,0), THREE.Math.degToRad(45));
    rotateAroundWorldAxis(seatsSideLeft, new THREE.Vector3(0,1,0), THREE.Math.degToRad(-90));

    const seatsSideRight = new THREE.Mesh( seatsSideGeo, seatsSideMaterial );
    seatsSideRight.position.set(164, 14, 0);
    rotateAroundWorldAxis(seatsSideRight, new THREE.Vector3(1,0,0), THREE.Math.degToRad(45));
    rotateAroundWorldAxis(seatsSideRight, new THREE.Vector3(0,1,0), THREE.Math.degToRad(90));

    seatsObject.add(seats);
    seatsObject.add(seatsRear);
    seatsObject.add(seatsSideLeft);
    seatsObject.add(seatsSideRight);

    return seatsObject;
}
