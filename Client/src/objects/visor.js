import Phaser from "phaser";

export default class Visor
{
    
    constructor(scene)
    {               
        var turn = 0;
        var board;
        var turnString = ['Escolha da peça','Seleção dos processos',
        'Comparando os processos','Organização da sequência de processos','Criação (Palpite)'];
        var turnX = [53,73,88,130,53]
        var style = { font: "15px Arial", fill: "#000000",align: "center", wordWrap: true};
        var text;
        //funções existentes dentro da classe 
        this.render = (x,y,sprite,scene) =>
        { 
            turn = 0;
            board = scene.add.image(x,y,sprite).setInteractive().setScale(0.7,0.75);
            text = scene.add.text(board.x-turnX[turn], board.y-10, turnString[turn], style);
            return this;   
        }

        this.getTurn = ()=>
        {
            return turn;
        }

        this.nextTurn = () =>
        {
            text.destroy();
            turn++;
            text = scene.add.text(board.x-turnX[turn], board.y-10, turnString[turn], style);
            return board;
        }
            
    }
}