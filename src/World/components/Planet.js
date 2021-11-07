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



class Star extends Group{
    constructor(name){
        super();
        this.name = name;
        this.init(name);
    }

    async setupModel(name){
        const [object] = await Promise.all([
            loader.loadAsync(system[name]["model"])
        ]);
        return object.scene;
    }

    async init(name){
        let model = this.setupModel(name);
        model.then((result)=> {
            this.add(result)
        });
        this.rotationSpeed = system[name]["rotation"];
        let size = system[name]["size"];
        let x = system[name]["posX"];
        let z = system[name]["posZ"];
        this.scale.set(size,size,size);
        this.setPosition(x,0,z);
    }

    setPosition(x,y,z){
        this.position.set(x*2,y,z*2);
    }
    

    tick(delta){
        this.rotation.y += this.rotationSpeed * delta;
    }
}

class Planet extends Star{
    constructor(name){
        super(name);
        this.rayon = system[name]["posX"];
        this.angle = 0;
    }

    tick(delta){
        this.rotation.y += this.rotationSpeed * delta;
        this.position.x = this.rayon * Math.cos(this.angle * Math.PI / 180);
        this.position.z = this.rayon * Math.sin(this.angle * Math.PI / 180);
        this.angle++;
        if(this.angle > 360){
            this.angle = 0;
        }
    }
}
export {Star, Planet};