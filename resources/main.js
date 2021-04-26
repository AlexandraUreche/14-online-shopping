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
    // eu nu as adauga dinamic toata pagina asta. pagina este statica, doar continutul efectiv e dinamic, deci poti sa ai pagina deja creata si apoi cu diferite selectii sa iti populezi continutul de care ai nevoie
    getShoppedProduct = function (prodSize, buyedproductObj) {
        return `<div class="product">
        <div class="image-container">
        <div class="image-wrapper" data-img=${buyedproductObj.imgUrl} data-id=${buyedproductObj.id} style="background-image: url(assets/${buyedproductObj.imgUrl})">
        </div>
        <div class="image-details"> 
            <div class="image_title">${buyedproductObj.name}</div>
            <div class="price-wrapper"> ${buyedproductObj.price}</div>
        </div>
        </div>
        <div class="product-details">Size
             <div class="product-size">${prodSize}</div>
        </div>
        <div class="product-quantity">Quantity
             <input type="number" value="1" min="1">
        </div>
       <div class="product-removal">
            <button class="remove-product">Remove</button>
        </div>
        <div class="product-line-price">Total
             <div class="total-price">${buyedproductObj.price}</div>
        </div>
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
        $('.shoppingBag').removeClass('selected');
        $('.shoppingBag-wrapper').addClass("hidden");
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
            recalculateCart()
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
        if ($(this).data('content')) {
            e.preventDefault();
        }
        menuItems.removeClass('selected');
        $(this).addClass('selected');
        $('.gallery-wrapper').empty();
        seeshoppingBagWrapper.removeClass('hidden');

    });


    let taxRate = 0.05;
    let shippingRate = 15.00;
    const fadeTime = 100;

    function recalculateCart() {
        let subtotal = 0;

        $('.product').each(function () {
            subtotal += parseFloat($('.total-price').text());
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
        // nu este good practice sa iti iei datele din text, iti sugerez sa iti salvezi intr-un data atribute, mult mai clean si safe
        let price = parseFloat($('.product .price-wrapper').text());
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

    // tie nu iti trigger-uia event-ul pentru ca adaugi elementul dinamic, de aceea ai nevoie de delegate
    shoppedProducts.delegate('.product-quantity input', 'change', function() {
    // $('.product-quantity input').change(function () {
        console.log('quantity changed');
        updateQuantity(this);
    });


    $('.remove-product button').click(function () {
        console.log('remove button clicked');
        removeItem(this);
    });

});