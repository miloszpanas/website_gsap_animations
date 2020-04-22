let controller;
let slideScene;
let pageScene;

function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller()

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  // loop over each slide
  sliders.forEach((slide, index, slides) => {
    console.log(slide);
    const revealImg = slide.querySelector(".reveal-image");
    const revealText = slide.querySelector(".reveal-text");
    const img = slide.querySelector("img");
    // GSAP
    const slideTimeline = gsap.timeline({defaults: { duration: 1, ease: "power2.out" }});
    // image
    slideTimeline.fromTo(revealImg, { x: "0%"}, { x: "100%"});
    slideTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    // text
    slideTimeline.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTimeline.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    // Create scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false
    })
    .setTween(slideTimeline)
    // .addIndicators({ colorStart: "white", colorTrigger: "white" })
    .addTo(controller)

    // new animation
    const pageTimeline = gsap.timeline();
    pageTimeline.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });

    // new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
    // .addIndicators({
    //   colorStart: "white",
    //   colorTrigger: "white",
    //   name: "page",
    //   indent: 200
    // })
    .setPin(slide, { pushFollowers: false })
    .setTween(pageTimeline)
    .addTo(controller)
  });
}

// cursor overlay
let mouse = document.querySelector(".cursor");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

// active cursor effects
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active")
  } else {
    mouse.classList.remove("nav-active");
  } if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" }, "-=0.5")
  } else {
    mouse.classList.remove("explore-active")
    gsap.to(".title-swipe", 1, { y: "100%" }, "-=0.5")
  }
}

// burger
const burger = document.querySelector(".burger");

// toggling menu
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: 45, y: 10, background: "black",});
    gsap.to(".line2", 0.5, { opacity: 0 });
    gsap.to(".line3", 0.5, { rotate: -45, y: -9, background: "black", });
    gsap.to(".nav-bar", 0.75, { clipPath: "circle(3000px at 100% -10%)" });
    gsap.to("#logo", 0.75, { color: "black" });
    // get rid of scroll while in menu
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active")
    gsap.to(".line1", 0.5, { rotate: 0, y: 0, background: "white",});
    gsap.to(".line2", 0.5, { opacity: 1 });
    gsap.to(".line3", 0.5, { rotate: 0, y: 0, background: "white", });
    gsap.to(".nav-bar", 0.75, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to("#logo", 0.75, { color: "white" });
    document.body.classList.remove("hide");
  }
}

// Barba page transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      }
    }
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },

          { x: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      }
    }
  ]
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}

burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor)

