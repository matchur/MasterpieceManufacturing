const server = require('express')();

//socket dos players
let players = [];

//Almost a struct
let playersIdArray = [];
let playersNameArray = [];
let playersAvatarArray = [];
let playerRoleArray = [];

let cardSelected;




// io.to(socket#id).emit('hey')

const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });;



io.on('connection',function(socket)
{
  var index = players.length;
  
  players.push(socket);
  playersIdArray.push(socket.id);
  playersNameArray.push("Generico")
  playersAvatarArray.push(1);

  socket.emit('myID',socket.id);
  console.log("User Connected: "+socket.id);

  //manda para todos os clientes que entrou um novo jogador
  io.emit('newPlayer',socket.id,"Generico",1);

  //client pedindo os players, quando o jogador entra, ele n sabe quem já está na mesa
  socket.on('getPlayers', function () 
  {
    this.emit('returnPlayers',playersIdArray,playersNameArray,playersAvatarArray); 
  });

  //quando um jogador, client, atualizar seus dados, esse trigger é acionado
  socket.on('attPlayer', function (playerId,playerName,playerAvatar) 
  {
    //atualiza no server
    var indexFind;
    indexFind = playersIdArray.findIndex(element => element == playerId);
    playerIdArray[indexFind] = playerId;
    playersNameArray[indexFind] = playerName;
    playersAvatarArray[indexFind] = playerAvatar;

    //atualiza para os jogadores
    io.emit('attPlayer',playerId,playerName,playerAvatar);
  });


  
      socket.on('disconnect',function()
      {
        var indexFind;
        console.log("User Disconnected: "+socket.id);
        indexFind = playersIdArray.findIndex(element => element == socket.id);
        playersIdArray.splice(indexFind);
        playersNameArray.splice(indexFind);
        playersAvatarArray.splice(indexFind);
        
                
        io.emit('playerDisconnect',socket.id);
      });

    })
   

//liga servidor
http.listen(3000,function(){
    console.log("Server Started!!!!"); 
})

