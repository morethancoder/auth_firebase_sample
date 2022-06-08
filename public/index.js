import {
  onAuthStateChanged,
  sendSignInLinkToEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

import { auth } from "../firebase.js";

var emailField = document.getElementById("input-email-field");
var passwordField = document.getElementById("input-password-field");
var submitButton = document.getElementById("submit-button");
var logoutButton = document.getElementById("logout-button");
var currentUser = document.getElementById("current");

//? this function returns value if only the email entered is valid type
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const handleSignUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("تم انشاء حسابك بنجاح" + userCredential.user.email);
      })
      .catch(alert);
  } catch (error) {
    alert(error.message);
  }
};

submitButton.addEventListener("click", () => {
  var email = emailField.value;
  var password = passwordField.value;
  if (validateEmail(email)) {
    console.log("email valid");
    handleSignUp(email, password);
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        currentUser.innerHTML = loggedUser.email;
        console.log(loggedUser);
      } else {
        currentUser.innerHTML = "جاري الانتظار ...";
      }
    });
  } else {
    alert("الرجاء ادخال بريد الكتروني فعال");
    document.location.reload();
  }
});

logoutButton.addEventListener("click", () => {
  auth.signOut();
  onAuthStateChanged(auth, (loggedUser) => {
    if (loggedUser) {
      currentUser.innerHTML = loggedUser.email;
      console.log(loggedUser);
    } else {
      currentUser.innerHTML = "تم تسجيل الخروج";
    }
  });
});
