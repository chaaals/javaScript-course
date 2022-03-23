// THIS JS FILE IS USED FOR A CODE A LONG FOR DOM MANIP AND EVENTS
// Working with classes
'use strict';

// display: none in css hides a particular element.

// We normally assign to a variable the elements we want to access.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
const openModalBtn = document.querySelectorAll('.show-modal');

//closing modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//opening modal

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Working with classes (Manipulating classes with JS)
for (let i = 0; i < openModalBtn.length; i++) {
  openModalBtn[i].addEventListener(
    'click',
    openModal
    // classList method can add,remove, and other things you want to a class list of a certain element.
  );
}

closeModalBtn.addEventListener('click', closeModal); // you cant put closeModal() on the function parameter. it will run first, hence error. without () is the right way to go.
overlay.addEventListener('click', closeModal);

// Dealing with key press event
document.addEventListener('keydown', function (event) {
  console.log(event.key);
  switch (event.key) {
    case 'Escape':
      if (!modal.classList.contains('hidden')) {
        closeModal();
      }
  }
});
// document is a global element
// to break it down, the 'keydown' event generates an object KeyboardEvent with different values. Basically parang normal object lang siya with key:pair values. Same way lang din ng pag access, you use the dot notation hence event.key gives the value of the key you pressed. I used the switch statement para I could make a case for 'Escape' then call the closeModal(); function once it occurs.
