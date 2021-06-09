import Phaser from "phaser";
export default class TabInfo
{
    constructor(scene)
    {   

        //flag
        var On;
        var ptrOver,txtOver;
        var infoTab;
        var btnHome,btnConfig,btnRules;
        var style;

        //funções existentes dentro da classe 
        this.render = (scene,x,y) =>
        { 
            var style = { font: "18px Arial", fill: "#000000",align: "center",wordWrap: true};
            this.On = false;
            this.spr_tab = scene.add.sprite(x,y,'moreInfoTab').setScale(1,1).setInteractive();
            
            this.spr_tab.on("pointerdown",function()
            {
                    if(this.On)
                    {
                        this.infoTab.destroy();
                        this.btnHome.destroy();
                        this.btnConfig.destroy();
                        this.btnRules.destroy();
                        this.On = false;
                        this.y=213;
                    }
                    else
                    {
                        var x= 175,y = 282;//213
                        this.On = true;
                        this.infoTab = scene.add.sprite(x,y,'infoTab').setScale(1,1).setInteractive();
                        x=85;y=280;
                        this.btnHome = scene.add.sprite(x,y,'btnHome').setScale(0.4,0.4).setInteractive();
                        this.btnHome.on('pointerover',function(){
                            this.ptrOver = scene.add.sprite(85,220,'miniBox').setScale(1,1).setInteractive();
                            this.txtOver = scene.add.text(63,210, "Inicio", style);
                        });
                        this.btnHome.on('pointerout',function(){
                            this.ptrOver.destroy();this.txtOver.destroy();
                        });
                        x+=90;
                        this.btnConfig = scene.add.sprite(x,y,'btnConfig').setScale(0.4,0.4).setInteractive();
                        this.btnConfig.on('pointerover',function(){
                            this.ptrOver = scene.add.sprite(175,220,'miniBox').setScale(1,1).setInteractive();
                            this.txtOver = scene.add.text(59+90,210, "Config", style);
                        });
                        this.btnConfig.on('pointerout',function(){
                            this.ptrOver.destroy();this.txtOver.destroy();
                        });
                        x+=90;
                        this.btnRules = scene.add.sprite(x,y,'btnRules').setScale(0.4,0.4).setInteractive();
                        this.btnRules.on('pointerover',function(){
                            this.ptrOver = scene.add.sprite(175+90,220,'miniBox').setScale(1,1).setInteractive();
                            this.txtOver = scene.add.text(56+180,210, "Regras", style);
                        });
                        this.btnRules.on('pointerout',function(){
                            this.ptrOver.destroy();this.txtOver.destroy();
                        });
                        y = 386;
                        this.y = y;
                    }                    
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

    }
}