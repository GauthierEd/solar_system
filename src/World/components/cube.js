import { BoxGeometry, MeshStandardMaterial, Mesh } from "../../../vendor/three/build/three.module.js";

function createCube(){
    let geometry = new BoxGeometry(1,1);
    let material = new MeshStandardMaterial({color:0xff0000});
    let mesh = new Mesh(geometry, material);

    return mesh;
}

export {createCube};
