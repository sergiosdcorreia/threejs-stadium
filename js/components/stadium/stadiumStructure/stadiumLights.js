const lensFlareObject = (stadium, options ) => {    
    const flareColor = new THREE.Color(0xeeeeee);

    const {
        position: { x = 0, y = 35, z = -100 },
    } = options;

    const flareTexture = new THREE.TextureLoader().load('textures/Grey-Flare.png');

    const lensFlare = new THREE.Lensflare();

    lensFlare.addElement(new THREE.LensflareElement(flareTexture, 65, 0, flareColor, THREE.MultiplyBlending));
    lensFlare.position.set(x, y, z);
    stadium.add(lensFlare);

    return lensFlare;
};

const lightProjector = ( stadium, options ) => {
    const {
        position: { x = 0, y = 35, z = -100 },
    } = options;

    const projectorGeo = new THREE.CylinderGeometry( 1, 1, 3, 32 );

    const projectorMat = new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide,
    })

    const lightProjector = new THREE.Mesh( projectorGeo, projectorMat );
    lightProjector.position.set(x, y, z);
    lightProjector.rotation.x = Math.PI * 0.6;

    stadium.add(lightProjector);

    return lightProjector;
};
