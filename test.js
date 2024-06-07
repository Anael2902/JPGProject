const reduceImage = (imageSource, afterResizing) =>{
    let canvas = document.createElement('canvas'),
        imageResult = document.createElement('img')
        context,
        maxWidth = 800,
        maxHeight= 600,
        width = imageSource.width,
        height = imageSource.height;

    if (width>height){
    if (width>maxWidth){
        height*= maxWidth/width;
        width=maxWidth;
    } 
}else{
    if (height > maxHeight){
        width*= maxHeight/height;
        height=maxHeight;
    }

}

canvas.width = width;
canvas.height = height;

context = canvas.getContext('2d');
context.drawImage(imageSource,0,0,width,height);

imageResult.src = canvas.toDataURL('image/jpg',0.8)

// What do after resizing image.
// * @callback reduceImage~callback
// * @param {HTMLImageElement} image  - L'élément `HTMLImageElement` contenant la source Data URL Base64 correcte.
// * @param {FileReader}       reader - Le `FileReader` utilisé pour convertir l'image d'origine.

// */
afterResizing(imageResult, canvas);
}