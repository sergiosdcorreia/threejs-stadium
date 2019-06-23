const stadiumObject = () => {

    const dustTexture = new THREE.TextureLoader().load('textures/dust.png');

    // Meshes
    const stadium = new THREE.Group();

    // Flares

    const getPositions = (N) => {
        let flares = [];

        let maxRange = 290;
        let minPosition = -145;

        const flareSpacing = maxRange / (N - 1);

        for (let i = 0; i < N; i++) {
            flares.push(minPosition + (flareSpacing * i));
        }

        return flares;
    }

    const renderFlares = (z) => {
        const numberOfFlares = 40;
        const flareObjects = getPositions(numberOfFlares);

        for (let i = 1; i < numberOfFlares; i++) {
            lensFlareObject(
                stadium,
                {
                    position: {
                        x: flareObjects[i],
                        y: 34.1,
                        z: z,
                    },
                }
            );
        };
    };

    const renderProjectors = (z) => {
        const numberOfFlares = 40;
        const flareObjects = getPositions(numberOfFlares);

        for (let i = 1; i < numberOfFlares; i++) {
            lightProjector(
                stadium,
                {
                    position: {
                        x: flareObjects[i],
                        y: 35,
                        z: z,
                    },
                }
            );
        };
    };

    const getSidePositions = (N) => {
        let flares = [];

        let maxRange = 195;
        let minPosition = -95;

        const flareSpacing = maxRange / (N - 1);

        for (let i = 0; i < N; i++) {
            flares.push(minPosition + (flareSpacing * i));
        }

        return flares;
    }

    const renderSideFlares = (x) => {
        const numberOfFlares = 25;
        const flareObjects = getSidePositions(numberOfFlares);

        for (let i = 1; i < numberOfFlares; i++) {
            lensFlareObject(
                stadium,
                {
                    position: {
                        x: x,
                        y: 34.1,
                        z: flareObjects[i],
                    },
                }
            );
        };
    };

    // Dust Particles
    const dustParticles = () => {
        const environmentDustGeo = new THREE.Geometry();
        const environmentDustMat = new THREE.PointsMaterial({
            size: 1,
            transparent: true,
            opacity: 0.1,
            map: dustTexture,
            sizeAttenuation: true,
            depthTest: false,
        });

        const dust3 = new THREE.Points(environmentDustGeo, environmentDustMat);
        dust3.rotation.y = Math.PI * -0.5;
        const range = 300;
        const rangeSide = 200;
        for ( let i = 0; i < 5000; i++) {
            const particle = new THREE.Vector3(
                Math.random() * range - range / 2,
                Math.random() * 40,
                Math.random() * rangeSide - rangeSide / 2,
            );
            particle.velocityY = Math.random() / 5;
            particle.velocityX = (Math.random() - 0.5) / 3;
            particle.velocityZ = (Math.random() - 0.5) / 3;
            environmentDustGeo.vertices.push(particle);
        }

        return dust3;
    };

        // Smoke Particles
        const smokeParticles = () => {
            const environmentSmokeGeo = new THREE.Geometry();
            const environmentSmokeMat = new THREE.PointsMaterial({
                size: 60,
                transparent: true,
                opacity: 0.022,
                map: dustTexture,
                sizeAttenuation: true,
                depthTest: false,
            });
    
            const smoke = new THREE.Points(environmentSmokeGeo, environmentSmokeMat);
            smoke.rotation.y = Math.PI * -0.5;
            const range = 300;
            const rangeSide = 200;
            for ( let i = 0; i < 1000; i++) {
                const particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    Math.random() * 40,
                    Math.random() * rangeSide - rangeSide / 2,
                );
                particle.velocityY = Math.random() / 5;
                particle.velocityX = (Math.random() - 0.5) / 3;
                particle.velocityZ = (Math.random() - 0.5) / 3;
                environmentSmokeGeo.vertices.push(particle);
            }
    
            return smoke;
        };

    // Corner Light Dust
    const dustParticlesLights = () => {
        const dust = new THREE.Group();

        const dustGeo = new THREE.ConeGeometry( 10, 30, 7, 7 );
        const dustMat = new THREE.PointsMaterial({
            size: 50,
            transparent: true,
            opacity: 0.015,
            map: dustTexture,
            sizeAttenuation: true,
            depthTest: false,
        });

    const dustLeft = new THREE.Points(dustGeo, dustMat);
    dustLeft.position.set(-105, 24, -88);
    dustLeft.rotation.x = Math.PI * -0.3;
    dust.add(dustLeft);

    const dustLeft2 = new THREE.Points(dustGeo, dustMat);
    dustLeft2.position.set(-95, 25, -92);
    dustLeft2.rotation.x = Math.PI * -0.4;
    dust.add(dustLeft2);

    const dustLeft3 = new THREE.Points(dustGeo, dustMat);
    dustLeft3.position.set(-85, 26, -84);
    dustLeft3.rotation.x = Math.PI * -0.35;
    dust.add(dustLeft3);

    const dustRight = new THREE.Points(dustGeo, dustMat);
    dustRight.position.set(105, 24, -88);
    dustRight.rotation.x = Math.PI * -0.3;
    dust.add(dustRight);

    const dustRight2 = new THREE.Points(dustGeo, dustMat);
    dustRight2.position.set(95, 25, -92);
    dustRight2.rotation.x = Math.PI * -0.4;
    dust.add(dustRight2);    

    const dustRight3 = new THREE.Points(dustGeo, dustMat);
    dustRight3.position.set(85, 26, -84);
    dustRight3.rotation.x = Math.PI * -0.35;
    dust.add(dustRight3);

    const dustBackLeft = new THREE.Points(dustGeo, dustMat);
    dustBackLeft.position.set(-105, 24, 88);
    dustBackLeft.rotation.x = Math.PI * 0.3;
    dust.add(dustBackLeft);

    const dustBackLeft2 = new THREE.Points(dustGeo, dustMat);
    dustBackLeft2.position.set(-95, 25, 92);
    dustBackLeft2.rotation.x = Math.PI * 0.4;
    dust.add(dustBackLeft2);

    const dustBackLeft3 = new THREE.Points(dustGeo, dustMat);
    dustBackLeft3.position.set(-85, 26, 84);
    dustBackLeft3.rotation.x = Math.PI * 0.35;
    dust.add(dustBackLeft3);

    const dustBackRight = new THREE.Points(dustGeo, dustMat);
    dustBackRight.position.set(105, 24, 88);
    dustBackRight.rotation.x = Math.PI * 0.3;
    dust.add(dustBackRight);

    const dustBackRight2 = new THREE.Points(dustGeo, dustMat);
    dustBackRight2.position.set(95, 25, 92);
    dustBackRight2.rotation.x = Math.PI * 0.4;
    dust.add(dustBackRight2);

    const dustBackRight3 = new THREE.Points(dustGeo, dustMat);
    dustBackRight3.position.set(85, 26, 84);
    dustBackRight3.rotation.x = Math.PI * 0.35;
    dust.add(dustBackRight3);

    return dust;
    }

    // Dust Particles Corners




    // Adding objects to the stadium
    stadium.add(stadiumStructure());
    stadium.add(stadiumSeats());
    stadium.add(stadiumField());
    stadium.add(dustParticles());
    stadium.add(dustParticlesLights());
    stadium.add(smokeParticles());
    renderFlares(-100);
    renderFlares(100);
    renderProjectors(-101.7);
    renderSideFlares(-150);
    renderSideFlares(150);

    return stadium;
}
