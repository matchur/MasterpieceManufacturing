import Phaser from "phaser";
export default class ProcessSheet
{
    constructor()
    {       
        var self = this;
        var style1 = { font: "24px Arial", fill: "#000000",align: "center",
        wordWrap: true};
        var style2 = { font: "15px Arial", fill: "#000000",align: "center",
        wordWrap: true};
        this.spr_processSheet;   
        var spr_msgBox;
        var spr_btnSim;
        var txt_box,txt_box2;
        this.render = (xF,yF,sceneF) =>
        {           
            this.scene = sceneF;
            this.x = xF;
            this.y = yF;
        }

        this.processSheetOn =()=>
        {
            this.spr_processSheet = this.scene.add.image(this.x,this.y,'processSheet').setInteractive(); 
        }
        
        this.processSheetOff =()=>
        {
            this.spr_processSheet.destroy(); 
        }

        this.showConfirmMsg = () =>
        {
            var flagOut = false;
            spr_msgBox = this.scene.add.image(1720,500,'woodenBox').setInteractive();
            spr_btnSim = this.scene.add.image(1720,530,'btnSim').setInteractive();
            txt_box = this.scene.add.text(1610, 450, "Confirmar processos?", style1);
            txt_box2 = this.scene.add.text(1600, 475, "Volte a carta a sua mão para cancelar.", style2);

            spr_btnSim.on('pointerdown', function (pointer) {

                this.setTint(0x0c750c);
                flagOut = false;
        
            });

            spr_btnSim.on('pointerout', function (pointer) {

                this.clearTint();
                flagOut = true;
        
            });

            spr_btnSim.on('pointerup', function (pointer) {

                if(!flagOut)
                {
                    this.clearTint();
                    this.scene.data.set('cardProcEscolhidaFlag',true);                 
                }
            });

            
        }

        this.deleteConfirmMsg = () =>
        {
            spr_msgBox.destroy();
            spr_btnSim.destroy();
            txt_box.destroy();
            txt_box2.destroy();
        }


    }
}