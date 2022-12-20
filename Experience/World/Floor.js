
import Experience from '../Experience.js'
import * as THREE from 'three'
import GSAP from 'gsap'

export default class Floor {
    constructor() {
       this.experience = new Experience();
       this.scene = this.experience.scene;
       this.resources = this.experience.resources;

       this.setFloor();
       this.setCircles();
    }


    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: "#292929",
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircles() {

        const geometry = new THREE.CircleGeometry(5, 64);
        const mat1 = new THREE.MeshStandardMaterial({color: "black"}); 
        const mat2 = new THREE.MeshStandardMaterial({color: "#262626"});
        const mat3 = new THREE.MeshStandardMaterial({color: "white"});
        const mat4 = new THREE.MeshStandardMaterial({color: "white"});


        this.circle1 = new THREE.Mesh(geometry, mat1);
        this.circle2 = new THREE.Mesh(geometry, mat2);
        this.circle3 = new THREE.Mesh(geometry, mat3);
        this.circle4 = new THREE.Mesh(geometry, mat4);

        this.circle1.position.y = -0.29;        
        this.circle2.position.y = -0.28;        
        this.circle3.position.y = -0.27;        
        this.circle4.position.y = -0.26;        

        this.circle1.scale.set(0,0,0);         
        this.circle2.scale.set(0,0,0);        
        this.circle3.scale.set(0,0,0);        
        this.circle4.scale.set(0,0,0);        

        this.circle1.rotation.x = this.circle2.rotation.x = this.circle3.rotation.x = this.circle4.rotation.x = -Math.PI / 2;

        this.circle1.receiveShadow = this.circle2.receiveShadow = this.circle3.receiveShadow  = this.circle4.receiveShadow = true;

        this.scene.add(this.circle1);
        this.scene.add(this.circle2);
        this.scene.add(this.circle3);
        this.scene.add(this.circle4);

    }

    switchTheme(theme) {
        if(theme === 'dark'){
            GSAP.to(this.circle1.material.color, {
                r: 0.39215686274509803, 
                g: 0.2549019607843137, 
                b: 0.6470588235294118, 
            });
            console.log("fired dark");
            GSAP.to(this.circle2.material.color, {
                r: 0.162745,
                b: 0.162745,
                g: 0.162745,
            })
        }else{
            GSAP.to(this.circle1.material.color, {
                r: 0,
                g: 0,
                b: 0,

            });
            console.log("fired light");
        }
    }
    

    resize() {
    }
    update() {
    }
}