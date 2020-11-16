$(function () {

    const titleProduct = $('.principal-title');
    const priceProduct = $('.details-image-wrapper .price-wrapper');
    const compositionProduct = $('.composition');
    const countryProduct = $('.country');
    const careInstuctProduct = $('.careInstructions-wrapper p');
    const menuItems = $('header .menu-wrapper nav a');
    getproductHTML = function (index, productObj) {
        return `<div class="image-container">
        <div class="image-wrapper" data-index=${index} data-img=${productObj.imgUrl} data-id=${productObj.id} style="background-image: url(assets/${productObj.imgUrl})">
        </div>
        <div class="image-details"> 
            <div class="image_title">${productObj.name}</div>
            <div class="price-wrapper">${productObj.currency} ${productObj.price}</div>
        </div>
        `;
    };

    function addProduct(currentProduct) {
        for (let i = 0; i < products[currentProduct].length; i++) {
            let productObj = products[currentProduct][i];
            productHMTL = getproductHTML(i, productObj);
            $('.gallery-wrapper').append(productHMTL);

        }
    }
    addProduct(menuItems.data('product'));

    menuItems.click(function (e) {
        if ($(this).data('product')) {
            e.preventDefault();
        }
        menuItems.removeClass('selected');
        $(this).addClass('selected');
        $('.gallery-wrapper').empty();
        addProduct($(this).data('product'));

    });
    $('.gallery-wrapper').delegate('.image-wrapper', "click", function () {
        let index = $(this).data('index');
        let prodIndex = products.coats[index];
        switch ($('a').data('product')) {
            case 'dresses':
                prodIndex = products.dresses[index];
                break;
            case 'jersey':
                prodIndex = products.jersey[index];
                break;
            case 'pants':
                prodIndex = products.pants[index];
                break;
            default:
                prodIndex =products.coats[index];
                break;
        }
        $("#imgBig").css({ backgroundImage: "url(assets/" + $(this).data('img') + ")" })
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