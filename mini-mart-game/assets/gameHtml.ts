export const gameHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Mini Mart 3D</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body { margin: 0; padding: 0; overflow: hidden; background-color: #8BC34A; font-family: Arial, sans-serif; }
        #canvas-container { width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 1; }
        #ui-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; }
        .ui-element { pointer-events: auto; }
        
        #cash-display {
            position: absolute; top: 20px; left: 20px;
            background: #000; color: #8BC34A; padding: 10px 15px;
            font-size: 24px; font-weight: bold; border-radius: 8px;
        }
        
        #ad-button {
            position: absolute; top: 80px; left: 20px;
            background: #333; color: #ffaa00; padding: 10px 15px;
            font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer;
            border: 2px solid #ffaa00;
        }
        #ad-button:active { background: #555; }
        
        #joystick-zone {
            position: absolute; bottom: 0; left: 0; width: 50%; height: 50%;
            pointer-events: auto; touch-action: none;
        }
        
        #joystick-base {
            position: absolute; width: 100px; height: 100px; border-radius: 50%;
            background: rgba(255, 255, 255, 0.2); border: 2px solid rgba(255, 255, 255, 0.5);
            display: none; transform: translate(-50%, -50%);
        }
        #joystick-stick {
            position: absolute; width: 50px; height: 50px; border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            top: 25px; left: 25px;
        }
        
        .floating-text {
            position: absolute; font-weight: bold; color: white;
            text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
            pointer-events: none; transition: top 1s ease-out, opacity 1s ease-out;
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
    <div id="canvas-container"></div>
    <div id="ui-layer">
        <div id="cash-display" class="ui-element">💵 Cash: $0</div>
        <div id="ad-button" class="ui-element">📺 Watch Ad for $100</div>
        <div id="joystick-zone"></div>
        <div id="joystick-base"><div id="joystick-stick"></div></div>
    </div>

    <script>
        // Game State
        let cash = 0;
        let shelfStock = 0;
        const maxShelfStock = 10;
        let playerInventory = 0;
        const maxInventory = 3;

        // UI Elements
        const cashDisplay = document.getElementById('cash-display');
        const adButton = document.getElementById('ad-button');
        const uiLayer = document.getElementById('ui-layer');

        adButton.addEventListener('click', () => {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SHOW_AD' }));
            } else if (window.parent) {
                window.parent.postMessage(JSON.stringify({ type: 'SHOW_AD' }), '*');
            }
        });

        window.addEventListener('message', (event) => {
            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                if (data.type === 'REWARD_GRANTED') {
                    addCash(100, playerGroup.position);
                }
            } catch (e) {}
        });

        function addCash(amount, pos3D) {
            cash += amount;
            cashDisplay.innerText = \`💵 Cash: $\${cash}\`;
            showFloatingText(\`+$\${amount}\`, pos3D, '#8BC34A');
        }

        function showFloatingText(text, pos3D, color) {
            const el = document.createElement('div');
            el.className = 'floating-text';
            el.innerText = text;
            el.style.color = color;
            
            // Project 3D to 2D
            const vector = pos3D.clone();
            vector.y += 2; // above object
            vector.project(camera);
            const x = (vector.x * .5 + .5) * window.innerWidth;
            const y = (-(vector.y * .5) + .5) * window.innerHeight;
            
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            uiLayer.appendChild(el);
            
            // Animate
            setTimeout(() => {
                el.style.top = (y - 50) + 'px';
                el.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                el.remove();
            }, 1050);
        }

        // --- THREE.JS SETUP ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x8BC34A);

        // Isometric-ish Camera
        const aspect = window.innerWidth / window.innerHeight;
        const d = 10;
        const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        camera.position.set(10, 10, 10);
        camera.lookAt(scene.position);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.left = -15;
        dirLight.shadow.camera.right = 15;
        dirLight.shadow.camera.top = 15;
        dirLight.shadow.camera.bottom = -15;
        scene.add(dirLight);

        // --- ENVIRONMENT ---
        // Floor
        const floorGeo = new THREE.PlaneGeometry(30, 30);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xFFE082 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Farm Patch
        const farmGeo = new THREE.BoxGeometry(3, 0.2, 3);
        const farmMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
        const farm = new THREE.Mesh(farmGeo, farmMat);
        farm.position.set(-5, 0.1, -5);
        farm.receiveShadow = true;
        scene.add(farm);

        // Shelf
        const shelfGeo = new THREE.BoxGeometry(4, 2, 1.5);
        const shelfMat = new THREE.MeshStandardMaterial({ color: 0x795548 });
        const shelf = new THREE.Mesh(shelfGeo, shelfMat);
        shelf.position.set(4, 1, -2);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        scene.add(shelf);
        
        // Shelf Tomatoes Visuals
        const shelfItems = [];
        for(let i=0; i<maxShelfStock; i++) {
            const tGeo = new THREE.SphereGeometry(0.3, 8, 8);
            const tMat = new THREE.MeshStandardMaterial({ color: 0xf44336 });
            const t = new THREE.Mesh(tGeo, tMat);
            // Arrange 2 rows of 5
            const row = Math.floor(i / 5);
            const col = i % 5;
            t.position.set(-1.5 + col * 0.75, 1.2, -0.3 + row * 0.6);
            t.visible = false;
            shelf.add(t);
            shelfItems.push(t);
        }

        // Checkout Counter
        const checkoutGeo = new THREE.BoxGeometry(2, 1.5, 3);
        const checkoutMat = new THREE.MeshStandardMaterial({ color: 0x9E9E9E });
        const checkout = new THREE.Mesh(checkoutGeo, checkoutMat);
        checkout.position.set(-4, 0.75, 4);
        checkout.castShadow = true;
        checkout.receiveShadow = true;
        scene.add(checkout);

        // --- PLAYER ---
        const playerGroup = new THREE.Group();
        playerGroup.position.set(0, 0, 0);
        scene.add(playerGroup);

        const pBodyGeo = new THREE.CylinderGeometry(0.4, 0.4, 1, 16);
        const pBodyMat = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
        const pBody = new THREE.Mesh(pBodyGeo, pBodyMat);
        pBody.position.y = 0.5;
        pBody.castShadow = true;
        playerGroup.add(pBody);

        const pHeadGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const pHeadMat = new THREE.MeshStandardMaterial({ color: 0xFFCC80 });
        const pHead = new THREE.Mesh(pHeadGeo, pHeadMat);
        pHead.position.y = 1.2;
        pHead.castShadow = true;
        playerGroup.add(pHead);

        // Player carried boxes
        const carriedBoxes = [];
        for (let i = 0; i < maxInventory; i++) {
            const boxGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
            const boxMat = new THREE.MeshStandardMaterial({ color: 0x8D6E63 });
            const box = new THREE.Mesh(boxGeo, boxMat);
            box.position.y = 1.7 + (i * 0.65); // Stack on head
            box.visible = false;
            box.castShadow = true;
            playerGroup.add(box);
            carriedBoxes.push(box);
        }

        // --- CUSTOMERS ---
        const customers = [];
        function spawnCustomer() {
            if (customers.length >= 4) return;
            
            const cGroup = new THREE.Group();
            cGroup.position.set(8, 0, 8); // Spawn outside
            scene.add(cGroup);
            
            const cBodyGeo = new THREE.CylinderGeometry(0.4, 0.4, 1, 16);
            const cBodyMat = new THREE.MeshStandardMaterial({ color: 0xFFEB3B }); // Yellow
            const cBody = new THREE.Mesh(cBodyGeo, cBodyMat);
            cBody.position.y = 0.5;
            cBody.castShadow = true;
            cGroup.add(cBody);

            const cHeadGeo = new THREE.SphereGeometry(0.35, 16, 16);
            const cHead = new THREE.Mesh(cHeadGeo, pHeadMat); // Same skin tone
            cHead.position.y = 1.2;
            cHead.castShadow = true;
            cGroup.add(cHead);
            
            // Customer carried item
            const itemGeo = new THREE.SphereGeometry(0.3, 8, 8);
            const itemMat = new THREE.MeshStandardMaterial({ color: 0xf44336 });
            const item = new THREE.Mesh(itemGeo, itemMat);
            item.position.set(0, 0.5, 0.5); // hold in front
            item.visible = false;
            cGroup.add(item);

            customers.push({
                mesh: cGroup,
                item: item,
                state: 'GOTO_SHELF'
            });
        }
        setInterval(spawnCustomer, 4000);

        // Cash drops
        const cashDrops = [];

        // --- INPUT / CONTROLS ---
        const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
        window.addEventListener('keydown', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; });
        window.addEventListener('keyup', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = false; });

        // Virtual Joystick
        const joystickZone = document.getElementById('joystick-zone');
        const joystickBase = document.getElementById('joystick-base');
        const joystickStick = document.getElementById('joystick-stick');
        let joystickActive = false;
        let joyStart = { x: 0, y: 0 };
        let joyDelta = { x: 0, y: 0 };

        joystickZone.addEventListener('pointerdown', (e) => {
            joystickActive = true;
            joyStart = { x: e.clientX, y: e.clientY };
            joystickBase.style.display = 'block';
            joystickBase.style.left = e.clientX + 'px';
            joystickBase.style.top = e.clientY + 'px';
            joystickStick.style.transform = \`translate(0px, 0px)\`;
        });
        window.addEventListener('pointermove', (e) => {
            if (!joystickActive) return;
            let dx = e.clientX - joyStart.x;
            let dy = e.clientY - joyStart.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const maxDist = 30;
            if (dist > maxDist) {
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
            }
            joystickStick.style.transform = \`translate(\${dx}px, \${dy}px)\`;
            // Normalize -1 to 1
            joyDelta = { x: dx / maxDist, y: dy / maxDist };
        });
        window.addEventListener('pointerup', () => {
            joystickActive = false;
            joyDelta = { x: 0, y: 0 };
            joystickBase.style.display = 'none';
        });

        window.addEventListener('resize', () => {
            const aspect = window.innerWidth / window.innerHeight;
            camera.left = -d * aspect;
            camera.right = d * aspect;
            camera.top = d;
            camera.bottom = -d;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // --- GAME LOOP ---
        const clock = new THREE.Clock();
        const speed = 5;

        // Simple AABB / Distance checks
        function getDistance(pos1, pos2) {
            const dx = pos1.x - pos2.x;
            const dz = pos1.z - pos2.z;
            return Math.sqrt(dx*dx + dz*dz);
        }

        // Throttle interaction timers
        let lastFarmTime = 0;
        let lastShelfTime = 0;

        function animate() {
            requestAnimationFrame(animate);
            const dt = clock.getDelta();

            // Player Movement
            let moveX = 0;
            let moveZ = 0;

            if (keys.w || keys.ArrowUp) moveZ -= 1;
            if (keys.s || keys.ArrowDown) moveZ += 1;
            if (keys.a || keys.ArrowLeft) moveX -= 1;
            if (keys.d || keys.ArrowRight) moveX += 1;

            if (joystickActive) {
                // Map joystick space to isometric space
                // up on joystick = -z, -x
                moveX = joyDelta.x;
                moveZ = joyDelta.y;
            }

            if (moveX !== 0 || moveZ !== 0) {
                // Rotate vector for isometric camera
                const angle = Math.atan2(moveX, moveZ) + Math.PI/4; // Adjust for camera angle
                playerGroup.position.x += Math.sin(angle) * speed * dt;
                playerGroup.position.z += Math.cos(angle) * speed * dt;
                
                // Face movement direction
                playerGroup.rotation.y = angle;
            }

            // Camera follow
            camera.position.x = playerGroup.position.x + 10;
            camera.position.z = playerGroup.position.z + 10;
            camera.lookAt(playerGroup.position);

            // --- INTERACTIONS ---
            const now = Date.now();

            // Farm Interaction
            if (getDistance(playerGroup.position, farm.position) < 2.5) {
                if (playerInventory < maxInventory && now - lastFarmTime > 500) {
                    playerInventory++;
                    lastFarmTime = now;
                    updatePlayerBoxes();
                    showFloatingText('+1 Box', playerGroup.position, '#fff');
                }
            }

            // Shelf Interaction
            if (getDistance(playerGroup.position, shelf.position) < 3.5) {
                if (playerInventory > 0 && shelfStock < maxShelfStock && now - lastShelfTime > 300) {
                    playerInventory--;
                    shelfStock++;
                    lastShelfTime = now;
                    updatePlayerBoxes();
                    updateShelfVisuals();
                }
            }

            // Cash Pickup Interaction
            for (let i = cashDrops.length - 1; i >= 0; i--) {
                const drop = cashDrops[i];
                if (getDistance(playerGroup.position, drop.position) < 1.5) {
                    addCash(10, drop.position);
                    scene.remove(drop);
                    cashDrops.splice(i, 1);
                } else {
                    drop.rotation.y += 2 * dt; // spin
                }
            }

            // --- CUSTOMER AI ---
            for (let i = customers.length - 1; i >= 0; i--) {
                const c = customers[i];
                const cSpeed = 3;

                if (c.state === 'GOTO_SHELF') {
                    // Move to shelf
                    const target = new THREE.Vector3(shelf.position.x, 0, shelf.position.z + 2);
                    moveTowards(c.mesh, target, cSpeed * dt);
                    
                    if (getDistance(c.mesh.position, target) < 0.5) {
                        if (shelfStock > 0 && now - lastShelfTime > 500) {
                            shelfStock--;
                            updateShelfVisuals();
                            c.item.visible = true;
                            c.state = 'GOTO_CHECKOUT';
                            lastShelfTime = now;
                        }
                    }
                } else if (c.state === 'GOTO_CHECKOUT') {
                    const target = new THREE.Vector3(checkout.position.x, 0, checkout.position.z + 2.5);
                    moveTowards(c.mesh, target, cSpeed * dt);
                    
                    if (getDistance(c.mesh.position, target) < 0.5) {
                        c.state = 'WAIT_FOR_PLAYER';
                    }
                } else if (c.state === 'WAIT_FOR_PLAYER') {
                    // Check if player is near cashier side of checkout (behind it)
                    const cashierSpot = new THREE.Vector3(checkout.position.x, 0, checkout.position.z - 2.5);
                    if (getDistance(playerGroup.position, cashierSpot) < 2.5) {
                        // Pay!
                        c.item.visible = false;
                        
                        // Spawn cash mesh
                        const cashGeo = new THREE.BoxGeometry(0.5, 0.2, 0.8);
                        const cashMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
                        const cashMesh = new THREE.Mesh(cashGeo, cashMat);
                        cashMesh.position.copy(c.mesh.position);
                        cashMesh.position.y = 0.5;
                        cashMesh.castShadow = true;
                        scene.add(cashMesh);
                        cashDrops.push(cashMesh);

                        c.state = 'LEAVING';
                    }
                } else if (c.state === 'LEAVING') {
                    const target = new THREE.Vector3(10, 0, 10);
                    moveTowards(c.mesh, target, cSpeed * dt);
                    if (getDistance(c.mesh.position, target) < 1) {
                        scene.remove(c.mesh);
                        customers.splice(i, 1);
                    }
                }
            }

            renderer.render(scene, camera);
        }

        function moveTowards(mesh, target, step) {
            const dx = target.x - mesh.position.x;
            const dz = target.z - mesh.position.z;
            const dist = Math.sqrt(dx*dx + dz*dz);
            if (dist > 0) {
                mesh.position.x += (dx / dist) * step;
                mesh.position.z += (dz / dist) * step;
                mesh.rotation.y = Math.atan2(dx, dz);
            }
        }

        function updatePlayerBoxes() {
            carriedBoxes.forEach((box, index) => {
                box.visible = (index < playerInventory);
            });
        }

        function updateShelfVisuals() {
            shelfItems.forEach((item, index) => {
                item.visible = (index < shelfStock);
            });
        }

        animate();
    </script>
</body>
</html>
`;
