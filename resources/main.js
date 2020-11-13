$(function () {

    const galleryWrapper = $('.gallery-wrapper');
    const titleProduct = $('.principal-title');
    const priceProduct = $('.details-image-wrapper .price-wrapper');
    const compositionProduct = $('.composition');
    const countryProduct = $('.country');
    const careInstuctProduct=$('.careInstructions-wrapper p');
    const menuItems = $('header .menu-wrapper').find('a');
    const pagesWrapper = $('div[class ^= "content"]');


    getproductHTML = function (index, productObj) {
        return `<div class="image-container">
        <div class="image-wrapper" data-index=${index} data-img=${productObj.imgUrl} data-id=${productObj.id} style="background-image: url(assets/coats/${productObj.imgUrl})">
        </div>
        <div class="image-details"> 
            <div class="image_title">${productObj.name}</div>
            <div class="price-wrapper">${productObj.currency} ${productObj.price}</div>
        </div>
        `;
    };
    for (let i = 0; i < products['coats'].length; i++) {
        let productObj = products['coats'][i];
        console.log(productObj);
        productHMTL = getproductHTML(i, productObj);
        galleryWrapper.append(productHMTL);
    }

    menuItems.click(function (e) {
        if (!$(this).data('content')) {
            e.preventDefault();
        }
        menuItems.removeClass('selected');
        pagesWrapper.addClass('hidden');
        $(this).addClass('selected');
        let pageClass = $(this).attr('data-content');
        $('.' + pageClass).removeClass('hidden');
    });


    galleryWrapper.delegate('.image-wrapper', "click", function () {
        let index = $(this).data('index');
        const prodIndex = products.coats[index];
        $("#imgBig").css({ backgroundImage: "url(assets/coats/" + $(this).data('img') + ")" })
        titleProduct.text(prodIndex.name);
        priceProduct.text(prodIndex.currency + prodIndex.price);
        compositionProduct.text(prodIndex.composition);
        countryProduct.text(prodIndex.country);
        careInstuctProduct.text(prodIndex.care);
        $("#overlay").show();

    });
    const closeOverlay = $('.close-overlay-wrapper');
    closeOverlay.click(function () {
        $("#overlay").hide();
    });

});