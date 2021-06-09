import Phaser from "phaser";
export default class Table
{
    constructor(scene)
    {       
        let dropZone;     
        //funções existentes dentro da classe 
        this.render = (x,y,sprite,scene) =>
        {           
            let table = scene.add.image(x,y,sprite).setInteractive();
            dropZone = scene.add.image(x,y,'dropZone').setInteractive();
         }
    }
}