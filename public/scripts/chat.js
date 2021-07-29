const server = window.location.host;
const socket = io.connect(server);

let chatArea = document.getElementById("chatArea");
let message = document.getElementById("sendMessageInput");
let sendMessageForm = document.getElementById("sendMessageForm");
let infoArea = document.getElementById("infoArea");

// message form submit
sendMessageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  socket.emit('chat', {
    message: message.value
  });
  message.value = '';
});

// receiving data on chat channel
socket.on('chat', function (data) {
  const parsed = JSON.parse(data);

  // removing empty informations if its first message
  if (chatArea.classList.contains("empty")) {
    chatArea.innerHTML = '';
    chatArea.classList.remove('empty');
  }

  // adding message to chatarea's body
  chatArea.innerHTML += '<p><strong>' + parsed.user + '</strong> <span>»</span>' + parsed.message + '</p>';
  chatArea.scrollTop = chatArea.scrollHeight;

  // resetting "writing" info bar
  setWritingInfoMessage(parsed.user, false);
});

// informing server when client starts writing a message
message.addEventListener("keyup", function (e) {
  socket.emit('typing', { typing: message.value.length > 0 ? true : false });
});

// receiving data on chat channel to inform who's writing atm
socket.on('typing', function (data) {
  const parsed = JSON.parse(data);
  setWritingInfoMessage(parsed.user, parsed.typing ? true : false);
});


// "Writing" info bar's handling function
function setWritingInfoMessage(username, status) {

  const userId = username.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);

  let elem = document.querySelector('#writingInfo' + userId);
  if (elem) {
    elem.parentNode.removeChild(elem);
  }

  if (status) {
    const infoMsg = '<p id="writingInfo' + userId + '"><strong>' + username + '</strong> is writing...</p>';
    infoArea.innerHTML += infoMsg;
  }

  const countInfoMsg = document.querySelectorAll('#infoArea p').length;
  if (countInfoMsg > 0) {
    infoArea.classList.remove("hidden");
  }
  else {
    infoArea.classList.add("hidden");
  }

}


