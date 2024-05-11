// Get the button
let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

gsap.registerPlugin(ScrollTrigger) 
gsap.set(".cardx", { position: "absolute" });

// investor cards
gsap.to(".sloganx:not(:last-child)", {
  yPercent: -110,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".__sloganCards",
    markers: false,
    start: "top top",
    end: "+=900px",
    scrub: 0.1,
    pin: true,
    invalidateOnRefresh: true
  },
  ease: "none"
});

const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {	
  
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 

  gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      //anticipatePin: 1,
      scrub: true,
      //markers: true,
    }
  });

});	

let footer = document.querySelector("footer"),
    getOverlap = () => Math.min(window.innerHeight, footer.offsetHeight),
    adjustFooterOverlap = () => footer.style.marginTop = -getOverlap() + "px";

adjustFooterOverlap();

ScrollTrigger.addEventListener("revert", adjustFooterOverlap);


ScrollTrigger.create({
  trigger: footer,
  start: () => "top " + (window.innerHeight - getOverlap()),
  end: () => "+=" + getOverlap(),
  pin: true,
});
  