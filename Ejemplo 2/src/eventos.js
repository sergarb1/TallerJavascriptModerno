 // Funcion que recibe un texto y devuelve el mismo texto escapando el HTML
 // utilizada para evitar ataques XSS
 export function escapeHtml(text) {
   return text
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#039;");
 }


    // Funcion que recoge elementos del formulario (usuario y mensaje) y con ellos
    // anayade una entrada a Firestore
 export function enviarMensaje() {
   var db = firebase.firestore();
   // Mando un chat
   db.collection("chats").add({
     usuario: escapeHtml(document.getElementById("usuario").value),
     mensaje: escapeHtml(document.getElementById("mensaje").value),
   });
 }