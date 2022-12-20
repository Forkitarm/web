import Experience from '../Experience.js'
import * as THREE from 'three'
import GSAP from 'gsap'

export default class Environment {
    constructor() {
       this.experience = new Experience();
       this.scene = this.experience.scene;
       this.resources = this.experience.resources;
       this.room = this.resources.items.room;


       this.setSunlight();

    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05;

       /* const camhelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        this.scene.add(camhelper);
        */
        //this.sunLight.position.set(1, 7, 3);
        this.sunLight.position.set(-1, 5, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("grey", 2);
        this.scene.add(this.ambientLight);
    }


    switchTheme(theme) { 
        if(theme === 'dark') {
            GSAP.to(this.sunLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        }else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 2,
            });
        }
    };

    resize() {
    }
    update() {
    }
}