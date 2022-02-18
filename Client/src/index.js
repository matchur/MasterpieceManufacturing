import Phaser from 'phaser'; 
import Game from './scenes/game'


class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {

    }
      
    create ()
    {
      
   
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'Jogo Usinagem - CNC',
    width: 1900,
    height: 949,
    scene: [Game]
};

const game = new Phaser.Game(config);
