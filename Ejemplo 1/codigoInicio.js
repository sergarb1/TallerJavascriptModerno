// Funcion que recibe un texto y devuelve el mismo texto escapando el HTML
// utilizada para evitar ataques XSS
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}



// Definimos manejador de inicio

// Funcion cargada cuando el DOM este disponible. Inicializa el acceso a Firebase y Firestore
// y rellena el div que contiene el chat.
// Asimismo, tambien mete un manejador, para que cuando Firestore le avise de un cambio
// en la base de datos, el actualice el chat.
document.addEventListener('DOMContentLoaded', function () {


  // Anyadimos manejador de enviar
  document.getElementById("enviar").addEventListener("click", enviarMensaje);

  // Configuración de tu aplicación Firebase (cada APP tiene la suya)
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  // Inicializamos Firebase
  firebase.initializeApp(firebaseConfig);
  // Obtenemos una referencia a nuestra base de datos firestore
  var db = firebase.firestore();


  // Codigo para detectar cambios en tiempo real.
  // Si se meten datos nuevos, actualiza el chat
  db.collection("chats").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        var nuestroChat = document.getElementById("nuestroChat");
        nuestroChat.innerHTML = "<p>" + escapeHtml(change.doc.data().usuario + " : " + change.doc.data().mensaje) + "</p>" + nuestroChat.innerHTML;
      }
      /*
              if (change.type === "modified") {
                console.log("Modified : ", change.doc.data());
              }
              if (change.type === "removed") {
                console.log("Removed : ", change.doc.data());
              }*/
    });
  });
});