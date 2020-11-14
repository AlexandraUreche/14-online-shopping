$(function () {

    const titleProduct = $('.principal-title');
    const priceProduct = $('.details-image-wrapper .price-wrapper');
    const compositionProduct = $('.composition');
    const countryProduct = $('.country');
    const careInstuctProduct = $('.careInstructions-wrapper p');
    const menuItems = $('header .menu-wrapper').find('a');
    const pagesWrapper = $('div[class ^= "content"]');

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

    menuItems.click(function (e) {
        if (!$(this).data('content')) {
            e.preventDefault();
        }
        let viewPage = 0;
        menuItems.removeClass('selected');
        pagesWrapper.addClass('hidden');
        let pageClass = $(this).attr('data-content');
        $('.' + pageClass).removeClass('hidden');
        let galleryWrapperPage = $('.' + pageClass + ' .gallery-wrapper');
        $(this).addClass('selected');
        $('.categories-wrapper').removeClass('hidden');
        if ($(this).data('count')) {
            $(this).data('count', $(this).data('count') + 1);
        }
        else {
            $(this).data('count', 1);
        }
        let currentProduct = $(this).data('product');
        if ($(this).data('count') === 1) {
            for (let i = 0; i < products[currentProduct].length; i++) {
                let productObj = products[currentProduct][i];
                productHMTL = getproductHTML(i, productObj);
                galleryWrapperPage.append(productHMTL);

            }
        }
        $('.gallery-wrapper').each(function () {
            overlayFunct($(this));
        });

        function overlayFunct($currentGallery) {
            $currentGallery.delegate('.image-wrapper', "click", function () {
                let index = $(this).data('index');
                let prodIndex;
                switch (currentProduct) {
                    case 'coats':
                        prodIndex = products.coats[index];
                        break;
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
        }
    });

    const closeOverlay = $('.close-overlay-wrapper');
    closeOverlay.click(function () {
        $("#overlay").hide();
    });

});