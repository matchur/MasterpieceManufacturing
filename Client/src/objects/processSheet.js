import Phaser from "phaser";
export default class ProcessSheet
{
    constructor()
    {       
        let spr_processSheet;   
        let x,y,scene;  
        this.render = (xF,yF,sceneF) =>
        {           
            scene = sceneF;
            x = xF;
            y = yF;
        }

        this.processSheetOn =()=>
        {
            spr_processSheet = scene.add.image(x,y,'processSheet').setInteractive(); 
        }
        this.processSheetOff =()=>
        {
            spr_processSheet.destroy(); 
        }
    }
}