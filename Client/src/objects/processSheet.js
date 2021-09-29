import Phaser from "phaser";
export default class ProcessSheet
{
    constructor()
    {       
        let spr_processSheet;   
        this.render = (xF,yF,sceneF) =>
        {           
            this.scene = sceneF;
            this.x = xF;
            this.y = yF;
        }

        this.processSheetOn =()=>
        {
            spr_processSheet = this.scene.add.image(this.x,this.y,'processSheet').setInteractive(); 
        }
        
        this.processSheetOff =()=>
        {
            spr_processSheet.destroy(); 
        }
    }
}