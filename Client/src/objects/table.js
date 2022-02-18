import Phaser from "phaser";
import CardProc from "./cardProc";
import CardPeca from "./cardPeca";
export default class Table
{
    constructor(scene)
    {     
          
        let dropZone;     
        //funções existentes dentro da classe 
        this.render = (x,y,sprite,scene) =>
        {           
            this.scene = scene;
            let table = scene.add.image(x,y,sprite).setInteractive();
            dropZone = scene.add.image(x,y,'dropZone').setInteractive();
        }


        this.flipCardOverPlaymat = (ProcCardsDeck) =>
        {

            var ProcArray = ProcCardsDeck;
            var selectProcCards = [];
            
            for(var i=0,j=0;i<16,j<1;i++)
            {
                if(ProcArray[i].isChosen() == true)
                {
                    ProcArray[i].flipInPlaymat(j);
                    ProcArray[i].setIsSelected(true);
                    selectProcCards.push(ProcArray[i].getIndexCard());
                    j++;
                }   
            }
            this.scene.data.set('cardProcChosen',selectProcCards);
        }

        this.procCardsDestroy = (procCardsDeck) =>
        {  
            for(var i=0;i<16;i++)
                procCardsDeck[i].procCardDestroy();
        }

        //projetistas com 3 
        this.pecaCardsDestroyProj = (pecaCardsDeck) =>
        {
            for(var i=0;i<3;i++)
                pecaCardsDeck[i].cardPecaDestroy();
        }

        //default com 16
        this.pecaCardsDestroyDef = (pecaCardsDeck) =>
        {
            for(var i=0;i<16;i++)
                pecaCardsDeck[i].cardPecaDestroy();
        }


    

    }
}