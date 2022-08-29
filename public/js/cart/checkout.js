async function mailOrder(email) {
  //Grab required attributes
  // const emailto = prompt('What is your email?', 'guest@guest.com');
  // const appointment = prompt('What day would you like this done (mm/dd/yyyy)?','Today');
  // const payType = document.getElementById('paytype').checked ? 'Cash' : 'Card';
  const cart = window.cart ?? JSON.parse(sessionStorage.getItem('cart'));
  const date = new Date();
  const orderdate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
  let emailbody = 
    `Order:\n${cart}\n${orderdate}`;
  // `Order Date: ${orderdate}\nOrder from ${emailto}:\nWould like done by: ${appointment}\n\nPayment format: ${payType}\n\nOrder:\n`;

  //Build email structure from the cart
  let totalPrice = 
  100;
  // document.getElementById('total').children[1].textContent;
  let totalItems = 0;
  cart.forEach(item => {
    ++totalItems;
    emailbody += ` - ${item.name}\n`;
  });
  emailbody += `\nTotal Items: ${totalItems}\nTotal: ${totalPrice}\n\n`;
  // alert(emailbody);
  // emailbody = encodeURIComponent(emailbody);

  //Send email
  const mail = await fetch('/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'pinc-order-mailer@thepriceisnicecleaning.com',
      to: 'clarenceprice@thepriceisnicecleaning.com',
      subject: 'Order from ',
      text: emailbody
    })
  });
  if(mail.status !== 200) {
    alert('Failed to send order!');
  }
  // window.location = `mailto:clarenceprice@thepriceisnicecleaning.com?subject=Order%20from%20${emailto}&body=${emailbody}`;
  window.location = '/cart';
}

async function processPayment(data) {
  let body = {...data};

  try {
    const payment = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });
    // window.location = payment;
  } catch(e) {
    console.log(e);
  }
  mailOrder(document.getElementById('email').value);
}

//FOR CART CHECKOUT.EJS
function renderCardForm() {
  let cardform = document.getElementById('card-form');
}

//FOR CART INDEX.EJS
async function checkout() {
  window.location = `/payment?payType=${selectedCard}`;
}