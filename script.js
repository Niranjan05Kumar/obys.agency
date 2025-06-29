// locomotive with scrolltrigger
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();


// loading page and main page
function loadingAnimation(){
    var tl = gsap.timeline();
    tl.from(".line h2", {
        y: 100,
        duration: 0.9,
        delay: 0.5,
        // opacity: 0,
        stagger: 0.2
    })
    tl.from('.h5loader h5', {
        function(){
            var h5loader = document.querySelector('.h5loader h5')
            var count = 0;
            setInterval( function (){
                count++;
                if(count<100){
                    h5loader.innerHTML = count++;
                }else{
                    h5loader.innerHTML = 100;
                }
            }, 35)
        }
    })
    tl.from(".line h3", {
        opacity:0
    })
    tl.to("#loader", {
        opacity: 0,
        duration:0.3,
        delay:2
    })
    tl.to("#loader",{
        display: "none"
    })
    tl.from("#page1",{
        y:800,
        duration:1,
        opacity:0,
        ease: "power5.out"
    })
    tl.from("#nav", {
        opacity:0,
        duration:0.3
    })
    tl.from(".hero h1, .hero h2", {
        y:80,
        opacity:0,
        duration:0.5,
        stagger:0.1,
        clearProps: "all"  // This ensures all animated properties are cleared after animation
    })

}
loadingAnimation();

// cursor
function cursorAnimation(){
    // document.addEventListener("mousemove", function(dets){
    //     gsap.to("#crsr", {
    //         x: dets.x,
    //         y:dets.y,
    //         ease: "back.out(3)",
    //     })
    // })
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
    //magnetic effect
    Shery.makeMagnet(".nav-part2 h4", {
        ease: "power8.out",
    });

    var videoContainer = document.querySelector(".video-container");
    var video = document.querySelector(".video-container video");
    var videoCursor = document.querySelector(".video-cursor");
    videoContainer.addEventListener("mouseenter", function(){
        videoContainer.addEventListener("mousemove", function(dets){
            gsap.to(".mousefollower" ,{
                opacity:0
            })
            gsap.to(".video-cursor", {
                x: dets.x - 1200,
                y: dets.y - 150,
            })
        })
    })
    videoContainer.addEventListener("mouseleave", function(){
            gsap.to(".mousefollower" ,{
                opacity:1
            })
            gsap.to(".video-cursor", {
                left: "70%",
                top: "-10%",
            })
    })
    var flag = 0;
    videoContainer.addEventListener("click", function(){
        if(flag == 0){
            video.play();
            video.style.opacity = 1;
            videoCursor.innerHTML = `<i class="ri-pause-large-fill"></i>`
            gsap.to(".video-cursor",{
                scale:0.5,
            })
            flag = 1;
        }
        else{
            video.pause();
            video.style.opacity = 0;
            videoCursor.innerHTML = `<i class="ri-play-large-fill"></i>`
            gsap.to(".video-cursor",{
                scale:1,
            })
            flag = 0;
        }
        
    })
    var hero3 = document.querySelector("#hero3")
    document.addEventListener("mousemove",function(dets){
        gsap.to("#hero-flag",{
            y:dets.y,
            x: dets.x
        })
    })
    hero3.addEventListener("mouseenter",function(){
        gsap.to("#hero-flag",{
            opacity:1
        })
    })
    hero3.addEventListener("mouseleave",function(){
        gsap.to("#hero-flag",{
            opacity:0,
            duration:0.2
        })
    })
}
cursorAnimation();


function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        // debug:true,
        config: {"a":{"value":0.46,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7575832305795315},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":1.22,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.64,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.37,"range":[0,2]},"noise_scale":{"value":12.98,"range":[0,100]}},
        gooey:true, 
    })
}
// sheryAnimation();