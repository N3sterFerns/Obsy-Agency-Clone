

function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

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


function loadingAnimation(){
    let tl = gsap.timeline()

    tl.from(".line h1", {
        y: 120,
        duration: 0.6,
        stagger: 0.25,
        opacity: 0,
        delay: 0.5,
    })

    tl.from("#line1-part1", {
        opacity: 0,
        onStart: function(){
            const h5Timer = document.querySelector("#line1-part1 h5");
            let timer = 0;
            setInterval(function(){
                if(timer<100){
                    timer++
                    h5Timer.textContent = timer;
                    console.log(timer)
                }else{
                    timer = 100;
                }
            }, 45)
        }
    })

    tl.to(".line h2", {
        opacity: 1,
        animationName: "anime"
    })

    tl.to("#loader", {
        opacity: 0,
        // duration: 0.4,
        delay: 4,
        duration: .8,
        // delay: 0.1,
    })

    tl.from("#page1", {
        y: 1600,
        opacity: 0,
        ease: Power4,
        duration: 0.5,

    })

    tl.to("#loader", {
        display: "none",
    })

    tl.from("#nav", {
        opacity: 0,
    })

    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
        y: 140,
        stagger: 0.2,
    });
    tl.from("#page2", {
        opacity: 0,
    });

}    





function Cursor(){
    let cursor = document.querySelector("#cr")
    let body = document.querySelector("#main")
    let videoCon = document.querySelector("#video-container")
    let video = document.querySelector("#video-container video")
    let videoimg = document.querySelector("#video-container img")


    body.addEventListener("mousemove", function(dets){
        gsap.to(cursor, {
            left: dets.clientX,
            top: dets.clientY
        })
    })

    Shery.makeMagnet("#nav-part2 h4");


    videoCon.addEventListener("mouseenter", function(){
        videoCon.addEventListener("mousemove", function(dets){
            gsap.to("#cr", {
                opacity: 0,
            })
            gsap.to("#video-cursor", {
                left: dets.clientX -570,
                y: dets.clientY -300,
            })
        })
    })
    
    videoCon.addEventListener("mouseleave", function(){
        gsap.to("#cr", {
            opacity: 1,
        })
        gsap.to("#video-cursor", {
            top: "-10%",
            left: "70%"
        })
        
    })
    
    let flag = 0;
    videoCon.addEventListener("click", function(){
        if(flag === 0){
            video.play()
            video.style.opacity = 1;
            videoimg.style.opacity = 0;
            
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale: 0.5,
            })
            flag = 1; 
        }else{
            video.pause()
            video.style.opacity = 0;
            videoimg.style.opacity = 1;
            
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale: 1,
            })
            flag = 0;  
        }
        // <i class="ri-pause-mini-fill"></i>
    })
}


function sheryAnimation(){
    Shery.imageEffect(".image-div", {
        style: 5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7058809449723545},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.18,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.44,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true,
    })
}



document.addEventListener("mousemove", function(dets){
    gsap.to("#flag", {
        x: dets.clientX,
        y: dets.clientY,
    })
})

document.querySelector("#hero3").addEventListener("mouseenter", function(){
    gsap.to("#flag", {
        opacity: 1,
    })
})
document.querySelector("#hero3").addEventListener("mouseleave", function(){
    gsap.to("#flag", {
        opacity: 0,
    })
})





loadingAnimation();
Cursor()
locomotive()
sheryAnimation()