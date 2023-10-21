import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';
let feedbackData = {};

function saveToLocalStorage(e) {
  feedbackData[e.target.name] = e.target.value.trim();
  localStorage.setItem(KEY, JSON.stringify(feedbackData));
}

function loadFromLocalStorage() {
  try {
const savedData = localStorage.getItem(KEY);
    if (!savedData) return; 
    feedbackData = JSON.parse(savedData);
    Object.entries(feedbackData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
console.log(error.message);
  } 
  }

function handleSubmit(event) {
  event.preventDefault();
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(feedbackData);
  localStorage.removeItem(KEY);
  emailInput.value = '';
  messageTextarea.value = '';
}

const updateLocalStorage = throttle(saveToLocalStorage, 500);

form.addEventListener('input', updateLocalStorage);
form.addEventListener('submit', handleSubmit);

window.addEventListener('load', loadFromLocalStorage);

