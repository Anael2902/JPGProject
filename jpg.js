// 1ere façon de faire
//I sélectionner une image 
// let inputFile = document.createElement('input');// affecte à la variable inputFile l'objet d'instance HTMLInputElement <input> en le créant via la méthode document.createElement.
// inputFile.type = 'file';
// inputFile.accept = 'image/*';
// //On affecte la propriété type ainsi que la propriété accept représentant les attributs type et accept de la balise <input>.
// // let container = document.getElementById('fileInputContainer');
// //II) Lié une image 
// inputFile.addEventListener('change', function () {
//     var reader = new FileReader();
//     reader.readAsDataURL(inputFile.files[0]);
//     console.log('Done');
// });
// document.getElementsByTagName('body')[0].appendChild(inputFile)
// insère dans l'objet d'instance HTMLBodyElement (<body>), en passant à la méthode appendChild, l'élément que nous venons de créer.
//document.getElementsByTagName('body') retourne un objet HTMLCollection d'un seul élément puisque la balise <body> est unique dans le DOM 
 //et document.getElementsByTagName('body')[0] retourne donc cet unique élément d'instance plus précise HTMLBodyElement.

     /**
     Sélectionnez une image depuis la bibliothèque de votre appareil et permettez de définir ce qu'il faut faire ensuite.
    paramètre {selectImage~callback} afterSelection - Permet de définir ce qu'il faut faire après la sélection.
    retourne {HTMLInputElement} L'élément HTMLInputElement utilisé pour sélectionner une photo depuis la bibliothèq
     */
     function selectImage(afterSelection) {
        var inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = 'image/*';
        //On affecte la propriété type ainsi que la propriété accept représentant les attributs type et accept de la balise <input>
        inputFile.addEventListener('change', function () { 
            if (afterSelection) {
                /**
                 Que faire après la sélection de l'image.
                 callback selectImage~callback
                  paramètre {HTMLInputElement} inputFile - L'élément HTMLInputElement utilisé pour sélectionner une photo depuis la bibliothèque.
                 */
                afterSelection(inputFile);
            }
        });
        return inputFile;
        //Notre fonction selectImage crée un mécanisme de sélection d'image
        //permettant de définir via un callback ce qu'il faut faire après la sélection. Elle retourne immédiatement l'élément
        //HTMLInputElement qu'elle crée et le passe également en premier argument au callback.
    }

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(
        selectImage(function (inputFile) {
            readImage(inputFile, function (image) {
                reduceImage(image,function (imageResult){
                    console.log(imageResult)
                body.appendChild(imageResult);
                console.log(this.toString());
             });
            });
        })
    );
    //selectImage retourne de manière synchrone via son mot clé return le HTMLInputElement 
    // ce qui permet de le passer à appendChild à la ligne 1.

    //affcher l'image
        /* ... */
    /**
    Convertir une image depuis un appareil en une chaîne de caractères Data URL Base64.
     inputFile - Élément utilisé pour lire l'image source.
     afterConvertion - Permet de définir ce qu'il faut faire après la conversion.
     */
    function readImage(inputFile, afterConvertion) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            var image = document.createElement('img');

            image.addEventListener('load', function(){//ajt d'un adListener, pr passer à la suite une fois l'image chargée 100%
                if (afterConvertion) {
                    /**
                    Que faire après la conversion de l'image.
                    callback readImage~callback
                    image - L'élément HTMLImageElement contenant la source Data URL Base64 correcte.
                     reader - Le FileReader utilisé pour convertir l'image d'origine.
                     */
                    afterConvertion(image, reader);
                }
            })
            image.src = reader.result;
           
        });
        reader.readAsDataURL(inputFile.files[0]);
    }
    //fournir à la fonction de rappel l'image en premier paramètre (HTMLImageElement) et le lecteur de fichiers en second (FileReader)
    //+ probable de manipuler l'image que l'objet qui permet la convertion 
    
    /**
 * Réduit la taille de l'image en conservant le ratio.
 * param  {HTMLImageElement}     imageSource   - Élément utilisé comme image originale.
 * param  {reduceImage~callback} afterResizing - Permet de définir ce qu'il faut faire après le redimensionnement.
 */

//reducemage va fare 2 choses, 1ere give new dimensions than original
//et la 2e créer une miniature de l'original avc un canvas
    const reduceImage = (imageSource, afterResizing) =>{
        let canvas = document.createElement('canvas'),
            imageResult = document.createElement('img'),
            
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
    
    let context = canvas.getContext('2d');
    context.drawImage(imageSource,0,0,width,height);

    imageResult.addEventListener('load',function(){//ajt d'un adListener, pr passer à la suite une fois l'image chargée 100%
  // What do after resizing image.
    // * @callback reduceImage~callback
    // * @param {HTMLImageElement} image  - L'élément `HTMLImageElement` contenant la source Data URL Base64 correcte.
    // * @param {FileReader}       reader - Le `FileReader` utilisé pour convertir l'image d'origine.
    
        afterResizing(imageResult, canvas);
    });
    
    imageResult.src = canvas.toDataURL('image/jpg',0.8)
    
  
    
    afterResizing(imageResult, canvas);
    }

    /**
 * Réduit la taille d'un élément 2D tout en conservant le ratio basé sur la largeur et la hauteur maximales.
 * param  {number}                       width         - Largeur originale de l'élément.
 * param  {number}                       height        - Hauteur originale de l'élément.
 * param  {number}                       maxWidth      - Largeur maximale de l'élément de sortie.
 * param  {number}                       maxHeight     - Hauteur maximale de l'élément de sortie.
 * &    param  {resizeWithSameRatio~callback} afterResizing - Permet de définir ce qu'il faut faire après le redimensionnement.
 */
