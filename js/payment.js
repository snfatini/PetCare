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
    e.preventDefault();
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

let box = document.getElementById('mainsub'),
    box2 = document.getElementById('cdcontent'),
    btn1 = document.getElementById('creditdebit'),
    btn2 = document.querySelector('.button-back');

btn1.addEventListener('click', function() {
    btn1.classList.add('animate');

    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        setTimeout(function() {
            box.classList.remove('visuallyhidden');
        }, 20);
    } else {
        box.classList.add('visuallyhidden');
        box.addEventListener('transitionend', function(e) {
            box.classList.add('hidden');
            box2.classList.remove('hidden');
            setTimeout(function() {
                box2.classList.remove('visuallyhidden');
            }, 20);
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }

}, false);

btn2.addEventListener('click', function() {

    if (box2.classList.contains('hidden')) {
        box2.classList.remove('hidden');
        setTimeout(function() {
            box2.classList.remove('visuallyhidden');
        }, 20);
    } else {
        box2.classList.add('visuallyhidden');
        box2.addEventListener('transitionend', function(e) {
            box2.classList.add('hidden');
            box.classList.remove('hidden');
            setTimeout(function() {
                box.classList.remove('visuallyhidden');
                btn1.classList.remove('animate');
            }, 20);
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }

}, false);
