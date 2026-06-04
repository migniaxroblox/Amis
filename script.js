// ---------------------------
// CONFIG FIREBASE (VERSION CDN)
// ---------------------------
const firebaseConfig = {
  apiKey: "AIzaSyALQHgKAKKgrHBXemHtsA0vIj8kmyiLLtg",
  authDomain: "amis-ccc34.firebaseapp.com",
  databaseURL: "https://amis-ccc34-default-rtdb.firebaseio.com",
  projectId: "amis-ccc34",
  storageBucket: "amis-ccc34.firebasestorage.app",
  messagingSenderId: "976306187779",
  appId: "1:976306187779:web:213b5edb7c22e8e6162836",
  measurementId: "G-7PVFVW8CVH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------------------
// LUEUR AUTOUR DE LA SOURIS
// ---------------------------
const glow = document.querySelector(".mouse-glow");
document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// ---------------------------
// ENVOYER MESSAGE
// ---------------------------
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

  const msg = input.value.trim();
  if (msg.length < 1) return;

  db.collection("messages").add({
    user: "Toi",
    text: msg,
    time: Date.now()
  });

  input.value = "";
}

// ---------------------------
// ENVOYER RÉACTION
// ---------------------------
function sendReaction(emoji) {
  db.collection("messages").add({
    user: "Toi",
    text: emoji,
    time: Date.now()
  });
}

// ---------------------------
// AFFICHAGE EN TEMPS RÉEL
// ---------------------------
const messagesBox = document.getElementById("messages");

db.collection("messages")
  .orderBy("time")
  .onSnapshot((snapshot) => {
    messagesBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "msg";
      div.innerHTML = `<strong>${data.user} :</strong> ${data.text}`;
      messagesBox.appendChild(div);
    });

    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
