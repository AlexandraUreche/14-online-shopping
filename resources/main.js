$(function () {

    const titleProduct = $('.principal-title');
    const priceProduct = $('.details-image-wrapper .price-wrapper');
    const compositionProduct = $('.composition');
    const countryProduct = $('.country');
    const careInstuctProduct = $('.careInstructions-wrapper p');
    const menuItems = $('header .menu-wrapper nav a:not(.shoppingBag)');
    const shoppedProducts = $('.shoppedProducts');
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
        if (location.pathname.split('/').slice(-1)[0] =='index.html') {
        for (let i = 0; i < products[currentProduct].length; i++) {
            let productObj = products[currentProduct][i];
            productHMTL = getproductHTML(i, productObj);
            $('.gallery-wrapper').append(productHMTL);
        }
        }
    }

    addProduct(menuItems.data('product'));
    
    menuItems.click(function (e) {
        if ($(this).data('product')) {
            e.preventDefault();
        }
        menuItems.removeClass('selected');
       // $('.shoppingBag').removeClass('selected');
       // $('.shoppingBag-wrapper').addClass("hidden");
        $(this).addClass('selected');
        $('.gallery-wrapper').empty();
        addProduct($(this).data('product'));

    });
    $('.gallery-wrapper').delegate('.image-wrapper', "click", function () {
        let index = $(this).data('index');
        let prodIndex = products.coats[index];
        switch ($('header nav .selected').data('product')) {
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
                prodIndex = products.coats[index];
                break;
        }
        $("#imgBig").css({ backgroundImage: "url(assets/" + $(this).data('img') + ")" })
        titleProduct.text(prodIndex.name);
        priceProduct.text(prodIndex.currency + prodIndex.price);
        compositionProduct.text(prodIndex.composition);
        countryProduct.text(prodIndex.country);
        careInstuctProduct.text(prodIndex.care);
         $("#overlay").show();
        buyedProduct = $(this).data('id');
        $('.totals').hide();
        $('.checkout-btn').hide();
       $('.addToCart-wrapper button').click(function (e) {

            let prodSize = $('.btnSizes-wrapper input').val();
            productCarttHMTL = getShoppedProduct(prodSize, prodIndex);
            $('.shoppedProducts').append(productCarttHMTL);
            alert("This product was added in your shopping bag!");
            $('.totals').show();
            $('.checkout-btn').show();
        });

    });
    const closeOverlay = $('.close-overlay-wrapper');
    closeOverlay.click(function () {
        $("#overlay").hide();
    });

    const seeShippingBag = $('.shoppingBag');
    const seeshoppingBagWrapper = $('.shoppingBag-wrapper');
   seeShippingBag.click(function (e) {
      
        recalculateCart()


    });


    let taxRate = 0.05;
    let shippingRate = 15.00;
    const fadeTime = 100;

    function recalculateCart() {
        let subtotal = 0;

        $('.product').each(function () {
            subtotal += parseFloat($('.total-price').html());
        });

        let tax = subtotal * taxRate;
        let shipping = (subtotal > 0 ? shippingRate : 0);
        let total = subtotal + tax + shipping;

        $('.totals-value').fadeOut(fadeTime, function () {
            $('#cart-subtotal').html(subtotal.toFixed(2));
            $('#cart-tax').html(tax.toFixed(2));
            $('#cart-shipping').html(shipping.toFixed(2));
            $('#cart-total').html(total.toFixed(2));
            if (total == 0) {
                $('.checkout').fadeOut(fadeTime);
            } else {
                $('.checkout').fadeIn(fadeTime);
            }
            $('.totals-value').fadeIn(fadeTime);
        });
    }
    function updateQuantity(quantityInput) {
        let price = parseFloat($('.product .image-wrapper').data("price"));
        let quantity = $(quantityInput).val();
        let linePrice = price * quantity;

        $('.product-line-price .total-price').each(function () {
            $(this).fadeOut(fadeTime, function () {
                $(this).html(linePrice.toFixed(2));
                recalculateCart();
                $(this).fadeIn(fadeTime);
            });
        });
    }

    function removeItem(removeButton) {
        let productRow = $(removeButton).parent().parent();
        productRow.slideUp(fadeTime, function () {
            productRow.remove();
            recalculateCart();
        });
    }

   $('.product-quantity input').change(function() {
        console.log('quantity changed');
        updateQuantity(this);
    });


    $('.product-removal button').click(function () {
        console.log('remove button clicked');
        removeItem(this);
    });

});