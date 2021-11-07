import {Clock} from "../../../vendor/three/build/three.module.js";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer, raycaster, pointer, canIntersect, over, intersected){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.raycaster = raycaster;
        this.pointer = pointer;
        this.canIntersect = canIntersect;
        this.updatables = [];
        this.over = over;
        this.intersected = intersected;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.camera.updateMatrixWorld();
            this.raycaster.setFromCamera(this.pointer, this.camera);
            const intersects = this.raycaster.intersectObjects(this.canIntersect);
            console.log(intersects)
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
            this.renderer.render(this.scene, this.camera);
        });
        /*requestAnimationFrame(this.start);
        this.tick();
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.canIntersect);
        this.renderer.render(this.scene, this.camera);*/
    }

    tick() {
        const delta = clock.getDelta();
    }
}

export { Loop };