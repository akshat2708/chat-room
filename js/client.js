
const socket=io('http://localhost:8000')
//get dom element in respective js variable
const form = document.getElementById('send');
const msginput = document.getElementById('mess');
const msgcontainer = document.querySelector('.cont')
//audio play on recieving message
var audio=new Audio('Uggg sent message.mp3');


//function which will append to the cnotainer
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add('position')
    msgcontainer.append(messageElement)
    if(position='left'){
        audio.play();
    }

}

//ask new user for name
const name = prompt("enter you name");
socket.emit('new-user-joined',name);
//if new user join let srerver know
socket.on('user-joined',name=>{
    append('${name} joined the chat','right')
})
//if server send mssage receive it
socket.on('recieve',data=>{
    append('${data.name}:${data.mesage}','left')
})
socket.on('left',data=>{
    append('${name} leave the chat','left')})

    //if the form get submitted  send server the message
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message=messageInput.value;
        append('You: ${message}','right')
        socket.emit('send',message);
        messageInput.value='';
    })