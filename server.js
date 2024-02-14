//require fonksiyonu, Node.js ortamında dışarıdan bir modül veya kütüphane yüklemek için kullanılır. 
//Belirtilen modül dosyasını bulur, yükler ve içeriğini bir nesne olarak döndürür.
const express = require('express');
const socket = require('socket.io');

//Express server'ı başlatır.
const app = express();
const port = 3000;

//Express uygulamasını belirtilen bir port üzerinde dinlemeye başlar ve gelen istekleri işlemeye hazır hale getirir. 
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//İstemcilere sunulacak statik dosyaları sunmak için kullanılır. 
app.use(express.static('public'));

//Bu kod parçası, bir WebSocket sunucusu oluşturur. 
const io = socket(server);

//Bu kod, socket.io kütüphanesinin sunucu tarafı kısmını oluşturur.
io.on('connection', (socket) =>{
    console.log(socket.id);
    
    //chat olayını dinler. Veri akışı durumunda çalışır.
    socket.on('chat', data =>{
        //Gelen datayı tüm socket'lere iletir.
        io.sockets.emit('chat', data);
    })
})

