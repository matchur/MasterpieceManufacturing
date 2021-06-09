import Phaser from "phaser";
import TabPhoto from '../objects/tabPhoto';
import TabInfo from '../objects/tabInfo';
import TabPlayers from '../objects/tabPlayers';
export default class Player
{
    constructor(scene)
    {       
        var disc;//descrição do player
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
        var style = { font: "28px Arial", fill: "#ffffff",align: "center",wordWrap: true};

        //funções existentes dentro da classe 
        this.render = (scene,io,name) =>
        { 

            var aux;
            var idAux;
            this.socket = io('http://localhost:3000');
        
            var width = scene.game.config.width;
            var height = scene.game.config.height;
            this.widthScene=width;
            this.heightScene=height;
            this.tabs = [];
            this.scene = scene; 
            this.name = name;
            this.style = { font: "18px Arial", fill: "#ffffff",align: "left",wordWrap: true};
            this.spr_tableInfo = scene.add.sprite(175,100,'playerInfoTable').setScale(1,1).setInteractive();
            this.txt_tableInfo = this.scene.add.text(163, 50, "Nome: "+name, this.style);
            this.txt_roleInfo = this.scene.add.text(188, 70,this.disc == 'p'?"Gerente":"Projetista", this.style);

            this.btnGerente = scene.add.sprite(225,140,'btnGerente').setScale(1,1).setInteractive();
            this.btnGerente = scene.add.sprite(225,140,'btnGerente').setScale(1,1).setInteractive();
            for(var i = 0;i<7;i++)  
            {
                var tab = new TabPhoto;
                tab.render(scene,40,44+(18*i),i);
                this.tabs.push(tab);
            }

            //TabInfo -- 
            this.tabInfo = new TabInfo();
            this.tabInfo.render(scene,175,213);

            //interrupções de socket
            this.socket.on('newPlayer', function(playerId,playerName,playerAvatar)
            {
                this.disc = 'p';//projetistas
                aux.playerOn(playerId,playerName,playerAvatar);                         
            });

            this.socket.on('returnPlayers', function(playersIdArray,playersNameArray,playersAvatarArray)
            {
                for(var i=0;i<7;i++)
                {
                    if(playersIdArray[i] == null)
                    break;

                    aux.playerOn(playersIdArray[i],playersNameArray[i],playersAvatarArray[i]);  
                
                }
                                       
            });
            
            this.socket.on('attPlayer', function(playerId,playerName,playerAvatar)
            {
                aux.playerOn(playerId,playerName,playerAvatar);                         
            });

            this.socket.on('playerDisconnect', function(playersId)
            {
                aux.playerOff(playersId);                        
            });

            this.socket.on('connect',function()
            {
                console.log('Connected!!');
            }); 
            this.socket.on('myID',function(id)
            {
                idAux = id;
                console.log("ID:"+idAux);
                //TabPlayers -- 
                this.tabPlayers = new TabPlayers();
                this.tabPlayers.render(scene,1720,100,id);
                aux = this.tabPlayers;               
            });              
            //---------------------------------------

            this.socket.emit('getPlayers');
            return this;
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
            console.log(this.widthScene);

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