import Phaser from "phaser";
import TabInfo from '../objects/tabInfo';
import TabPlayers from '../objects/tabPlayers';
import ProcessSheet from '../objects/processSheet';
import CardPeca from '../objects/cardPeca.js';


export default class Player
{
    constructor(scene)
    {       
        var disc;//descrição do player -- g - p
        var id;//id do jogador
        var name;//nome do jogador  
        var avatar;//avatar do jogador
        var socket;
        var scene;
        var tabs;
        var tabsPhoto;
        var spr_tableInfo;
        var btnGerente;
        var txt_tableInfo;
        var txt_roleInfo;
        var tabPlayers;
        var tabInfo;
        var curtain;    
        var widthScene,heightScene;
        var text;
        var style = { font: "28px Arial", fill: "#ffffff",align: "center",wordWrap: true, maxwidth: 13};
        //await text
        var spr_await;
        var txt_await;
        var txt_infoAwait;


        //funções existentes dentro da classe 
        this.render = (scene,io) =>
        { 
            var self = this;

            this.socket = io('http://localhost:3000');
        
           


            var width = scene.game.config.width;
            var height = scene.game.config.height;
            this.widthScene=width;
            this.heightScene=height;
            this.tabs = [];
            this.scene = scene;
            this.style = { font: "17px Arial", fill: "#ffffff",align: "left",wordWrap: true};
            this.spr_tableInfo = scene.add.sprite(175,100,'playerInfoTable').setScale(1,1).setInteractive();
            
            

            //this.btnGerente = scene.add.sprite(180,135,'btnGerente').setScale(0.8,0.8).setInteractive();

    


            //TabInfo -- 
            this.tabInfo = new TabInfo();
            this.tabInfo.render(scene,175,213);

            //interrupções de socket
            this.socket.on('newPlayer', function(playerId,playerName,playerAvatar,index)
            {
                console.log(playerName+"-"+index);
                self.tabPlayers.playerOn(playerId,playerName,playerAvatar,index);                         
            });

            this.socket.on('returnPlayers', function(playersIdArray,playersNameArray,playersAvatarArray,playersRoleArray)
            {
                for(var i=0;i<7;i++)
                {
                    if(playersIdArray[i] == null)
                    break;
                    console.log(playersNameArray[i]+"-"+playersRoleArray[i]);
                    self.tabPlayers.playerOn(playersIdArray[i],playersNameArray[i],playersAvatarArray[i],playersRoleArray[i]);                  
                }                                       
            });

            this.socket.on('startProcessTurn',function(cardsInTable,cardSelected)
            {
                if(self.disc == 'p')//verifica se o jogador não é gerente
                {
                    
                    //avançar o tuno (visor)
                    self.scene.visor.nextTurn();

                    //tirar aviso da tela
                    self.awaitManagerOff();

                    //colocar na tela a folha de processos
                    scene.processSheet.processSheetOn();



                    //passa para variavel global as casr e liga a flag de card peça
                    scene.data.set('cardsInTable',cardsInTable);
                    scene.data.set('cardSelected',cardSelected);
                    scene.data.set('choosenCardsFlag',true);        
                    
                    //players podem soltar as cartas na mesa

                    //ao colocar duas cartas na mesa ele confirma
                }
            });
            
            this.socket.on('playerProcCardOK', function(playerID)//socket para marcar quem ja deu OK
            {                
                // se n for o id dessa pessoa e n for gerente
                if(self.id != playerID && self.disc != 'g')
                    self.tabPlayers.playerProcCardSelected(playerID);
            });
            
            this.socket.on('attPlayer', function(playerId,playerName,playerAvatar)
            {
                self.tabPlayers.playerOn(playerId,playerName,playerAvatar);                         
            });

            this.socket.on('startCompProcCards', function(selectedProcCards,playersAvatar,playersName)
            {


                self.scene.data.set('compCardProcFlag',true);
               


                //fazer a animação


                
            });

            this.socket.on('playerDisconnect', function(playersId)
            {
                self.tabPlayers.playerOff(playersId);                        
            });

            this.socket.on('connect',function()
            {
                console.log('Connected!!');
            }); 
            this.socket.on('myID',function(id,nome,avatar,role)
            {
                scene.add.sprite(80,100,"avatar"+(avatar)).setScale(1,1).setInteractive();     
                console.log("ROLE:"+role);
                self.disc = role == 0?"g":"p";
                self.scene.data.set('playerRole',self.disc);
                self.scene.data.set('dealCardsFlag',true);
                self.id = id;
                console.log("ID:"+self.id);
                self.name = nome;
                self.txt_tableInfo = self.scene.add.text(140, 35, "Nome: "+nome, self.style);
                self.txt_roleInfo = self.scene.add.text(140, 55,self.disc == 'p'?"Projetista":"Gerente", self.style);
                console.log("--");
                console.log(this.disc);
                //TabPlayers--
                self.tabPlayers = new TabPlayers();
                self.tabPlayers.render(scene,1720,100,id);
            });              
            //---------------------------------------

            this.socket.emit('getPlayers');
            
            return this;
        }

        this.managerChooseCard = (cardsInTable,cardSelected) =>
        {
            this.socket.emit('managerChooseCard',cardsInTable,cardSelected);
        }

        this.playerChooseCard = (cardsChoose) =>
        {
            this.socket.emit('projChooseCard',cardsChoose,this.id);
        }

        this.setDisc = (disc) =>
        {
            this.disc = disc;            
        }
           
        this.resetTab = () =>
        {
            this.tabs.forEach(element => {
                console.log(element);
                if(element.isOn() && element.getIndex() == this.scene.data.get('tabPhotoFlag'))
                {
                    element.setOff();
                    console.log(element.index);
                }

            });
            
        }

        this.textBlindPlayer = () =>
        {
           
            this.style = { font: "28px Arial", fill: "#ffffff",align: "center",wordWrap: true};
            this.text = this.scene.add.text(this.widthScene/2, this.heightScene/2, "Tirando férias keke", this.style);
        }

        this.awaitManagerOn = () =>
        {
            this.spr_await = this.scene.add.sprite(this.widthScene/2,350,'tabWait').setScale(1,1).setInteractive();
            this.style = { font: "40px Arial", fill: "#b81c1c",align: "center",wordWrap: true};
            this.txt_await = this.scene.add.text(875, 300, "ESPERE", this.style);
            this.style = { font: "28px Arial", fill: "#000000",align: "center",wordWrap: true};
            this.txt_infoAwait = this.scene.add.text(745, 350, "Gerente escolhendo o card de peça", this.style);
            this.style = { font: "28px Arial", fill: "#ffffff",align: "center",wordWrap: true};
        }

        
        this.awaitManagerOff = () =>
        {
            this.spr_await.destroy();
            this.txt_await.destroy();
            this.txt_infoAwait.destroy();
        }

    

        this.blindPlayer = () =>
        {
            this.curtain = this.scene.add.image(0,0,'curtain').setScale(2,0).setInteractive();
                    const timeline = this.scene.tweens.createTimeline({
                        onComplete: () =>
                        {
                            timeline.destroy()
                        }
                    });
            
                    timeline.add(
                        {

                            targets: this.curtain,
                            scaleY:0,
                            duration: 3000
                        })
            
                    timeline.add(
                        {
                            targets: this.curtain,
                            scaleY: 1.7,
                            onComplete: () =>
                            {
                                this.textBlindPlayer();
                            }
                        })
            
           
                      timeline.play(); 
        }


    }
}