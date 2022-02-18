import Phaser from "phaser";
export default class CardPeca 
{
    constructor(scene)
    {        
        let clickFlag;//flag  
        var iOrdem;
        var index;
        let imageWidth = 480;
        let imageHeight = 720;
        let scenePeca;
        let spr_card;
        

       
        //Choose
        var isChoose;
        //Status
        var inDeck;



        this.setIndex = (i) =>
        {
            this.index = i;
        }
        this.getIndex = () =>
        {
            return this.index;
        }

        //funções existentes dentro da classe 
        this.render = (x,y,sprite_card,scene,sprite_shortcut,role) =>
        {         
            this.scenePeca = scene;
            //estaticos
            const ox = x,oy = y;
            var self = this;
            iOrdem = 0;

            //variaveis
            //FLIP
            var flipFlag = false;
            var timeFlip = 150;
            var scale = 0.5;
            var clickFlag;
           
            this.btnExpand = null;
            this.gigaCard = null;

            //Status
            this.inDeck = true;

            let shortcut;
            let card = scene.add.sprite(x,y,sprite_card).setScale(scale,scale).setInteractive();
            this.spr_card = card;
            //handCursor
            let handCursor = scene.add.sprite(x,y-100,'handCursor1').setScale(0,1).setInteractive();
            let cursorFlag;

            var style = { font: "13px Arial", fill: "#000000",align: "center",
             wordWrap: true};
            var text;
            //let objKeyF= scene.input.keyboard.addKey('F');
            let objKeyE= scene.input.keyboard.addKey('E');
            
             
            cursorFlag = false;
            this.isChoose = false;
            clickFlag = false;

            if(role == 'g')
            {
                scene.input.setDraggable(card);
                objKeyE.on('down', function() 
                {
                    if(scene.data.get('cardPecaTable')>3 && !cursorFlag && clickFlag && !self.inDeck)
                    {
                        const timeline = scene.tweens.createTimeline({
                            onComplete: () =>
                            {
                                timeline.destroy()
                            }
                        });
    
                        timeline.add(
                            {
                                targets: handCursor,
                                scaleX:1,
                                duration: 1,
                                onComplete: ()=>{
                                    cursorFlag = true;
                                    
                                }
                            });
    
                        for(var i = 0;i<3;i++)
                        {
                            timeline.add(
                                {
                                    targets: handCursor,
                                    scaleX:0,
                                    y: handCursor.y+10,
                                    duration: 500,
                                    onComplete: ()=>
                                    {
                                        if(handCursor.texture.key == 'handCursor1')
                                        handCursor.setTexture('handCursor2');
                                        else
                                        handCursor.setTexture('handCursor1');
                                    }   
                                });
        
                                timeline.add(
                                    {
                                        targets: handCursor,
                                        scaleX:1,
                                        y: handCursor.y-10,
                                        duration: 500,
     
    
                                    });
                        
                        }
                        timeline.add(
                            {
                                targets: handCursor,
                                scaleX:0,
                                x:card.x,
                                y:card.y-100,
                                duration: 1,
                                onComplete: ()=>
                                {
                                           scene.data.set('cursorHandFlag',true);    
                                           self.isChoose = true;                                  
                                 
                                }
                            });
                   
    
    
                        timeline.play(); 
                           
                    }
                });
                
                
                card.on('drag',function(gameObject,dragX,dragY)
                {
                        if(self.inDeck)
                        {
                            text.destroy();
                            shortcut.destroy();
                        }
                        else
                        {
                            shortcut.x = dragX;
                            shortcut.y = dragY-220;
                            if(scene.data.get('cardPecaTable'))
                            {
                                text.x = dragX-40;
                                text.y = dragY-240;
                            }
                            else
                            {
                                text.x = dragX-23;
                                text.y = dragY-230;
                            }
                            
                        }
                        
                        card.x = dragX;
                        card.y = dragY;   
                        handCursor.x = dragX;
                        handCursor.y = dragY-100;       
                });
    
                card.on('pointerover', function () 
                {
                    if(shortcut != undefined)
                    {
                        shortcut.destroy();
                        text.destroy();
                    }
                    
                    clickFlag = true;
                    if(self.inDeck && clickFlag)
                    {
                        style = { font: "13px Arial", fill: "#000000",align: "center",
                        wordWrap: true}
                        shortcut = scene.add.sprite(card.x,card.y-220,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                        text = scene.add.text(card.x-43, card.y-240, "Baralho\nQuantidade:"+scene.data.get('cardPecaDeck'), style);
    
    
    
                    }
                    if(!self.inDeck && clickFlag)
                    {                  
                        if(scene.data.get('cardPecaTable')>3)
                        {
                            style = { font: "12px Arial", fill: "#000000",align: "center",
                            wordWrap: true}
                            shortcut = scene.add.sprite(card.x,card.y-220,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                            text =  scene.add.text(card.x-40,card.y-240, "Pressione E\npara escolher\nessa carta", style);
                        }               
                    }
                    
                   
                    // console.log(scene.data); 
    
                });
    
                card.on('pointerout', function () 
                {   
                    
                    clickFlag = false;
                      shortcut.destroy();
                      text.destroy();
                });
    
    
    
                card.on('dragend',function(gameObject,dragX,dragY)
                {  
                    const timeline = scene.tweens.createTimeline({
                        onComplete: () =>
                        {
                            timeline.destroy()
                        }
                    });
                            
                    timeline.add(
                        {
                            targets: card,
                            x:card.x,
                            y:card.y,
                            duration:1
                        })
              
                    timeline.add(
                        {
                            targets: card,
                            ease: 'Power1',
                            x:ox,
                            y:oy,
                            duration: 300,
                        })
    
                    if(scene.input.mousePointer.x < 390 || 
                        scene.input.mousePointer.y < 90 ||
                      scene.input.mousePointer.x > 1500 || 
                       scene.input.mousePointer.y > 610 ||
                       scene.data.get('cardPecaTable') > 3 && iOrdem === 0)//fora da mesa
                    {
                        
                        //se a carta ta vindo da mesa, volta valor na mesa
                        if(!self.inDeck)
                        {
                            scene.data.set('cardPecaTable',scene.data.get('cardPecaTable')-1);
                            scene.data.set('cardPecaDeck',scene.data.get('cardPecaDeck')+1);                     
                        }                                
    
                        timeline.play(); 
    
                        iOrdem = 0;
                        self.inDeck = true;
                        card.x = ox;
                        card.y = oy;
                    }//fora da mesa
                    else if(scene.input.mousePointer.x > 1190 && 
                        scene.input.mousePointer.y > 100 &&
                      scene.input.mousePointer.x < 1515 && 
                       scene.input.mousePointer.y < 600 )
                    {
                        //se a carta ta vindo da mesa, volta valor na mesa
                        if(!self.inDeck)
                        {
                            scene.data.set('cardPecaTable',scene.data.get('cardPecaTable')-1);
                            scene.data.set('cardPecaDeck',scene.data.get('cardPecaDeck')+1);
                        }
                        timeline.play();
                        iOrdem = 0;
                        self.inDeck = true;
                        card.x = ox;
                        card.y = oy;
                    }//perto do baralho
                    else
                    {
                        
                        if(iOrdem === 0)
                        {
                            iOrdem = scene.data.get('cardPecaTable');
                            scene.data.set('cardPecaTable',scene.data.get('cardPecaTable')+1);
                            scene.data.set('cardPecaDeck',scene.data.get('cardPecaDeck')-1);
                            if(iOrdem == 3)
                            {
                            style = { font: "12px Arial", fill: "#000000",align: "center",
                            wordWrap: true}
                            shortcut = scene.add.sprite(card.x,card.y-220,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                            text =  scene.add.text(card.x-40,card.y-240, "Pressione E\npara escolher\nessa carta", style);
                            }   
                            self.inDeck = false;
                            
                        }   
                    }
                });
            }
            
        }

        this.cardPecaDestroy = () =>
        {
            if(this.spr_card!=null)
            this.spr_card.destroy();

            if(this.btnExpand!=null)
            this.btnExpand.destroy();
            
            if(this.gigaCard!=null)
            this.gigaCard.destroy();
        }
        

        this.printObj = () =>
        {
            this.scenePeca.add.sprite(x,y,sprite_card).setScale(this.scale,this.scale).setInteractive();
        }

        this.movCard = (newX,newY) =>
        {
            this.spr_card.x = newX;
            this.spr_card.y = newY;
        }


        this.notSelected = () =>
        {
            this.spr_card.tint = 0xf05e54; 
        }
        
        this.flipFace = () =>
        {
            var self = this;
            var scaleAprox = 0.5;
            var scale = this.spr_card.scale;
            var timeFlip = 150;
          
            var card = this.spr_card;
            var cardNumber = this.index;
            const timeline = this.scenePeca.tweens.createTimeline({
                onComplete: () =>
                {
                    timeline.destroy()
                }
            });
    
            timeline.add(
                {
                    targets: card,
                    scale: scale+0.05,
                    duration: timeFlip
                })
    
            timeline.add(
                {
                    targets: card,
                    scaleX: 0,
                    duration:timeFlip,
                    delay: 200,
                    onComplete: () => 
                    {
                        if(card.texture.key == 'cardPeca')
                        card.setTexture("peca"+cardNumber);
                        else
                        card.setTexture('cardPeca');
                    }
                })
    
            timeline.add({
                targets:card,
                scaleX: scale+0.05,
                duration: timeFlip
            })
    
            timeline.add(
                {
                    targets: card,
                    scale:scale-0.35,
                    duration: timeFlip,
                    onComplete: () => 
                    {
                        self.btnExpand = self.scenePeca.add.sprite(card.x-98,card.y-55,"btnExpand").setScale(0.12,0.12).setInteractive()
                        card.on('pointerover', function () 
                        {
                            card.setVisible(false);
                            self.btnExpand.setVisible(false);
                            self.gigaCard = self.scenePeca.add.sprite(card.x,card.y+20,"peca"+cardNumber).setScale(0.5,0.5).setInteractive();
                            self.gigaCard.on('pointerout', function () 
                            {   
                                card.setVisible(true);
                                self.btnExpand.setVisible(true);
                                self.gigaCard.destroy();
                            });
                        });  
                        
                    }
                  }
            )   
            timeline.play(); 

        }

    }

    





}