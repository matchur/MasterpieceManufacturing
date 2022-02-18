import Phaser from "phaser";
export default class CardProc 
{
    constructor(scene)
    {        
 
        let clickFlag;//flag
        

        //peça (480,720)
        //processo (381,528)
        
        let imageWidth = 381;
        let imageHeight = 528;


        //funções existentes dentro da classe 
        this.render = (x,y,sprite_card,scene,sprite_shortcut,index) =>
        {        
            
            //estaticos
            const ox = x,oy = y;
            this.indexCard = index;
            //variaveis
            //FLIP
            var flipFlag = false;
            var timeFlip = 150;
            var scale = 0.5;
            var self = this;

            this.isSelected = false; //se foi escolhido para ser a carta para mandar para o gerente
            this.sprite_backCard = sprite_card;
            this.isChoose = false;
            this.indexInArray = 0;
            //Click
            var clickFlag;

            let shortcut;
            this.card = scene.add.sprite(x,y,"processo"+this.indexCard).setScale(scale,scale).setInteractive();
            var style = { font: "15px Arial", fill: "#000000",align: "center",
             wordWrap: true};
            var text;
            let objKeyF= scene.input.keyboard.addKey('F');
            

             
            

            clickFlag = false;

            scene.input.setDraggable(this.card);
            //interrupções

            objKeyF.on('down', function() 
            {
                if(!flipFlag && clickFlag && !self.isSelected)
                {
                    flipFlag = true;
                    const timeline = scene.tweens.createTimeline({
                        onComplete: () =>
                        {
                            timeline.destroy()
                        }
                    });
            
                    timeline.add(
                        {
                            targets: self.card,
                            scale: scale+0.05,
                            duration: timeFlip
                        })
            
                    timeline.add(
                        {
                            targets: self.card,
                            scaleX: 0,
                            duration:timeFlip,
                            delay: 200,
                            onComplete: () => 
                            {
                                if(self.card.texture.key == "processo"+self.indexCard)
                                {
                                    self.card.setTexture(sprite_card);
                                }                                
                                else
                                {
                                    self.card.setTexture("processo"+self.indexCard);
                                }
                                
                            }
                        })
            
                    timeline.add({
                        targets:self.card,
                        scaleX: scale+0.05,
                        duration: timeFlip
                    })
            
                    timeline.add(
                        {
                            targets: self.card,
                            scale:scale,
                            duration: timeFlip,
                            onComplete: () => 
                            {
                                flipFlag = false;
                            }
                        }
                    )   
                    timeline.play();                 
                }

            }
            );

   

            this.card.on('drag',function(gameObject,dragX,dragY)
            {
                if(!self.isSelected)
                {
                    shortcut.x = dragX;
                    shortcut.y = dragY-200;
                    text.x = dragX-32;
                    text.y = dragY-220;
                    self.card.x = dragX;
                    self.card.y = dragY;
                }              
            });

            this.card.on('pointerover', function () 
            {
                if(!self.isSelected)
                {                    
                    if(shortcut != undefined)
                    {
                        shortcut.destroy();
                        text.destroy();
                    }                    
                    clickFlag = true;
                    shortcut = scene.add.sprite(self.card.x,self.card.y-200,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                    text = scene.add.text(self.card.x-32, self.card.y-220, "Atalhos\n[F] - Girar", style);
                }    
            });

            this.card.on('pointerout', function () 
            {   
                if(!self.isSelected)
                {
                    clickFlag = false;
                    shortcut.destroy();
                    text.destroy();
                }                               
            });

 
            /*card.on('pointerdown', function () 
            {       
                card.x = ox;
                card.y = oy;                    
            });*/

            this.card.on('dragend',function(gameObject,dragX,dragY)
            {  
                //inicial = 380,80
                //final = 1520,620
               if(!self.isSelected)
               {
                    const timeline = scene.tweens.createTimeline({
                    onComplete: () =>
                    {
                        timeline.destroy()
                    }
                    });
                 
                    timeline.add(
                    {
                        targets: self.card,
                        x:self.card.x,
                        y:self.card.y,
                        duration:1
                    })
          
                    timeline.add(
                    {
                        targets: self.card,
                        ease: 'Power1',
                        x:ox,
                        y:oy,
                        duration: 300,
                        onComplete: () => 
                        {
                            self.isChoose = false;
    
                        }
                    })
    
                    if(scene.input.mousePointer.x < 390 || 
                        scene.input.mousePointer.y < 90 ||
                      scene.input.mousePointer.x > 1500 || 
                       scene.input.mousePointer.y > 610 )      
                    {                    
                        if(self.isChoose)
                        {   
                            var countAux = scene.data.get('cardProcCount');
                            countAux--;  
                            console.log("Carta Processo"+index+" está na MÃO!! isChoose:"+self.isChoose);                        
                            scene.data.set('cardProcCount',countAux);
                        }
    
                       timeline.play();
                    } 
                    else
                    {
                        if(scene.data.get('cardProcCount')<1 && !self.isChoose)
                        {   
    
                            var countAux = scene.data.get('cardProcCount');
                            countAux++;
                            self.isChoose = true;
                            console.log("Carta Processo"+index+" está selecionada!! isChoose:"+self.isChoose);
                            scene.data.set('cardProcCount',countAux);
                            
                        }
                        if(!self.isChoose)
                        {
                            timeline.play();
                        }
                        
                        
                    }
               }

                
            });


   

            return this;      
        }

        this.setIsSelected = (valueFlag) =>
        {
            this.isSelected = valueFlag;//true or false
        }

        this.getIsSelected = () =>
        {
            return this.isSelected;
        }
        
        this.isChosen = () =>
        {
            return this.isChoose;
        }

        this.procCardDestroy = () =>
        {
            this.card.destroy();
        }
        
        this.getIndexCard = () =>
        {
            return this.indexCard;
        }

        this.setChoose = (boolQ) =>
        {
             isChoose = boolQ;
        }
     
        this.flipInPlaymat = (indexFlip) =>
        {
            var self = this;
            var timeFlip = 150;
            var scale = 0.5; 
            const timeline = scene.tweens.createTimeline({
                onComplete: () =>
                {
                    timeline.destroy()
                }
                });

                //se move até o lugar 
                timeline.add(
                    {
                        targets: self.card,
                        x: 510+(200*indexFlip),
                        y: 480,
                        duration: timeFlip
                    })
                //animação flip    
                    timeline.add(
                        {
                            targets: self.card,
                            scaleX: 0,
                            duration:timeFlip,
                            delay: 200,
                            onComplete: () => 
                            {
                                if(self.card.texture.key == "processo"+this.indexCard)
                                   self.card.setTexture(self.sprite_backCard);
                            }
                        })

                timeline.add(
                    {
                        targets: self.card,
                        scaleX: scale,
                        duration: timeFlip
                    })
            //diminui de tamanho
                         
        
                timeline.add({
                    targets:self.card,
                    scale: scale-0.12,
                    duration: timeFlip
                })
        

                timeline.play(); 
        };

    }

    





}