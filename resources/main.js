$(function(){
    
    const galleryWrapper = $('.gallery-wrapper');
    //const coatsArr=products[1];
   
    getpropertyHTML = function (pictureObj) {
        return `<div class="image-container">
        <div class="image-wrapper"data-img=${pictureObj.imgUrl} data-id=${pictureObj.id} style="background-image: url(assets/coats/${pictureObj.imgUrl})">
        </div>
        <div class="image-details"> 
            <div class="image_title">${pictureObj.name}</div>
            <div class="price-wrapper">${pictureObj.currency} ${pictureObj.price}</div>
        </div>
        `;
    };
    console.log(products['coats']);
    for(let i = 0; i < products['coats'].length; i++) {
        let productObj = products['coats'][i];
        productHMTL = getpropertyHTML(productObj);
        console.log(productHMTL);
        galleryWrapper.append(productHMTL);
    }

    $(".image-wrapper").click(function(){
        $("#imgBig").css({backgroundImage: "url(assets/coats/" + $(this).data('img') + ")"})
        $("#overlay").show();
        $("#overlayContent").show();
    });
    const closeOverlay=$('.close-overlay-wrapper');
    closeOverlay.click(function(){
        $("#overlay").hide();
        $("#overlayContent").hide();
    });

    
    
});