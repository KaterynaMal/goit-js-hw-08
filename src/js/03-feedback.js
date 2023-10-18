import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const key = 'feedback-form-state';

function saveToLocalStorage() {
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(key, JSON.stringify(feedbackData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const feedbackData = JSON.parse(savedData);
    emailInput.value = feedbackData.email;
    messageTextarea.value = feedbackData.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const feedbackData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(feedbackData);
  localStorage.removeItem(key);
  emailInput.value = '';
  messageTextarea.value = '';
}

const updateLocalStorage = throttle(saveToLocalStorage, 500);

form.addEventListener('input', updateLocalStorage);
form.addEventListener('submit', handleSubmit);

window.addEventListener('load', loadFromLocalStorage);

