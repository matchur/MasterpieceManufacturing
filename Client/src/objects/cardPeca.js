import Phaser from "phaser";
export default class CardPeca 
{
    constructor(scene,iO)
    {        
        let clickFlag;//flag  
        var iOrdem;
        var index = iO;
        let imageWidth = 480;
        let imageHeight = 720;


        //funções existentes dentro da classe 
        this.render = (x,y,sprite_card,scene,sprite_shortcut) =>
        {         
            //estaticos
            const ox = x,oy = y;
            
            iOrdem = 0;

            //variaveis
            //FLIP
            var flipFlag = false;
            var timeFlip = 150;
            var scale = 0.5;

            //Click
            var clickFlag;
            //Choose
            var chooseFlag;

            //Status
            var inDeck = true;

            let shortcut;
            let card = scene.add.sprite(x,y,sprite_card).setScale(scale,scale).setInteractive();
            
            //handCursor
            let handCursor = scene.add.sprite(x,y-100,'handCursor1').setScale(0,1).setInteractive();
            let cursorFlag;

            var style = { font: "13px Arial", fill: "#000000",align: "center",
             wordWrap: true};
            var text;
            //let objKeyF= scene.input.keyboard.addKey('F');
            let objKeyE= scene.input.keyboard.addKey('E');
            
             
            cursorFlag = false;
            chooseFlag = false;
            clickFlag = false;

            scene.input.setDraggable(card);
            objKeyE.on('down', function() 
            {
                if(scene.data.get('cardPecaTable')>3 && !cursorFlag && clickFlag && !inDeck)
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
                             
                            }
                        });
               


                    timeline.play(); 
                       
                }
            });
            
            
            card.on('drag',function(gameObject,dragX,dragY)
            {
                    if(inDeck)
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
                if(inDeck && clickFlag)
                {
                    style = { font: "13px Arial", fill: "#000000",align: "center",
                    wordWrap: true}
                    shortcut = scene.add.sprite(card.x,card.y-220,sprite_shortcut).setScale(0.75,0.75).setInteractive();
                    text = scene.add.text(card.x-43, card.y-240, "Baralho\nQuantidade:"+scene.data.get('cardPecaDeck'), style);



                }
                if(!inDeck && clickFlag)
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

 /*
            card.on('pointerdown', function () 
            {       
                if(scene.data.get('cardPecaTable') > 3)
                {
                    
                }
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







                if(scene.input.mousePointer.x < 390 || 
                    scene.input.mousePointer.y < 90 ||
                  scene.input.mousePointer.x > 1500 || 
                   scene.input.mousePointer.y > 610 ||
                   scene.data.get('cardPecaTable') > 3 && iOrdem === 0)//fora da mesa
                {
                    
                    //se a carta ta vindo da mesa, volta valor na mesa
                    if(!inDeck)
                    {
                        scene.data.set('cardPecaTable',scene.data.get('cardPecaTable')-1);
                        scene.data.set('cardPecaDeck',scene.data.get('cardPecaDeck')+1);                     
                    }                                

                    timeline.play(); 

                    iOrdem = 0;
                    inDeck = true;
                    card.x = ox;
                    card.y = oy;
                }//fora da mesa
                else if(scene.input.mousePointer.x > 1190 && 
                    scene.input.mousePointer.y > 100 &&
                  scene.input.mousePointer.x < 1515 && 
                   scene.input.mousePointer.y < 600 )
                {
                    //se a carta ta vindo da mesa, volta valor na mesa
                    if(!inDeck)
                    {
                        scene.data.set('cardPecaTable',scene.data.get('cardPecaTable')-1);
                        scene.data.set('cardPecaDeck',scene.data.get('cardPecaDeck')+1);
                    }
                    timeline.play();
                    iOrdem = 0;
                    inDeck = true;
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
                        inDeck = false;
                        
                    }
                    
                    
                }




                 
            });


            return this;         
            
                    
    
        }
    }

    





}