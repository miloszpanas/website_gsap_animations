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
    .addIndicators({ colorStart: "white", colorTrigger: "white" })
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
    .addIndicators({
      colorStart: "white",
      colorTrigger: "white",
      name: "page",
      indent: 200
    })
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

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active")
  } else {
    mouse.classList.remove("nav-active");
  } if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active")
  } else {
    mouse.classList.remove("explore-active")
  }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor)


animateSlides();