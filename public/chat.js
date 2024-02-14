//Bu kod parçası, istemcinin belirli bir sunucuya WebSocket bağlantısı kurmasını sağlar..
const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');

//Butonun tetiklenmesi durumunda çalışır.
submitBtn.addEventListener('click', () => {
    //message ve sender text'lerindeki verileri chat topic'i üzerinden yayınlar.
    socket.emit('chat', {
        message: message.value,
        sender: socket.id
    }); 
});

//chat olayını dinler. Server'dan gelen data'yı işler.
socket.on('chat', data => {
    output.innerHTML += '<p><strong>'+data.sender.substring(0,3)+'... : </strong>'+data.message+'</p>'
    message.value = '';
});