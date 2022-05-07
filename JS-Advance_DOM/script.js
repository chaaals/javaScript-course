'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Much better than the old school for loop below
btnsOpenModal.forEach(btnModal =>
  btnModal.addEventListener('click', openModal)
);

// for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click',openModal)

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Lecture

// Selecting Creating and Deleting Elements
// ----------------------------------
// Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Selecting: querySelector and querySelectorAll
const header = document.querySelector('.header'); // selects element in html with header class
const allSections = document.querySelectorAll('.section'); // selects all sections present on a the html file. it returns a node list.
console.log(allSections);

// Selecting: getElementById
document.getElementById('section--1'); // selects the element with an element 'section--1'
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // getElementsByTagName returns an HTML collection while querySelectorAll returns a node list.
// Main difference: an HTML collection updates automatically once a tagname/element is deleted or added while a node list does not.

console.log(document.getElementsByClassName('btn')); // document.getElements<...> returns an HTML collection

// ----------------------------------
// Creating and inserting elements
// .insertAdjacentHTML
// document.createElement('element')

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved functionality and analytics.`;
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.insertAdjacentHTML('afterend', message.innerHTML);

// header.prepend(message); // add as the first child of the element. in this case, header.
header.append(message);
// header.append(message.cloneNode(true));

// const closeMessage = () => message.classList.add('hidden');

// header.before(message);
// header.after(message);

// element.append(html) => adds the html at the end of element
// element.prepend(html) => adds the html at the beginning of the element
// element.before(html) => adds the html before the element
// element.after(html) => adds the html after the element
// ----------------------------------
// Delete elements
// use element.remove();
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// ----------------------------------
// Styles, Attributes, and Classes

// Styles
// you're setting inline styles when you do this.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// getComputedStyle(element) returns an object called CSS declaration with different properties.

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // one way to access the root and modify custom properties.

// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src); // gets the value of src
// console.log(logo.alt); // gets the value of alt
// console.log(logo.className); // gets the value of class
// logo.setAttribute('designer', 'Jonas');

// // Non-standard
// console.log(logo.designer); // designer is a non standard attribute which is why it returns undefined. if you want to get the attribute you need to use element.getAttribute('nameOfAttribute');
// console.log(logo.getAttribute('designer')); // like this
// console.log(logo.src, logo.getAttribute('src'));

// Always practice the use of element.getAttribute() instead of just element.attribute

const link = document.querySelector('.twitter-link');
console.log(link.href, link.getAttribute('href'));

// data attributes
logo.setAttribute('data-version-number', '3');
console.log(logo.dataset.versionNumber);
// NOTE:
// when it comes to data attributes, it should be separated by dashes. like the example above wherein data-version-number is equated to 3

// another example
logo.setAttribute('data-practice-data-attributes', 'hells yea');
console.log(logo.dataset.practiceDataAttributes); // => this is how you access it. element.dataset.camelCasedAttribute

// Classes (adding/removing/toggling class to an element)
// logo.classList.add('');
// logo.classList.remove('');
// logo.classList.toggle('');
// logo.classList.contains('');

// implementing smooth scrolling

const learnBtn = document.querySelector('.btn--scroll-to');
const section = document.querySelector('#section--1');
learnBtn.addEventListener('click', e => {
  const s1coord = section.getBoundingClientRect(); // => get coordinates
  console.log(s1coord);

  console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // Scrolling (OLD SCHOOL)
  // window.scrollTo({
  //   left: s1coord.left + window.pageXOffset, // adding window.page[X/Y]Offset is needed so that it will scroll based from the top of the window.
  //   top: s1coord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section.scrollIntoView({ behavior: 'smooth' }); // this is what we're going to use
});

// Notes:
// Old school smooth scrolling
// getBoundingClientRect() returns an objext with coordinates, dimenstions, position
// window.pageXOffset,pageYOffset returns x and y values or coordinates.

// Modern smooth scrolling
// element.scrollIntoView({behavior: 'smooth'});

// ------------------------------------------------------------------------------------------------------
// Types of events and event handlers

const h1 = document.querySelector('h1');

const alertH1 = () => {
  alert('Hello, after this alert, h1 event listener should be removed.');

  h1.removeEventListener('mouseenter', alertH1);
};

// h1.addEventListener('mouseenter', alertH1);
// h1.addEventListener('mouseenter', () => {
//   //mouseenter event: when you hover at a certain element, evenlistener runs
//   alert('Hello');
// });

// Old school
// h1.onmouseenter = () => alert('hello');

// -----------------------------------------------------------------------------------------------------------------
// Event Propagation: Event bubbling and capturing
// Process: Once an element is clicked, a click event is made immediately.

// From there, capturing phase starts. Capturing Phase: Travels down a document tree from DOCUMENT to each parent element of the child element that was clicked.

// Once the the event reaches the target, Target Phase begins.

// Target Phase: events are handled at the target

// Bubbling Phase: From the target, it goes up to the DOCUMENT.

// Event propagation in practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// const ul = document.querySelector('.nav__links');
// const li = [...document.querySelectorAll('.nav__item')];
// const nav = document.querySelector('.nav');

// nav.addEventListener(
//   'click',
//   e => {
//     nav.style.backgroundColor = randomColor();
//     console.log('nav', e.target, e.currentTarget); // e.currentTarget shows the element that was actually clicked
//   },
//   true // add a true as a third parameter in addEventListener if you want to catch an event. By default, it is set to false.
// );

// ul.addEventListener('click', e => {
//   ul.style.backgroundColor = randomColor();
//   console.log('container', e.target, e.currentTarget);
// });

// li.forEach(navItem => {
//   navItem.addEventListener('click', e => {
//     navItem.style.backgroundColor = randomColor();
//     console.log('link', e.target, e.currentTarget);
//     // e.stopPropagation(); // stops event propagation, not normally used in practice
//   });
// });

// Event delegation

const li = [...document.querySelectorAll('.nav__link')];
// const sections = [...document.querySelectorAll('.section')];
// // console.log(li, sections);
// sections.pop();

// li.forEach((navItem, i) => {
//   navItem.addEventListener('click', e => {
//     e.preventDefault(); // useful when you don't want a default functionality to happen. like in this one, because clicking the navigation is linked to a section, it overwrites the event listener since its inline, e.preventDefault() is all you need to stop it.
//     const id = navItem.getAttribute('href');
//     const section = document.querySelector(id);
//     // console.log(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation

// 1. add event listener to a common parent element
// 2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    // good practice: match first if it contains a supposed class, if not, nothing happens.
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  } else console.log('Not a nav list');
  // console.log(section);
});

// Gist of event delegation:
// Basically add an event listener to a parent element then access which of the child element you're targeting by using
// e.target. From there, access necessary information that you need. This makes the performance better because the
// forEach() method duplicates callback functions which can be large in size if you're dealing with a huge
// number of links.

// -------------------------------------------------------------------------------------------------------------

// DOM Traversing

// Going downwards: child

console.log(h1.innerHTML);
console.log([...h1.querySelectorAll('.highlight')]);
console.log(h1.childNodes); // gives every single childNode of h1, from elements, classes, text, comment, etc.

console.log(h1.children); // gets all the child element of h1. In this instance, its span.highlight, span.highlight, and br

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// going upwards: parents
console.log(h1.parentNode); // returns the parent html
console.log(h1.parentElement); // similar to parentNode

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// element.closest('.class') looks for the parent node. doesn't work if its a child
// h1.closest('.highlight').style.color = 'black';

// going sideways: siblings
console.log(h1.previousElementSibling); // null if there is no previous sibling
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // goes up to the parent then get all children

// [...h1.parentElement.children].forEach(function (element) {
//   // if (element !== h1) element.style.transform = 'scale(0.5)';
// });

// ------------------------------------------------------------------------------------------------------------

// Building tabbed component

const operationContainer = document.querySelector('.operations__tab-container');
// const operationTab = document.querySelector('.operations');
// console.log(document.querySelector('.operations__tab-container'));
operationContainer.addEventListener('click', e => {
  const operationTab = operationContainer.parentElement.children;
  let btn = e.target.closest('.operations__tab'); // better solution for span bug
  // console.log(btn.dataset.tab);

  // guard clause
  if (!btn) return;
  console.log(btn.parentElement);

  // initial solution to span bug
  // if (!btn.children[0]) {
  //   btn = btn.parentElement;
  // }

  [...operationContainer.children].forEach(element => {
    if (element.classList.contains('operations__tab--active')) {
      element.classList.remove('operations__tab--active');
      btn.classList.add('operations__tab--active');
    }
  });

  [...operationTab].forEach(element => {
    if (element !== operationContainer) {
      if (element.classList.contains('operations__content--active')) {
        const currentTab = document.querySelector(
          `.operations__content--${btn.dataset.tab}`
        );
        // console.log(currentTab);
        element.classList.remove('operations__content--active');
        currentTab.classList.add('operations__content--active');
      }
    }
  });
});

// --------------------------------------------------------------------------------------------------------------

// Passing arguments to event handlers

const nav = document.querySelector('.nav');
// function
const hoverNavBehavior = function (e, opacity) {
  const hovered = e.target;

  if (hovered.classList.contains('nav__link')) {
    const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = hovered.closest('.nav').querySelector('img');
    // console.log(siblings);

    siblings.forEach(el => {
      if (el !== hovered) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
  // console.log(hovered);
};

// REFACTORED CODE BY PASSING ARGUMENTS TO EVENT HANDLERS

//mouseenter does not bubble so we use mouseover
// nav.addEventListener('mouseover', function (e) {
//   hoverNavBehavior(e, 0.5); //
// });

// nav.addEventListener('mouseout', function (e) {
//   hoverNavBehavior(e, 1);
// });

// A much better method: using .bind() returns a new function;

// The idea here is that you'll create a new function with 0.5 and 1 as their this keyword. This is very circumstantial and would work on certian scenarios.

nav.addEventListener('mouseover', hoverNavBehavior.bind(0.5));
nav.addEventListener('mouseout', hoverNavBehavior.bind(1));

// --------------------------------------------------------------------------------------------------------------

// Implementing sticky navigation
// const section1 = document.querySelector('#section--1');
// const section1Coords = section1.getBoundingClientRect();

// THIS WORKS BUT A BAD PRACTICE
// window.addEventListener('scroll', () => {
//   console.log(window.scrollY, section1Coords.top);
//   if (window.scrollY > section1Coords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// }); //scroll event

// Better version with Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(el => console.log(el));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

// console.log(observer.observe(_header));

const _header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();

const headerCallBack = function (entries, observer) {
  // in the call back function, you need to loop the entries so that you can access each property
  entries.forEach(el => {
    // console.log(el);
    if (!el.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};

const headerObject = {
  root: null, // root should be null to watch for intersection relative to the device's viewport
  rootMargin: `-${navHeight.height}px`,
  threshold: 0, // if a certain threshold of intersection is reached, isIntersecting becomes true/false
};

const headerObserver = new IntersectionObserver(headerCallBack, headerObject); // create intersection observer

headerObserver.observe(_header); // targeting an element to be observed: intersectionObserver.observe(element);

const _allSections = document.querySelectorAll('.section');

// Callback functions
const sectionReveal = function (entries, observer) {
  entries.forEach(el => {
    if (!el.isIntersecting) return;

    el.target.classList.remove('section--hidden');

    observer.unobserve(el.target); // unobserves a certain section which improves performance.
  });
};

// Section observer
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.2,
});

// Observes all sections
_allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images => important because its heavy on the webpage.

const lazyImages = document.querySelectorAll('.lazy-img');

// Alternative
// const lazyImages = document.querySelectorAll('img[data-src]');

// Callback fn
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (!entry.isIntersecting) return;

    entry.target.setAttribute('src', entry.target.dataset.src);

    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    ); // only toggle once loaded

    observer.unobserve(entry.target);
  });
};

// img observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

// observe all img
lazyImages.forEach(img => imgObserver.observe(img));

// NOTE: When lazy loading images, it should happen in the background, hence, it should not be seen by the user.

// ----------------------------------------------------

// Build slider component

const slider = document.querySelector('.slider');
const slides = [...document.querySelectorAll('.slide')];
const percentages = Array.from({ length: slides.length }, (_, i) => i++).map(
  num => num * 100
);

// sets them apart
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;

  const dotDiv = document.createElement('div');
  dotDiv.classList.add('dots__dot');
  document.querySelector('.dots').append(dotDiv);
});

// Selecting all dots

const dots = [...document.querySelectorAll('.dots__dot')];

let curSlide = 0; // current slide is 1
dots[curSlide].classList.add('dots__dot--active');

// Function for switching slides
const slideSwitch = function (curslide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - curslide)}%)`;
  });
};

const dotSwitch = function (slide) {
  dots.forEach(dot => {
    if (dot.classList.contains('dots__dot--active'))
      dot.classList.remove('dots__dot--active');
  });

  dots[slide].classList.add('dots__dot--active');
};

// Event handler
let maxLength = slides.length;
slider.addEventListener('click', function (e) {
  if (e.target.classList.contains('slider__btn--left')) {
    if (curSlide === 0) {
      dotSwitch(maxLength - 1);
      slideSwitch(maxLength - 1);
      curSlide = maxLength - 1;
    } else {
      --curSlide;
      dotSwitch(curSlide);
      slideSwitch(curSlide);
    }
  }

  if (e.target.classList.contains('slider__btn--right')) {
    ++curSlide;
    if (curSlide === maxLength) {
      dotSwitch(0);
      slideSwitch(0);
      curSlide = 0;
    } else {
      dotSwitch(curSlide);
      slideSwitch(curSlide);
    }
  }
});

// 1st slide 0, 100, 200, 300

// ------------------------------------------------------

// DOM Events Lifecycle

document.addEventListener('DOMContentLoaded', e =>
  console.log('HTML parsed and DOM tree built!', e)
);

window.addEventListener('load', e => console.log('Page fully loaded', e));

// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// }); // don't abuse, only use when necessary

// ------------------------------------------------------

// Efficient script loading (defer and async)

// Using defer in the head is the best solution.

// this script: <script defer src="something.js"></script> at the head.
