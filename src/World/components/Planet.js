import { GLTFLoader } from "../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { Group } from "../../../vendor/three/build/three.module.js";



const system = {
    "Mercure" :  {
        "model" : "../../../asset/modeles/mercure.glb",
        "posX" : 12.94,
        "posZ" : 0,
        "size" : 0.4,
        "rotation" : 1,
    },
    "Venus" :  {
        "model" : "../../../asset/modeles/venus.glb",
        "posX" : 21.78,
        "posZ" : 0,
        "size" : 1,
        "rotation" : 1,
    },
    "Earth" :  {
        "model" : "../../../asset/modeles/earth.glb",
        "posX" : 30,
        "posZ" : 0,
        "size" : 1,
        "rotation" : 1,
    },
    "Mars" :  {
        "model" : "../../../asset/modeles/mars.glb",
        "posX" : 49.4,
        "posZ" : 0,
        "size" : 0.5,
        "rotation" : 1,
    },
    "Jupiter" :  {
        "model" : "../../../asset/modeles/jupiter.glb",
        "posX" : 150,
        "posZ" : 0,
        "size" : 2,
        "rotation" : 1,
    },
    "Saturne" :  {
        "model" : "../../../asset/modeles/saturne.glb",
        "posX" : 296,
        "posZ" : 0,
        "size" : 1.8,
        "rotation" : 1,
    },
    "Uranus" :  {
        "model" : "../../../asset/modeles/uranus.glb",
        "posX" : 590,
        "posZ" : 0,
        "size" : 1.4,
        "rotation" : 1,
    },
    "Neptune" :  {
        "model" : "../../../asset/modeles/neptune.glb",
        "posX" : 895,
        "posZ" : 0,
        "size" : 1.4,
        "rotation" : 1,
    },
    "Sun" :  {
        "model" : "../../../asset/modeles/sun.glb",
        "posX" : 0,
        "posZ" : 0,
        "size" : 4,
        "rotation" : 1,
    },
}



const loader = new GLTFLoader();

class Planet extends Group{
    constructor(name){
        super();
        this.init(name);  
    }

    async init(name){
        this.mesh = await this.setupModel(name);
        let size = system[name]["size"];
        let x = system[name]["posX"];
        let z = system[name]["posZ"];
        this.rotationSpeed = system[name]["rotation"];
        this.mesh.scale.set(size, size, size);
        this.setPosition(x,0,z);

        this.add(this.mesh);
    }

    async setupModel(name){
        const [data1,data2] = await Promise.all([
            loader.loadAsync(system[name]["model"]),
            loader.loadAsync(system[name]["model"]),
        ]);
        const mesh = data1.scene.children[0];
        return mesh
    }

    setPosition(x,y,z){
        this.mesh.position.set(x*2,y,z*2);
    }
    

    tick(delta){
        this.mesh.rotation.y += this.rotationSpeed * delta;
    }
}

export {Planet};