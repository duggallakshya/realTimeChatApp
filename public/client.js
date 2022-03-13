const socket = io()
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
let sendBtn = document.querySelector(".btn");

do {
   name = prompt("Please enter your name: ")
}while(!name)

sendBtn.addEventListener('click', () => {
    if(textarea.value){
        sendMessage(textarea.value);
    }
    
})

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg) {
    let msgObj = {
        user: name,
        message:msg.trim()
    }

    appendMessage(msgObj, 'outgoing');
    textarea.value = "";
    scrollToBottom();

    socket.emit('message' , msgObj)

    
}

function appendMessage(msgObj, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msgObj.user}</h4>
        <p>${msgObj.message}</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//Receive msg

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}