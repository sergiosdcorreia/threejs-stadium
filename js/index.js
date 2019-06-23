let renderer;
let scene;
let camera;
let spotLight;
let DirectionalLight;
let DirectionalLight2;
let controls;

const rotateAroundWorldAxis = (object, axis, radians) => {
    let rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);  // pre-multiply
    object.matrix = rotWorldMatrix;
    object.setRotationFromMatrix(object.matrix);
};

onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

const setupScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
};

const setupCamera = () => {
    camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight, 0.1, 1000,
    );

    camera.position.set(0, 15, -40);
    camera.lookAt(0, 0, -90);
};

const setupRenderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.sortObjects = false
    document.body.appendChild(renderer.domElement);
};

const setupLights = () => {
    // ambientLight = new THREE.AmbientLight( 0xffffff, .3 ); // soft white light
    // scene.add( ambientLight );

    spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 20, -90);
    spotLight.decay = 2;
    // spotLight.castShadow = true;
    spotLight.angle = Math.PI / 2;
    spotLight.penumbra = 1;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.radius = 25;
    scene.add(spotLight);

    DirectionalLight = new THREE.DirectionalLight(0xffaa33, 0.15, 100);
    DirectionalLight.decay = 1;
    DirectionalLight.position.set(-50, 20, -15);
    DirectionalLight.lookAt(0, 10, 0);
    DirectionalLight.castShadow = true;
    scene.add(DirectionalLight);

    DirectionalLight2 = new THREE.DirectionalLight(0xffaa33, 0.45, 100);
    DirectionalLight.decay = 1;
    DirectionalLight2.position.set(50, 20, 20);
    DirectionalLight2.lookAt(0, 10, 0);
    DirectionalLight.castShadow = true;
    scene.add(DirectionalLight2);
};

const setupControls = () => {
    controls = new THREE.OrbitControls(camera);
    controls.enablePan = false;
    controls.minPolarAngle = THREE.Math.degToRad(30);
    controls.maxPolarAngle = THREE.Math.degToRad(95);
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.target.set(0, 10, -80);
    controls.update();
};

const setupModels = () => {
    scene.add(stadiumObject());
    scene.add(skyCylinderObject());

    renderCandles();
};

const radiantsToCoord = (distance, radiants, multiplier) => {
    let x = multiplier * distance * Math.sin(radiants * Math.PI);
    let z = multiplier * distance * Math.cos(radiants * Math.PI);

    return { x, z }
};

const getPositions = (N) => {
    let candles = [{x:0,z:0}];

    let totalCandles = 0;
    let previousTotalCandles = 0;
    let deltaCandles = 0;
    let circle = 0;

    while (totalCandles < N) {
        const radiantsStep = 1 / (deltaCandles - 1);

        for (let i = 0; i < deltaCandles; i++) {
            candles.push(radiantsToCoord(circle, radiantsStep * i - 0.5, 3));
        }

        circle++;
        previousTotalCandles = totalCandles;
        totalCandles += Math.floor(Math.PI * circle);
        deltaCandles = totalCandles - previousTotalCandles;
    }

    const leftTotalCandles = Math.floor(Math.PI * circle);
    const radiantsStep = 1 / (leftTotalCandles - 1);
    const leftCandles = N - previousTotalCandles;

    for (let i = 0; i < leftCandles; i++) {
        candles.push(radiantsToCoord(circle, radiantsStep * i - 0.5, 3));
    }

    return candles;
};

const renderCandles = () => {
    const numberOfCandles = 109;
    const candlesObjects = getPositions(numberOfCandles);
    
    for (let i = 1; i < candlesObjects.length; i++){
        let { x, z } = candlesObjects[i];

        const random = Math.random();

        candleObject(
            scene,
            {
                position: {
                    x: random * 1 + x,
                    y: 0,
                    z: random * 1 + z - 80,
                },
            }
        );
    };
};


const init = () => {
    setupScene();
    setupCamera();
    setupRenderer();
    setupLights();
    setupControls();
    setupModels();

    // window.addEventListener( 'resize', onWindowResize, false );
};

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    const vertices = system2.geometry.vertices;
    vertices.forEach(function (v) {
        v.x = v.x - (v.velocityX);
        v.y = v.y - (v.velocityY);
        v.z = v.z - (v.velocityZ);
    })
};

init();
render();
