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
        this.render = (x,y,sprite_card,scene,sprite_shortcut) =>
        {         
            //estaticos
            const ox = x,oy = y;

            //variaveis
            //FLIP
            var flipFlag = false;
            var timeFlip = 150;
            var scale = 0.5;

            //Click
            var clickFlag;

            let shortcut;
            let card = scene.add.sprite(x,y,sprite_card).setScale(scale,scale).setInteractive();
            var style = { font: "15px Arial", fill: "#000000",align: "center",
             wordWrap: true};
            var text;
            let objKeyF= scene.input.keyboard.addKey('F');
            

             
            

            clickFlag = false;

            scene.input.setDraggable(card);
            //interrupções

            objKeyF.on('down', function() 
            {
                if(!flipFlag && clickFlag)
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
                                if(card.texture.key == 'card_frenteProc')
                                card.setTexture(sprite_card);
                                else
                                card.setTexture('card_frenteProc');
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

   

            card.on('drag',function(gameObject,dragX,dragY)
            {
                shortcut.x = dragX;
                shortcut.y = dragY-200;
                text.x = dragX-32;
                text.y = dragY-220;
                card.x = dragX;
                card.y = dragY;
            });

            card.on('pointerover', function () 
            {
                if(shortcut != undefined)
                {
                    shortcut.destroy();
                    text.destroy();
                }
                
                clickFlag = true;
                shortcut = scene.add.sprite(card.x,card.y-200,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                text = scene.add.text(card.x-32, card.y-220, "Atalhos\n[F] - Girar", style);

            });

            card.on('pointerout', function () 
            {   
                clickFlag = false;
                  shortcut.destroy();
                  text.destroy();
            });

 
            /*card.on('pointerdown', function () 
            {       
                card.x = ox;
                card.y = oy;                    
            });*/

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

                timeline.play();
            });


            return this;         
            
                    
    
        }
    }

    





}