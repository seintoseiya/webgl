require("babel-polyfill");
let THREE = require('three');
import Stats from 'stats-js'
import Controls from 'three-orbitcontrols'

const DEBUG = !process.argv.includes('--release');

class StateManager{
    constructor(){
        this.initState();
    }
    initState(){
        "use strict";

        let width = window.innerWidth;
        let height = window.innerHeight;
        let scene,renderer,camera,light,ambient,axisHelper,gridHelper,lightHelper,loader;
        let sphereEarth;
        let stats;
        let theta = 0;
        let contoles;

        initRender();

        function initRender() {
            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.set(30,30,200);
            camera.lookAt(scene.position);

            // contoles = new Controls(camera);

            // loader
            loader = new THREE.TextureLoader();
            loader.load('/images/earth-1k.png', function(texture) {
                createEarth(texture);
                // render
                render();
            });

            // rendering
            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(width, height);
            renderer.setClearColor( 0x000000, 0 );
            // renderer.shadowMapEnabled = true;
            document.getElementById('stage').appendChild(renderer.domElement);

            // light
            setLight();


            if(DEBUG){
                // helper
                gridHelper = new THREE.GridHelper(200, 20);
                scene.add(gridHelper);
                axisHelper = new THREE.AxisHelper(100);
                scene.add(axisHelper);
                lightHelper = new THREE.DirectionalLightHelper(light, 20);
                scene.add(lightHelper);

                stats = new Stats();
                stats.domElement.style.position = "fixed";
                stats.domElement.style.left = "0px";
                stats.domElement.style.top = "0px";
                stats.domElement.style.zIndex = "9999";
                document.body.appendChild(stats.domElement);
                stats.begin();
            }
        }

        function setLight(){
            // light
            light = new THREE.DirectionalLight(0xffffff, 3);
            light.position.set(0,50,100);
            // light.castShadow = true;
            scene.add(light);
            ambient = new THREE.AmbientLight(0x222222, 1);
            scene.add(ambient);
        }

        function createCube(){
            let cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
            let cubeMaterial = new THREE.MeshLambertMaterial({
                color: 0xFFFFFF
            })
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            scene.add(cube);
        }

        function createEarth(texture){
            sphereEarth = new THREE.Mesh(
                new THREE.SphereGeometry(20, 20, 20),
                new THREE.MeshLambertMaterial({
                  map: texture
                })
            );
            sphereEarth.position.set(0, 0, 0);
            scene.add(sphereEarth);
        }

        function render() {
            requestAnimationFrame(render);
            // sphereEarth.rotation.y += 0.01;

            theta += 0.1; // 追加
            camera.position.x = Math.cos(THREE.Math.degToRad(theta)) * 300; // 追加
            camera.position.z = Math.sin(THREE.Math.degToRad(theta)) * 300; // 追加
            camera.lookAt(scene.position); // 追加

            // scene.rotation.z += 0.01;
            stats.update();

            // contoles.update();

            renderer.render(scene, camera);
        }

        function onResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', onResize, false);
    }
}
new StateManager();