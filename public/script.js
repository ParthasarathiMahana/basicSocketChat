const socket = io.connect('http://localhost:7000/');

const messageDiv = document.getElementById('message-container')
const chatBox = document.getElementById('Chat-box')
const sendBtn = document.getElementById('send-btn')

const userName = prompt("Enter you name");
socket.emit("join", userName)

sendBtn.addEventListener("click", ()=>{
    if(!chatBox.value){
        alert('You can not send an empty message')
    }else{
        socket.emit("new_message", chatBox.value)
        const messsge = document.createElement('div');
        messsge.innerText = userName+": "+chatBox.value;
        messageDiv.appendChild(messsge)
    }
})

socket.on("broadcast_msg", (messageInfo)=>{
    const messsge = document.createElement('div');
    messsge.innerText = messageInfo.userName+": "+messageInfo.text;
    messageDiv.appendChild(messsge);
})