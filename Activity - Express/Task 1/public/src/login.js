const showloginFormUI = document.getElementById('login-btn');
const showSignUpFormUI = document.getElementById('signup-btn');
const buttonContainerUI = document.querySelector('.btn-container');
const loginFormUI = document.getElementById('login-form');
const signUpFormUI = document.getElementById('signup-form');

document.body.addEventListener('click', (e) => {
  if(Array.from(e.target.classList).includes('body-class')) {
    buttonContainerUI.classList.remove('hide');
    loginFormUI.classList.add('hide')
    signUpFormUI.classList.add('hide')
  }
});

showloginFormUI.addEventListener('click', e => {
  buttonContainerUI.classList.add('hide');
  loginFormUI.classList.remove('hide')
});

showSignUpFormUI.addEventListener('click', e => {
  buttonContainerUI.classList.add('hide');
  signUpFormUI.classList.remove('hide')
});

