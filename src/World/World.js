import * as THREE from "../../vendor/three/build/three.module.js";
import { OrbitControls } from "../../vendor/three/examples/jsm/controls/OrbitControls.js";
import { Clock } from "../../../vendor/three/build/three.module.js";

import { Resizer } from "./systems/Resizer.js";
import { createCube } from "./components/cube.js";
import { Star, Planet } from "./components/Planet.js";

let camera;
let renderer;
let scene;
let controls;

const clock = new Clock();
let raycaster = new THREE.Raycaster();

class World{
    constructor(container){
        this.multipleSpeed = 1;
        this.lastSpeed = 1;
        this.pause = false;
        this.over = false;
        this.intersected = null;
        this.canIntersected = [];
        this.updatableObject = [];
        this.pointer = new THREE.Vector2();

        camera = new THREE.PerspectiveCamera(35, 1, 0.1, 3000);
        camera.position.set(-100, 20, -100);

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.physicallyCorrectLights = true;
        container.append(renderer.domElement);

        
        controls = new OrbitControls(camera, renderer.domElement);
        

        const resizer = new Resizer(container, camera, renderer);

        const ambientLight = new THREE.HemisphereLight('white','darkslategrey', 5);
        const mainLight = new THREE.DirectionalLight('white', 5);
        mainLight.position.set(10, 10, 10);
        scene.add(mainLight,ambientLight);

       
        
        document.addEventListener('mousemove', this.onPointerMove.bind(this));
        document.addEventListener('click', this.onClick.bind(this));
        
    }

    setMultipleSpeed(speed) {
        if(speed == 0){
            if(!this.pause){
                this.lastSpeed = this.multipleSpeed;
                this.multipleSpeed = speed;
            }
            this.pause = true;
        }else {
            if(this.pause){
                this.lastSpeed = speed;
            }else{
                this.lastSpeed = this.multipleSpeed;
                this.multipleSpeed = speed;
            }
        }
    }

    resetSpeed(){
        this.pause = false;
        this.multipleSpeed = this.lastSpeed;
    }

    setWindow(window){
        this.window = window;
    }

    async init(){
        let a = new Star("Sun");
        let b = new Planet("Mercure");
        let c = new Planet("Venus");
        let d = new Planet("Earth");
        let e = new Planet("Mars");
        let f = new Planet("Jupiter");
        let g = new Planet("Saturne");
        let h = new Planet("Uranus");
        let i = new Planet("Neptune");
    
        let planet = [b,c,d,e,f,g,h,i];
        
        this.canIntersected.push(a,b,c,d,e,f,g,h,i);
        this.updatableObject.push(a,b,c,d,e,f,g,h,i);
        controls.target.copy(a.position);
        controls.update();
        scene.add(a,b,c,d,e,f,g,h,i);

        for(let i=0; i < 8; i++){
            let rayon = planet[i].rayon;
            var points = [];
            for(let i = 0; i <= 360; i++){
                points.push(new THREE.Vector3(Math.cos(i*(Math.PI/180))* rayon, 0, Math.sin(i*(Math.PI/180))* rayon));
            }
            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var material = new THREE.LineBasicMaterial({ 
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.2
            });
            let line = new THREE.Line( geometry, material );
            scene.add(line);
        }
    }

    render(){
        renderer.render(scene, camera);
    }

    getIntersected(){
        camera.updateMatrixWorld();
        raycaster.setFromCamera(this.pointer, camera);
        const intersects = raycaster.intersectObjects(this.canIntersected, true);
        if(intersects.length > 0){
            if(this.intersected != intersects[0].object){
                if(this.intersected){
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }
                this.intersected = intersects[0].object;
                this.over = true;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
                this.intersected.material.emissive.setHex(0xffffff);
            } 
        } else {
            if(this.intersected){
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            }
            this.intersected = null;
            this.over = false;
        }
    }
    

    tick() {
        const delta = clock.getDelta() * this.multipleSpeed;
        for(let i=0; i < this.updatableObject.length; i++){
            this.updatableObject[i].tick(delta);
        }
    }

    start() {
        renderer.setAnimationLoop(() => {
            this.tick();
            this.getIntersected();
            this.render();
        })
        
    }


    onClick(event){
        if(this.over){
            controls.target.copy(this.intersected.parent.parent.position);
            controls.update();
            let divPlanets = document.querySelectorAll(".planet");
            for(let i=0; i < divPlanets.length; i++){
                divPlanets[i].classList.remove("display");
            }
            let divPlanet = document.querySelector("#"+this.intersected.parent.parent.name);
            divPlanet.classList.add("display");
        }
        
    }

    onPointerMove(event){
        let canvas = event.target.getBoundingClientRect();
        let mouseX = event.clientX - event.target.offsetLeft;
        let mouseY = event.clientY - event.target.offsetTop;
        this.pointer.x = (mouseX / canvas.width) * 2 - 1;
        this.pointer.y = -(mouseY / canvas.height) * 2 + 1;
        
    }
}

export {World};