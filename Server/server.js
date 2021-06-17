const server = require('express')();

//socket dos players
let players = [];

//Almost a struct
let playersIdArray = [];
let playersNameArray = [];
let playersAvatarArray = [];
let playersRoleArray = [];

let cardSelected;

// io.to(socket#id).emit('hey')

const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: 
    {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });;



io.on('connection',function(socket)
{
  var index = players.length;
  var nomes;
  players.push(socket);
  playersIdArray.push(socket.id);
  //nomes
  var fs = require("fs");
  var text = fs.readFileSync("./namelist.txt", 'utf-8');
  nomes = text.split('\n')
 

  var random = nomes[Math.floor(Math.random() * nomes.length)];
  playersNameArray.push(random);
  playersAvatarArray.push(Math.floor(Math.random() * 7));
  playersRoleArray.push(index);

  socket.emit('myID',socket.id,
  playersNameArray[playersNameArray.length-1],
  playersAvatarArray[playersAvatarArray.length-1]
  ,playersRoleArray[playersRoleArray.length-1]);

  console.log("User Connected: "+socket.id);

  //manda para todos os clientes que entrou um novo jogador
  // io.emit('newPlayer',socket.id,"Generico",1);
  
  io.emit('newPlayer',
  playersIdArray[playersIdArray.length-1],
  playersNameArray[playersNameArray.length-1],
  playersAvatarArray[playersAvatarArray.length-1],
  playersRoleArray[playersRoleArray.length-1]
  );

  

  //passou a vez de alguem ser gerente
  socket.on('nextManager', function () 
  {
    var aux = playerRoleArray[0];
    playersRoleArray.slice(0);
    playersRoleArray.push(aux);
  });


  


  //client pedindo os players, quando o jogador entra, ele n sabe quem já está na mesa
  socket.on('getPlayers', function () 
  {
    this.emit('returnPlayers',playersIdArray,playersNameArray,playersAvatarArray,playersRoleArray); 
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
        players.splice(indexFind);
        console.log("Retirou player: "+indexFind);

                
        io.emit('playerDisconnect',socket.id);
      });

    })
   

//liga servidor
http.listen(3000,function(){
    console.log("Server Started!!!!"); 
})

