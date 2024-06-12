// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ_Kkwx95CTw8eOdW_QEnMJWSQ-bRxYLU",
  authDomain: "workshop-http-5214.firebaseapp.com",
  projectId: "workshop-http-5214",
  storageBucket: "workshop-http-5214.appspot.com",
  messagingSenderId: "617238307067",
  appId: "1:617238307067:web:bb3832be764a27dea5905e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const messages = ref(database, "messages");
onValue(messages, (snapshot) => {
  const ul = document.getElementById("messages");

  const data = snapshot.val();
  console.log(data);
  snapshot.forEach((childSnapshot) => {
    console.log(childSnapshot.key);
    console.log(childSnapshot.val());
    let childData = childSnapshot.val();

    let text = document.createTextNode(childData.message);
    let li = document.createElement("li");
    li.appendChild(text);
    ul.appendChild(li);
  });
});
