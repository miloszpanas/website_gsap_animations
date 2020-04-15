let controller;
let slideScene;

function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller()

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  // loop over each slide
  sliders.forEach(slide => {
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
    slideTimeline.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5")
  });
}

animateSlides();