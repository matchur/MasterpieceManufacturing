import Phaser from "phaser";
export default class TabPhoto
{
    constructor(scene)
    {   
        //indice
        var index;
        //flag
        var On;
        var isPointerOver;

        var text;
        var spr_tab,spr_avatar;
        var style = { font: "28px Arial", fill: "#ffffff",align: "center",wordWrap: true};

        //funções existentes dentro da classe 
        this.render = (scene,x,y,i) =>
        { 
            var indexArg = i;
            this.index = i;
            this.On = false;
            this.isPointerOver = false;
            this.spr_tab = scene.add.sprite(x,y,'tabPhotoOff').setScale(1,1).setInteractive();
            
            
         
            
            this.spr_tab.on("pointerdown",function(){

                    scene.data.set('tabPhotosFlag',indexArg);
                    var x= 98,y = 100;
                    this.On = true;
                    this.setTexture('tabPhotoOn');
                    this.x = 38;                
                    scene.add.sprite(x,y,"avatar"+(indexArg+1)).setScale(1,1).setInteractive();               
      
            });         
        }
        this.isOn = () =>
        {
            return this.On;
        }

        this.getIndex = () =>
        {
            return this.index;
        }

        this.setOff = () =>
        {

            this.On = false;
            this.spr_tab.x = 40;
            this.spr_tab.setTexture('tabPhotoOff');
            scene.data.set('tabPhotosFlag',-1);
        }

    }
}