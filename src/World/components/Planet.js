import { GLTFLoader } from "../../../vendor/three/examples/jsm/loaders/GLTFLoader.js";
import { Group, Line, BufferGeometry, LineBasicMaterial, Vector3 } from "../../../vendor/three/build/three.module.js";



const system = {
    "Mercure" :  {
        "model" : "../../../asset/modeles/mercure.glb",
        "posX" : 12.94,
        "posZ" : 0,
        "size" : 0.4,
        "rotation" : 1,
        "orbite" : 4.1,
    },
    "Venus" :  {
        "model" : "../../../asset/modeles/venus.glb",
        "posX" : 21.78,
        "posZ" : 0,
        "size" : 1,
        "rotation" : 1,
        "orbite" : 1.64,
    },
    "Earth" :  {
        "model" : "../../../asset/modeles/earth.glb",
        "posX" : 30,
        "posZ" : 0,
        "size" : 1,
        "rotation" : 1,
        "orbite" : 1,
    },
    "Mars" :  {
        "model" : "../../../asset/modeles/mars.glb",
        "posX" : 49.4,
        "posZ" : 0,
        "size" : 0.5,
        "rotation" : 1,
        "orbite" : 0.53,
    },
    "Jupiter" :  {
        "model" : "../../../asset/modeles/jupiter.glb",
        "posX" : 150,
        "posZ" : 0,
        "size" : 2,
        "rotation" : 1,
        "orbite" : 0.083,
    },
    "Saturne" :  {
        "model" : "../../../asset/modeles/saturne.glb",
        "posX" : 296,
        "posZ" : 0,
        "size" : 1.8,
        "rotation" : 1,
        "orbite" : 0.034,
    },
    "Uranus" :  {
        "model" : "../../../asset/modeles/uranus.glb",
        "posX" : 590,
        "posZ" : 0,
        "size" : 1.4,
        "rotation" : 1,
        "orbite" : 0.011,
    },
    "Neptune" :  {
        "model" : "../../../asset/modeles/neptune.glb",
        "posX" : 895,
        "posZ" : 0,
        "size" : 1.4,
        "rotation" : 1,
        "orbite" : 0.006,
    },
    "Sun" :  {
        "model" : "../../../asset/modeles/sun.glb",
        "posX" : 0,
        "posZ" : 0,
        "size" : 4,
        "rotation" : 0,
        "orbite" : 0,
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
        this.speedOrbit = system[name]["orbite"];
        this.setupPosition();
    }

    setupPosition(){
        this.angle = Math.floor(Math.random() * 361);
        this.position.x = this.rayon * Math.cos(this.angle * Math.PI / 180) ;
        this.position.z = this.rayon * Math.sin(this.angle * Math.PI / 180) ;
    }

    

    tick(delta){
        this.rotation.y += this.rotationSpeed * delta;
        this.position.x = this.rayon * Math.cos(this.angle * Math.PI / 180) ;
        this.position.z = this.rayon * Math.sin(this.angle * Math.PI / 180) ;
        this.angle += this.speedOrbit * delta;
        if(this.angle > 360){
            this.angle = 0;
        }
    }
}
export {Star, Planet};