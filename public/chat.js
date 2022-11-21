const socket = io();

// DOM elements
let message = document.getElementById('message');
// let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

let yoEscribo = false;

let username = prompt('Hola, introduce tu nombre: ');
console.log('username', username);


btn.addEventListener('click', function() {
    socket.emit('chat:message', {
        message: message.value,
        username: username
    });

    yoEscribo = true;
    message.value = "";

});

message.addEventListener('keypress', function() {
    socket.emit('chat:typing', username);
})

socket.on('chat:message', function(data) {
    actions.innerHTML = '';
    yoEscribo ? output.innerHTML += `<p style="background: rgb(158, 255, 208); margin-left: 250px; border:none"><strong>${data.username}</strong>: ${data.message}</p>` :
    output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
    yoEscribo = false;

   
});


socket.on('chat:typing', function (data) {
    actions.innerHTML = `<span><em>${data} is typing a message...</em></span>`
} )


