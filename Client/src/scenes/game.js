import CardProc from '../objects/cardProc.js';
import CardPeca from '../objects/cardPeca.js';
import Table from '../objects/table.js';
import Visor from '../objects/visor.js';
import Player from '../objects/player.js';
import io from 'socket.io-client';

//criação de uma scene, onde os objetos serão adcionados
export default class Game extends Phaser.Scene
{
    
    constructor()
    {
        super({key:'Game'})

    }

    preload()
    {
        let i = 0;
        this.load.image('cardPeca','src/assets/cardPeca.png');
        this.load.image('cardProc','src/assets/cardProc.png');
        this.load.image('card_frentePeca','src/assets/frentePeca.png');
        this.load.image('card_frenteProc','src/assets/frenteProc.png');
        this.load.image('background','src/assets/background.png');
        this.load.image('mesa','src/assets/table.png');  
        this.load.image('shortcut','src/assets/shortcutBox.png');  
        this.load.image('curtain','src/assets/curtain.png');  
        this.load.image('visor','src/assets/visor.png');  
        this.load.image('dropZone','src/assets/dropZone.png');  
        this.load.image('handCursor1','src/assets/handCursor1.png');
        this.load.image('handCursor2','src/assets/handCursor2.png'); 
        this.load.image('playerInfoTable','src/assets/playerInfoTable.png');  
        this.load.image('tabPhotoOn','src/assets/tabPhotoOn.png'); 
        this.load.image('tabPhotoOff','src/assets/tabPhotoOff.png');
        this.load.image('moreInfoTab','src/assets/moreInfoTab.png'); 
        this.load.image('infoTab','src/assets/infoTab.png');
        this.load.image('btnHome','src/assets/btnHome.png');
        this.load.image('btnConfig','src/assets/btnConfig.png');
        this.load.image('btnRules','src/assets/btnRules.png');
        this.load.image('miniBox','src/assets/miniBox.png');
        this.load.image('prancheta','src/assets/prancheta.png');
        this.load.image('btnGerente','src/assets/gerenteBtn.png');

        //avatares
        this.load.image('avatar1','src/assets/Avatars/avatar1.png'); 
        this.load.image('avatar2','src/assets/Avatars/avatar2.png'); 
        this.load.image('avatar3','src/assets/Avatars/avatar3.png'); 
        this.load.image('avatar4','src/assets/Avatars/avatar4.png'); 
        this.load.image('avatar5','src/assets/Avatars/avatar5.png'); 
        this.load.image('avatar6','src/assets/Avatars/avatar6.png'); 
        this.load.image('avatar7','src/assets/Avatars/avatar7.png'); 


    }

    create()
    {
      let scene = this;
      let cardsProc = [];
      let cardsPeca = [];
      let mesa;
      this.data.set('cardPecaTable',1);
      this.data.set('cardPecaDeck',10);
      this.data.set('cursorHandFlag',false);
      this.data.set('tabPhotosFlag',-1);
      const {width,height} = this.scale;



        //imagem de background
        this.add.image(0, 0, 'background').setOrigin(0);

        //colocar mesa
        mesa = new Table(this);
        mesa.render(948,352,'mesa',this);


        //colocar visor
        this.visor = new Visor(this);
        this.visor.render(945,35,'visor',this);
      
        //setBaralho de pecas
        for(var i = 0;i<10;i++)
            cardsPeca[i] = new CardPeca(this,i);
        this.shuffle(cardsPeca);
        for(var i = 0;i<10;i++)
            cardsPeca[i].render(1350,350,'cardPeca',this,'shortcut');
        
          //dealCartas processos
          for(var i = 0;i<10;i++)  
          {
            cardsProc[i] = new CardProc(this);               
            cardsProc[i].render(500+100*i,780,'cardProc',this,'shortcut');
          }
          console.log(this.visor);


      //set player socket function
      this.player = new Player();
      this.player.render(scene,io,"Matchur");
    }

    shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }



    update() 
    {
      //console.log(this.visor.turn);
      ///let variable = this.visor.getTurn();
      //console.log(variable);e
      if(this.data.get('cursorHandFlag'))
      {      
        this.visor.nextTurn();
        this.player.blindPlayer();
        this.data.set('cursorHandFlag',false);
      }
      if(this.data.get('tabPhotosFlag') != -1)
      this.player.resetTab();  
    }






}