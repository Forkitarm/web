import Experience from '../Experience.js'
import * as THREE from 'three'
import GSAP from 'gsap'

export default class Room {
    constructor() {
       this.experience = new Experience();
       this.scene = this.experience.scene;
       this.time = this.experience.time;
       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.actualRoom = this.room.scene;

       //console.log(this.actualRoom);

       this.lerp = {
           current: 0,
           target: 0,
           ease: 0.1,
       };
       this.setModel();
       this.setAnimation();
       this.onMouseMove();
    }
    
    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            };
            console.log(child);

            if(child.name === "body") {
                console.log(child);
                child.children[4].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            };

            if(child.name === 'Minifloor') {
                child.position.x = 4.47489;
                child.position.z = -5.44608;
            };
            if(child.name === 'Mailbox' || child.name ==='floorLamp' || child.name === 'floorfirst' || child.name === 'floorsec')  {
                child.scale.set(0,0,0);
            }
        });
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);


        // whitelight
        // z -4.622398567199707
        // y 5.155837631225586
        // x -3.513100814819336

        const plight = new THREE.PointLight( 0xffffff, 0.2, 50);
        plight.position.set(-4.106687545776367, 4.555837631225586, -4.115942001342773);
        this.actualRoom.add( plight );

        

        // redlight
        const pclight = new THREE.PointLight( 0xff0000, 0.05, 50);
        pclight.position.set(-6.216178894042969, 0.9048910140991211, 3.1462504863739014);
        this.actualRoom.add( pclight );
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
    };
/*
    switchTheme(theme) {
        plight = this.plight;
        if(theme === 'dark') {
            GSAP.to(this.plight, () => {
                this.actualRoom.add(this.plight);
            });
        }else {
            return
        };
    };
*/
    onMouseMove() {
        window.addEventListener('mousemove', (event) => {
            this.rotation = ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
        return window.removeEventListener('mouesmove', (event));
    }

    resize() {
    }
    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );
        this.actualRoom.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.0009);
    }
}