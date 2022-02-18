import CardProc from '../objects/cardProc.js';
import CardPeca from '../objects/cardPeca.js';
import Table from '../objects/table.js';
import Visor from '../objects/visor.js';
import Player from '../objects/player.js';
import ProcessSheet from '../objects/processSheet.js';
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
        this.load.image('background','src/assets/background.png');
        this.load.image('mesa','src/assets/table.png');  
        this.load.image('shortcut','src/assets/shortcutBox.png');  
        this.load.image('curtain','src/assets/curtain.png');  
        this.load.image('visor','src/assets/visor.png');  
        this.load.image('dropZone','src/assets/dropZone.png');  
        this.load.image('handCursor1','src/assets/handCursor1.png');
        this.load.image('handCursor2','src/assets/handCursor2.png'); 
        this.load.image('playerInfoTable','src/assets/playerInfoTable.png');  
        this.load.image('moreInfoTab','src/assets/moreInfoTab.png'); 
        this.load.image('infoTab','src/assets/infoTab.png');
        this.load.image('btnHome','src/assets/btnHome.png');
        this.load.image('btnConfig','src/assets/btnConfig.png');
        this.load.image('btnRules','src/assets/btnRules.png');
        this.load.image('miniBox','src/assets/miniBox.png');
        this.load.image('prancheta','src/assets/prancheta.png');
        this.load.image('btnGerente','src/assets/gerenteBtn.png');
        this.load.image('tabWait','src/assets/waitTab.png');
        this.load.image('playerInfoBox','src/assets/playerInfoBox.png');
        this.load.image('processSheet','src/assets/processSheet.png');
        this.load.image('btnExpand','src/assets/expandIcon.png');
        this.load.image('woodenBox','src/assets/woodenBox.png');
        this.load.image('btnSim','src/assets/btnSim.png');
        this.load.image('OKproc','src/assets/okCard.png');
        this.load.image('playerInfoCard','src/assets/playerInfoBoxCard.png');
        
        //avatares
        this.load.image('avatar0','src/assets/Avatars/avatar0.png'); 
        this.load.image('avatar1','src/assets/Avatars/avatar1.png'); 
        this.load.image('avatar2','src/assets/Avatars/avatar2.png'); 
        this.load.image('avatar3','src/assets/Avatars/avatar3.png'); 
        this.load.image('avatar4','src/assets/Avatars/avatar4.png'); 
        this.load.image('avatar5','src/assets/Avatars/avatar5.png'); 
        this.load.image('avatar6','src/assets/Avatars/avatar6.png'); 

        //frente pecas
        this.load.image('peca0','src/assets/Pecas/1.png');
        this.load.image('peca1','src/assets/Pecas/2.png');
        this.load.image('peca2','src/assets/Pecas/3.png');
        this.load.image('peca3','src/assets/Pecas/4.png');
        this.load.image('peca4','src/assets/Pecas/5.png');
        this.load.image('peca5','src/assets/Pecas/6.png');
        this.load.image('peca6','src/assets/Pecas/7.png');
        this.load.image('peca7','src/assets/Pecas/8.png');
        this.load.image('peca8','src/assets/Pecas/9.png');
        this.load.image('peca9','src/assets/Pecas/10.png');
        this.load.image('peca10','src/assets/Pecas/11.png');
        this.load.image('peca11','src/assets/Pecas/12.png');
        this.load.image('peca12','src/assets/Pecas/13.png');
        this.load.image('peca13','src/assets/Pecas/14.png');
        this.load.image('peca14','src/assets/Pecas/15.png');
        this.load.image('peca15','src/assets/Pecas/16.png');

        
        
        //frente processos
        this.load.image('processo0','src/assets/Processos/1.png');
        this.load.image('processo1','src/assets/Processos/2.png');
        this.load.image('processo3','src/assets/Processos/4.png');
        this.load.image('processo2','src/assets/Processos/3.png');
        this.load.image('processo4','src/assets/Processos/5.png');
        this.load.image('processo5','src/assets/Processos/6.png');
        this.load.image('processo6','src/assets/Processos/7.png');
        this.load.image('processo7','src/assets/Processos/8.png');
        this.load.image('processo8','src/assets/Processos/9.png');
        this.load.image('processo9','src/assets/Processos/10.png');
        this.load.image('processo10','src/assets/Processos/11.png');
        this.load.image('processo11','src/assets/Processos/12.png');
        this.load.image('processo12','src/assets/Processos/13.png');
        this.load.image('processo13','src/assets/Processos/14.png');
        this.load.image('processo14','src/assets/Processos/15.png');
        this.load.image('processo15','src/assets/Processos/16.png');
        this.load.image('processo16','src/assets/Processos/16.png');

    }

    create()
    {
      let scene = this;
      this.cardsProc = [];
      this.cardsPeca = [];
      this.playMat;
      let mesa;

      this.data.set('choosenCardsFlag',false);
      this.data.set('cardsInTable',null);
      this.data.set('cardSelected',null);

      this.data.set('cardPecaTable',1);
      this.data.set('cardPecaDeck',16);
      this.data.set('cursorHandFlag',false);
      this.data.set('tabPhotosFlag',-1);
      this.data.set('playerRole','X');
      this.data.set('dealCardsFlag',false);

      //flag global da carta de processo na mesa
      this.data.set('cardProcCount',0);
      this.data.set('msgConfirmFlag',false);
      //flag para a confirmação da carta de processo
      this.data.set('cardProcEscolhidaFlag',false);
      //cardsEscolhidos
      this.data.set('cardProcChosen',null);


      //flag para checagem das cartas de processo
      this.data.set('compCardProcFlag',false);
      

      //cartas selecionadas  //// cartas escolhidas
      this.cardsSelected = [];
      this.cardChoose = null;



      const {width,height} = this.scale;

        //imagem de background
        this.add.image(0, 0, 'background').setOrigin(0);
      
        //set player socket function
        this.player = new Player();
        this.player.render(scene,io);

        //colocar mesa
        this.mesa = new Table(this);
        this.mesa.render(948,352,'mesa',this);

        //processSheet
        this.processSheet = new ProcessSheet();
        this.processSheet.render(948,352,this);

        //colocar visor
        this.visor = new Visor(this);
        this.visor.render(945,35,'visor',this);


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
      //----------TRIGGER-----------
      if(this.data.get('choosenCardsFlag'))//gerente escolheu a peça, trigger para os projetistas
      {
        for(var i = 0;i<3;i++)
        {                      
           this.cardsPeca[i] = new CardPeca(this);
           this.cardsPeca[i].setIndex(this.data.get('cardsInTable')[i]);
           this.cardsPeca[i].render(750+(i*260),230,'cardPeca',this,'shortcut','p');
           this.cardsPeca[i].flipFace();

           if(this.data.get('cardsInTable')[i] != this.data.get('cardSelected'))
           this.cardsPeca[i].notSelected();
          
          //if(this.data.get('cardSelected') == this.data.get('cardsInTable')[i])

        }
        for(var i = 0;i<16;i++)  
        {
          this.cardsProc[i] = new CardProc(this);               
          this.cardsProc[i].render(200+100*i,780,'cardProc',this,'shortcut',i);
        }
       
        this.data.set('choosenCardsFlag',false);
      }

      //----------TRIGGER-----------
      if(this.data.get('cursorHandFlag'))
      {      
        this.visor.nextTurn();
        this.player.blindPlayer();
        this.data.set('cursorHandFlag',false);
        for(var i=0;i<16;i++)
          if(!this.cardsPeca[i].inDeck)
          {
              if(!this.cardsPeca[i].inDeck)
                this.cardsSelected.push(this.cardsPeca[i].index);
              if(this.cardsPeca[i].isChoose)
                this.cardChoose = this.cardsPeca[i].index;
          }
        this.player.managerChooseCard(this.cardsSelected,this.cardChoose);
      }


      //----------TRIGGER-----------
      if(this.data.get('playerRole') == 'g' && this.data.get('dealCardsFlag'))
      {
            //setBaralho de pecas
            for(var i = 0;i<16;i++)
            {
              this.cardsPeca[i] = new CardPeca(this);
              this.cardsPeca[i].setIndex(i);
            }
            
            this.shuffle(this.cardsPeca);
            for(var i = 0;i<16;i++)
            this.cardsPeca[i].render(1350,350,'cardPeca',this,'shortcut','g');

            this.data.set('dealCardsFlag',false);
            
      }
      //----------TRIGGER-----------
      if(this.data.get('playerRole') == 'p' && this.data.get('dealCardsFlag'))
      {

          console.log(this.visor);
          this.player.awaitManagerOn();
        this.data.set('dealCardsFlag',false);
      }




      //----------TRIGGER----------- //mensagem de confirmação das cartas de processo
      if(this.data.get('cardProcCount') == 1 && !this.data.get('msgConfirmFlag'))
      {
        //mostra caixa de confirmaçao na tela
        this.processSheet.showConfirmMsg();
        this.data.set('msgConfirmFlag',true);
          
      }
      if(this.data.get('cardProcCount') < 1 && this.data.get('msgConfirmFlag'))
      {
        //tira caixa de confirmaçao na tela
        this.processSheet.deleteConfirmMsg();
        this.data.set('msgConfirmFlag',false);
      }






      //----------TRIGGER----------- //projetista coloca carta de processo na mesa
      if(this.data.get('cardProcEscolhidaFlag'))
      {
        //inicia a animação de card
        this.mesa.flipCardOverPlaymat(this.cardsProc);
        this.processSheet.deleteConfirmMsg();
        
        this.data.set('cardProcEscolhidaFlag',false);
      }

      //----------TRIGGER-----------
      if(this.data.get('cardProcChosen')!=null)
      {     
        this.player.playerChooseCard(this.data.get('cardProcChosen')); 
        this.data.set('cardProcChosen',null);
      }


      //----------TRIGGER------- inicio da comparação de cartas de processo
      if(this.data.get('compCardProcFlag'))
      {     

        //retirar folha de processo
        this.processSheet.processSheetOff();        
        //retirar cartas de processo
        this.mesa.procCardsDestroy(this.cardsProc);        
        //mudar visor
        this.visor.nextTurn();
        //retirar cartas de peca
        this.mesa.pecaCardsDestroyProj(this.cardsPeca);
        //retira ok dos players


        this.data.set('compCardProcFlag',false);
      }
      
   

    }






}