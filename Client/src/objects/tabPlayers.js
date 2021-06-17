import Phaser from "phaser";
export default class TabInfo
{
    constructor(scene)
    {   
        //valor do id da conexão do player owner
        var idOwner;

        //flag
        var On;
        var ptrOver,txtOver;
        var infoTab;
        var btnHome,btnConfig,btnRules;
        var style;
        
        
        //almost a scrutcure
        var playersLenght;
        var playersId;
        var playersAvatar;
        var playersName;
        var spr_prancheta;
        var spr_playersPic;
        var txt_info;

        var style = { font: "18px Arial", fill: "#000000",align: "center",wordWrap: true};
 

        var scene;

        //funções existentes dentro da classe 
        this.render = (scene,x,y,ID) =>
        { 

            var self;
            this.playersLenght = 0;
            this.idOwner = ID;
            this.scene = scene;
            
            this.On = false;
            this.spr_tab = scene.add.sprite(x,y,'playerInfoTable').setScale(1,1).setInteractive();
            this.spr_prancheta = [];
            this.spr_playersPic = [];
            this.playersId = [];
            this.playersAvatar = [];
            this.playersName = [];
        }
        this.playerOn = (Pid,Pnome,Pavatar,Prole) =>
        {
            var txt_role,txt_name,spr_box,auxPran,auxTam,auxPic;
            var self = this;

            var auxTam= this.playersLenght;
            //esse if vai aqui dentro pq fora da função está bugando???
            if(Pid != this.idOwner)
            {
                this.playersId.push(Pid);
                this.playersAvatar.push(Pavatar); 
                this.playersName.push(Pnome);

                auxPran = this.scene.add.sprite(1600+(60*auxTam),100,'prancheta').setScale(1,1).setInteractive()
                auxPran.on('pointerover',function(){
                
                    spr_box  = this.scene.add.sprite(1600+(60*auxTam),170,'playerInfoBox').setScale(1,1).setInteractive();
                    txt_name = this.scene.add.text(1540+(60*auxTam),145,Pnome, { font: "12px Arial", fill: "#000000",align: "center",wordWrap: true});    
                    txt_role = this.scene.add.text(1558+(60*auxTam),165,Prole == 0?"Gerente":"Projetista", { font: "18px Arial", fill: "#000000",align: "center",wordWrap: true});
                });
                auxPran.on('pointerout',function(){ 
                    txt_name.destroy();
                    spr_box.destroy();
                    txt_role.destroy();
                });
                
                this.spr_prancheta.push(auxPran);
                
                auxPic = this.spr_playersPic.push(this.scene.add.sprite(1590+(60*this.playersLenght),90,"avatar"+(Pavatar)).setScale(0.2,0.2).setInteractive());  
                this.playersLenght++;
            }
        }   


        //função bugada
        this.playerOff = (playerId) =>
        {
            var self = this;
            var auxPran,auxPic;
            var iPlayer = this.playersId.findIndex(element => element == playerId);

                console.log(iPlayer);
                //tirar os sprites  
                for(var i = 0;i<this.playersLenght;i++)
                {
                    this.spr_prancheta[i].destroy();
                    this.spr_playersPic[i].destroy();
                }
    
    
                this.spr_prancheta = [];
                this.spr_playersPic = [];
    
                //retirar os dados do player das arrays
                this.playersId.splice(iPlayer);
                this.playersName.splice(iPlayer);
                this.playersAvatar.splice(iPlayer);
                this.playersLenght--;
    
                //printar tudo novamente, utilizar função playerOn
                for(var i = 0;i<this.playersLenght;i++)
                {
                    auxPran = this.scene.add.sprite(1600+(60*i),100,'prancheta').setScale(1,1).setInteractive()
                    
                    this.spr_prancheta.push(auxPran);              
                    
                    auxPran.on('pointerover',function()
                    {
                    
                        self.scene.add.text(1600+(60*i),80, idOwner, this.style);    
                    
                    });  
           
                    auxPic = this.spr_playersPic.push(this.scene.add.sprite(1590+(60*i),90,"avatar"+( this.playersAvatar[i])).setScale(0.2,0.2).setInteractive());  
                }
            
 

        }

        this.getNumPlayers = () =>
        {
            return this.playersLength;
        }

    }
}