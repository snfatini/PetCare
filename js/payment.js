function initPayPalButton() {
    var description = document.querySelector('#smart-button-container #description');
    var amount = document.querySelector('#smart-button-container #amount');
    var descriptionError = document.querySelector('#smart-button-container #descriptionError');
    var priceError = document.querySelector('#smart-button-container #priceLabelError');
    var invoiceid = document.querySelector('#smart-button-container #invoiceid');
    var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
    var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');

    var elArr = [description, amount];

    if (invoiceidDiv.firstChild.innerHTML.length > 1) {
        invoiceidDiv.style.display = "block";
    }

    var purchase_units = [];
    purchase_units[0] = {};
    purchase_units[0].amount = {};

    function validate(event) {
        return event.value.length > 0;
    }

    paypal.Buttons({
        style: {
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            layout: 'horizontal',

        },

        onInit: function(data, actions) {
            actions.disable();

            if (invoiceidDiv.style.display === "block") {
                elArr.push(invoiceid);
            }

            elArr.forEach(function(item) {
                item.addEventListener('keyup', function(event) {
                    var result = elArr.every(validate);
                    if (result) {
                        actions.enable();
                    } else {
                        actions.disable();
                    }
                });
            });
        },

        onClick: function() {
            if (description.value.length < 1) {
                descriptionError.style.visibility = "visible";
            } else {
                descriptionError.style.visibility = "hidden";
            }

            if (amount.value.length < 1) {
                priceError.style.visibility = "visible";
            } else {
                priceError.style.visibility = "hidden";
            }

            if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
                invoiceidError.style.visibility = "visible";
            } else {
                invoiceidError.style.visibility = "hidden";
            }

            purchase_units[0].description = description.value;
            purchase_units[0].amount.value = amount.value;

            if (invoiceid.value !== '') {
                purchase_units[0].invoice_id = invoiceid.value;
            }
        },

        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: purchase_units,
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '!');
            });
        },

        onError: function(err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
}

initPayPalButton();

new Cleave('.donate-amount', {
    prefix: 'RM ',
    numeral: true,
    numeralThousandGroupStyle: 'thousand'
});

var typeCard = new Cleave('.input-card-number', {
    creditCard: true,
    delimiter: '-',
    onCreditCardTypeChanged: function(type) {
        if (type === 'visa') {
            document.querySelector('.fa-cc-visa').classList.add('active');
        } else if (type === 'mastercard') {
            document.querySelector('.fa-cc-mastercard').classList.add('active');
        } else if (type === 'amex') {
            document.querySelector('.fa-cc-amex').classList.add('active');
        } else if (type === 'diners') {
            document.querySelector('.fa-cc-diners-club').classList.add('active');
        } else if (type === 'jcb') {
            document.querySelector('.fa-cc-jcb').classList.add('active');
        } else if (type === 'discover') {
            document.querySelector('.fa-cc-discover').classList.add('active');
        } else {
            document.querySelector('.fa-cc-visa').classList.remove('active');
            document.querySelector('.fa-cc-mastercard').classList.remove('active');
            document.querySelector('.fa-cc-amex').classList.remove('active');
            document.querySelector('.fa-cc-diners-club').classList.remove('active');
            document.querySelector('.fa-cc-jcb').classList.remove('active');
            document.querySelector('.fa-cc-discover').classList.remove('active');
        }
    }
});

var typeDate = new Cleave('.input-date', {
    date: true,
    datePattern: ['m', 'y']
});

var typeCvv = new Cleave('.input-cvv', {
    blocks: [3],
    numericOnly: true,
});

var btnPay = document.querySelector('.button-pay'),
    cardName = document.querySelector('.input-name'),
    credNum = document.querySelector('.input-card-number'),
    date = document.querySelector('.input-date'),
    cvv = document.querySelector('.input-cvv'),
    amountDonate =  document.querySelector('.donate-amount'),
    terms = document.querySelector("input[name=checkbox]");

const form = document.querySelector('form');

form.onsubmit = function(e) {
    console.log(typeCard.properties.creditCardType);
    if (cardName.value === ""){
        cardName.classList.add('box-error');
        document.querySelector('.error-name').classList.remove('hidden');
    } else {
        document.querySelector('.error-name').classList.add('hidden');
        cardName.classList.remove('box-error');
    }

    if (!(typeCard.properties.maxLength === credNum.value.length - (typeCard.properties.blocks.length - 1))
        || typeCard.properties.creditCardType === "unknown") {
        e.preventDefault();
        credNum.classList.add('box-error');
        document.querySelector('.error-cardnum').classList.remove('hidden');
    } else {
        credNum.classList.remove('box-error');
        document.querySelector('.error-cardnum').classList.add('hidden');
    }

    if (!(typeDate.properties.maxLength === date.value.length - 1)){
        e.preventDefault();
        date.classList.add('box-error');
        document.querySelector('.error-date').classList.remove('hidden');
    } else {
        document.querySelector('.error-date').classList.add('hidden');
        date.classList.remove('box-error');
    }

    if (!(typeCvv.properties.maxLength === cvv.value.length)){
        e.preventDefault();
        cvv.classList.add('box-error');
        document.querySelector('.error-cvv').classList.remove('hidden');
    } else {
        document.querySelector('.error-cvv').classList.add('hidden');
        cvv.classList.remove('box-error');
    }

    if (amountDonate.value == "RM "){
        e.preventDefault();
        amountDonate.classList.add('box-error');
        document.querySelector('.error-donate').classList.remove('hidden');
    } else {
        document.querySelector('.error-donate').classList.add('hidden');
        amountDonate.classList.remove('box-error');
    }

    if (!terms.checked){
        e.preventDefault();
        document.querySelector('.error-terms').classList.remove('hidden');
    } else {
        document.querySelector('.error-terms').classList.add('hidden');
    }

};

// Transition between select payment method

let boxMain = document.getElementById('mainsub'),
    boxcc = document.getElementById('cdcontent'),
    boxpp = document.getElementById('ppcontent')
    btn1 = document.getElementById('creditdebit'),
    btn2 = document.getElementById('mypaypal'),
    btnBack = document.querySelector('.button-back');

btn1.addEventListener('click', function() {
    btn1.classList.add('animate');

    boxMain.classList.add('visuallyhidden');
    boxMain.addEventListener('transitionend', function(e) {
        boxMain.classList.add('hidden');
        boxcc.classList.remove('hidden');
        btnBack.classList.remove('hidden');
        setTimeout(function() {
            boxcc.classList.remove('visuallyhidden');
            btnBack.classList.remove('visuallyhidden');
        }, 20);
    }, {
        capture: false,
        once: true,
        passive: false
    });

}, false);

// initPayPalButton();
btn2.addEventListener('click', function() {
    btn2.classList.add('animate');

    boxMain.classList.add('visuallyhidden');
    boxMain.addEventListener('transitionend', function(e) {
        boxMain.classList.add('hidden');
        boxpp.classList.remove('hidden');
        btnBack.classList.remove('hidden');
        setTimeout(function() {
            boxpp.classList.remove('visuallyhidden');
            btnBack.classList.remove('visuallyhidden');
        }, 20);
    }, {
        capture: false,
        once: true,
        passive: false
    });

}, false);


btnBack.addEventListener('click', function(e) {

    if (boxcc.classList.contains('hidden')){
        boxpp.classList.add('visuallyhidden');
        btnBack.classList.add('visuallyhidden');
        boxpp.addEventListener('transitionend', function(e) {
            boxpp.classList.add('hidden');
            btnBack.classList.add('hidden');
            boxMain.classList.remove('hidden');
            setTimeout(function() {
                boxMain.classList.remove('visuallyhidden');
                btn2.classList.remove('animate');
            }, 20);
        }, {
            capture: false,
            once: true,
            passive: false
        });
    } else if (boxpp.classList.contains('hidden')) {
        boxcc.classList.add('visuallyhidden');
        btnBack.classList.add('visuallyhidden');
        boxcc.addEventListener('transitionend', function(e) {
            boxcc.classList.add('hidden');
            btnBack.classList.add('hidden');
            boxMain.classList.remove('hidden');
            setTimeout(function() {
                boxMain.classList.remove('visuallyhidden');
                btn1.classList.remove('animate');
            }, 200);
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }

});
