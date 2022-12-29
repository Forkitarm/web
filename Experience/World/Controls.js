import Experience from '../Experience.js'
import * as THREE from 'three'
import GSAP from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger.js'
import ASScroll from '@ashthornton/asscroll';

export default class Controls {
    constructor() {
       this.experience = new Experience();
       this.scene = this.experience.scene;
       this.sizes = this.experience.sizes;

       this.resources = this.experience.resources;
       this.room = this.resources.items.room;
       this.time = this.experience.time;
       this.camera = this.experience.camera;
       
       this.room = this.experience.world.room.actualRoom;

       this.circle1 = this.experience.world.floor.circle1;
       this.circle2 = this.experience.world.floor.circle2;
       this.circle3 = this.experience.world.floor.circle3;
       this.circle4 = this.experience.world.floor.circle4;

       GSAP.registerPlugin(ScrollTrigger);




       this.setSmoothScroll();
       this.setScrolltrigger();
     
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }



    setScrolltrigger() {
        ScrollTrigger.matchMedia({

            "(min-width: 969px)": () => {
                this.room.scale.set(0.11, 0.11, 0.11);
                this.room.position.set(0, 0, 0);
                // First section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }); 
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                });

                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }); 
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1; 
                    },
                    z: () => {
                        return this.sizes.height * 0.0032;
                    },

                }, "same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "same");

                //Third Section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position, {
                    y: 4.5,
                    x: 2.1,
                }).to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                });
                // Fourth Section
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.fourth-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                });
            },

            "(max-width: 968px)":  () => {

                this.room.position.set(0,0,0);
                this.room.scale.set(0.07, 0.07, 0.07);
                this.camera.orthographicCamera.position.set(0, 6.5, 10);
                // First Section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });
                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                }, "same").to(this.room.position, {
                    x: 1.5,
                }, "same");
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.room.position, {
                    z: 3.5,
                    x: -1.2,
                }, "same");
                this.fourthMoveTimeline = GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.room.scale, {
                    x: 0.07,
                    y: 0.07,
                    z: 0.07,
                }, "same").to(this.room.position, {
                    x: () => {
                        return 0;
                    },
                    z: () => {
                        return 0;
                    },
                    y: () => {
                        return 0;
                    },
                }, "same");
            },

            all : () => {
                // platform anim
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'center center',
                    },
                });
                this.room.children.forEach(child => {
                    if(child.name === 'Minifloor'){
                        this.first = GSAP.to(child.position, {
                            x: 0.46226,
                            z: 0.411338,
                            duration: 0.5,
                            ease: 'back.out(2)',
                        })
                    }
                    if(child.name === 'Mailbox'){
                        this.second = GSAP.to(child.scale, {
                            x: 0.7,
                            z: 0.7,
                            y: 1, 
                            ease: 'back.out(2)',
                            duration: 0.5,
                        })
                    }
                    if(child.name === 'floorLamp'){
                        this.third = GSAP.to(child.scale, {
                            x: 0.45,
                            z: 0.45,
                            y: 0.45, 
                            ease: 'back.out(2)',
                            duration: 0.5,
                        })
                    }
                    if(child.name === 'floorfirst'){
                        this.fourth = GSAP.to(child.scale, {
                            x: 0.7,
                            z: 1.4,
                            y: 0.3, 
                            ease: 'back.out(2)',
                            duration: 0.5,
                        })
                    }
                    if(child.name === 'floorsec'){
                        this.fifth = GSAP.to(child.scale, {
                            x: 0.7,
                            z: 1.4,
                            y: 0.3, 
                            ease: 'back.out(2)',
                            duration: 0.5,
                        })
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second, "-=0.2");
                this.secondPartTimeline.add(this.third, "-=0.2");
                this.secondPartTimeline.add(this.fourth, "-=0.2");
                this.secondPartTimeline.add(this.fifth);


                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");
                    if(section.classList.contains("left")) {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    };
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // Circle Animations 

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                    }
                }).to(this.circle1.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                    }
                }).to(this.room.position, {
                    y: 0.7,
                }, "same").to(this.circle2.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }, "same");

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                    }
                }).to(this.circle3.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                    }
                }).to(this.circle4.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                this.centerSection = document.querySelector(".center");
                if(this.centerSection.classList.contains("center")) { 

                    GSAP.to(this.centerSection, {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: this.centerSection,
                            start: 'top bottom',
                            end: 'top top',
                            scrub: 0.6,
                        },
                    });
                };
                
            },
        });

    };

    resize() {
    }

    update() {
    }
}