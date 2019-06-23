    /**
     * Create the candle object
     *
     * @param {object} options    Object with configuration options for the candle
     *
     * @return {THREE.Mesh} candleMesh
     */
const candleObject = (scene, options) => {
    const {
        position: { x = 0, y = 0, z = 0 },
    } = options;

    const scaleXZ = Math.random() * 0.10 + 0.10;

    const candlePath = new THREE.Path();
    candlePath.lineTo(2, 0);
    candlePath.lineTo(2, 6);

    const candleGeo = new THREE.LatheBufferGeometry(candlePath.getPoints(), 64);
    const candleTopGeo = new THREE.CircleGeometry(2, 32);

    const candleBorderPath = new THREE.Path();
    candleBorderPath.absarc(1.8, 6, 0.2, 0, Math.PI);

    const candleBorderGeo = new THREE.LatheBufferGeometry(candleBorderPath.getPoints(), 64);

    // Textures
    const value = new THREE.TextureLoader().load('textures/candle-bump.jpg');
    value.wrapS = THREE.RepeatWrapping;
    value.wrapT = THREE.RepeatWrapping;
    value.repeat.set(2, 1);

    const emissiveMap = new THREE.TextureLoader().load('textures/candle-emissive-map.jpg');
    emissiveMap.wrapS = THREE.RepeatWrapping;
    emissiveMap.wrapT = THREE.RepeatWrapping;
    emissiveMap.repeat.set(2, 1);

    // Materials
    const candleMaterial = new THREE.MeshStandardMaterial({
        color: 0xfceeb6,
        bumpMap: value,
        bumpScale: 0.25,
        emissiveMap,
        emissive: 0xfceeb6,
        emissiveIntensity: 0.8,
        roughness: 0.7,
        side: THREE.DoubleSide,
    });

    const candleTopMaterial = new THREE.MeshStandardMaterial({
        color: 0xfceeb6,
        emissive: 0xfceeb6,
        emissiveIntensity: 0.6,
        emissiveMap: new THREE.TextureLoader().load('textures/candleTop-emissive-map.jpg'),
        roughness: 0.7,
        side: THREE.DoubleSide,
    });

    const candleBorderMaterial = new THREE.MeshStandardMaterial({
        color: 0xfceeb6,
        emissive: 0xfceeb6,
        emissiveIntensity: 0.75,
        roughness: 0.7,
        side: THREE.DoubleSide,
    });

    const candleMesh = new THREE.Mesh(candleGeo, candleMaterial);
    const candleTopCircle = new THREE.Mesh(candleTopGeo, candleTopMaterial);
    candleTopCircle.position.set(0, 6, 0);
    candleTopCircle.rotation.x = Math.PI * 0.5;
    const candleBorder = new THREE.Mesh(candleBorderGeo, candleBorderMaterial);

    candleMesh.castShadow = true;
    candleMesh.add(candleTopCircle);
    candleMesh.add(candleBorder);

    // candlewick
    const candlewickProfile = new THREE.Shape();
    candlewickProfile.absarc(0, 0, 0.0625, 0, Math.PI * 2);

    const candlewickCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.5, -0.0625),
        new THREE.Vector3(0.25, 0.5, 0.125),
    ]);

    // Candle Wick
    const candlewickGeo = new THREE.ExtrudeBufferGeometry(candlewickProfile, {
        steps: 8,
        bevelEnabled: false,
        extrudePath: candlewickCurve,
    });

    const colors = [];
    const color1 = new THREE.Color('black');
    const color2 = new THREE.Color(0x994411);
    const color3 = new THREE.Color(0xffff44);

    for (let i = 0; i < candlewickGeo.attributes.position.count; i += 1) {
        if (candlewickGeo.attributes.position.getY(i) < 0.4) {
        color1.toArray(colors, i * 3);
        } else {
        color2.toArray(colors, i * 3);
        }
        if (candlewickGeo.attributes.position.getY(i) < 0.15) color3.toArray(colors, i * 3);
    }
    candlewickGeo.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    candlewickGeo.translate(0, 5.9, 0);

    const candlewickMat = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
    });

    const candlewickMesh = new THREE.Mesh(candlewickGeo, candlewickMat);
    candleMesh.add(candlewickMesh);

    candleMesh.position.set(x, y, z);
    candleMesh.scale.x = scaleXZ;
    candleMesh.scale.y = Math.random() * 0.2 + 0.2;
    candleMesh.scale.z = scaleXZ;

    candleMesh.castShadow = true;

    scene.add(candleMesh);

    return candleMesh;
};
