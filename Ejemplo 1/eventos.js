// Funcion que recoge elementos del formulario (usuario y mensaje) y con ellos
// anayade una entrada a Firestore
function enviarMensaje() {
  var db = firebase.firestore();
  // Mando un chat
  db.collection("chats").add({
    usuario: escapeHtml(document.getElementById("usuario").value),
    mensaje: escapeHtml(document.getElementById("mensaje").value),
  });
}