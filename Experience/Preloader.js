import Experience from '../Experience/Experience.js'
import EventEmitter from "events";
import GSAP from 'gsap';
import convert from './Utils/convertDivstoSpan.js';

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;


        this.sizes.on('switchdevice', (device) => {
            this.device = device;
        });

        this.world.on('worldUp', () => {
            this.setAssets();
            this.playIntro();
        });
    };

    setAssets() {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    };

    firstIntro() {
        console.log(this.roomChildren.Cube.rotation);
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            if(this.device === 'desktop') {
                this.timeline.to(this.roomChildren.Cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: 'power1.out',
                    duration: 0.7,
                    onComplete: resolve,
                });
            } else {
                this.timeline.to(this.roomChildren.Cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: 'power1.out',
                    duration: 0.7,
                    onComplete: resolve,
                });

            }     
        })
    };

    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: 'power1.out',
            }, "same").to(this.roomChildren.Cube.rotation, {
                y: 2*Math.PI + Math.PI/4,
                
            }, "same").to(this.roomChildren.Cube.scale, {
                x: 10,
                y: 10,
                z: 10,
            }, "same").to(this.camera.orthographicCamera.position, {
                y: 3,
                z: 5.5,
            },"same").to(this.roomChildren.Cube.position, {
                y: 8.5,
                z: 1.3,
                x: 0.63,
            },"same").set(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.Cube.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: 'power1.out',
                duration: 0.7,
            }).to(this.roomChildren.Board.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.Desks.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.Computers.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).set(this.roomChildren.Minifloor.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.Deskobj.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.Shelves.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.floor_items.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "floor").to(this.roomChildren.Chair.scale, {
                x: 1,
                y: 1,
                z: 1,
            }, "floor").to(this.roomChildren.Chair.rotation, {
                y: 4 * Math.PI + Math.PI / 2,
                ease: 'power2.out',
                duration: 1,
                onComplete: resolve,
            }, "floor");
        }     
    )
};

    onScroll(e) {
        if(e.deltaY > 0) {
            this.cleanupEventlisteners();
            this.playSecondIntro();
        };
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;

        if(difference > 0) {
            console.log("swiped");
            this.cleanupEventlisteners();
            this.playSecondIntro();
        };
        this.initialY = null;
    }


    cleanupEventlisteners() {
        window.removeEventListener('wheel', this.scrollOnce);
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        console.log("forward");
        this.moveFlag = true;
        this.scrollOnce = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener('wheel', this.scrollOnce);
        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchmove', this.touchMove);
    };
    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit('enablecontrols');
    }

    move() {
        if(this.device === 'desktop') {
            this.room.position.set(-1,0,0);
        } else {
            this.room.position.set(0,0,-1);
        }
    }

    scale() {
        if(this.device === 'desktop') {
            this.room.scale.set(0.11,0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if(this.moveFlag) {
            this.move();
        };
        if(this.scaleFlag) {
            this.scale();
        }
    }
}