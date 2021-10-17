// Define our labelmap
const labelMap = {
    1:{name:'Apple', color:'red'},
    2:{name:'Pasta', color:'yellow'},
    3:{name:'Onion', color:'lime'},
    4:{name:'Chocolate', color:'blue'},
}

export var label = 
{
    id: '',
    score: 0,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    count: 1000
}

export const drawRect = (imgWidth, imgHeight, ctx) => {
    if(label.count > 66) return;

    // Set styling
    ctx.strokeStyle = labelMap[label.id]['color']
    ctx.lineWidth = 10
    ctx.fillStyle = 'white'
    ctx.font = '30px Arial'         
    
    // DRAW!!
    ctx.beginPath()
    ctx.fillText(labelMap[label.id]['name'] + ' - ' + label.score, label.x*imgWidth, label.y*imgHeight-10)
    ctx.rect(label.x*imgWidth, label.y*imgHeight, label.width*imgWidth/2, label.height*imgHeight/2);
    ctx.stroke()
    label.count ++;
};


// Define a drawing function
export const updateRect = (boxes, classes, scores, threshold)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            //console.log("class = ", text, i, classes[i], classes)
            label.id = text;
            label.x = x;
            label.y = y;
            label.width = width;
            label.height = height;
            label.score = Math.round(scores[i]*100)/100;
            label.count = 0;
            break;
/*            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/2);
            ctx.stroke()
*/            
        }
    }
    // drawOneRect(imgWidth, imgHeight, ctx)
}