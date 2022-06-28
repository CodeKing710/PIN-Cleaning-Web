async function checkout() {
  //Grab required attributes
  const emailto = prompt('What is your email?', 'guest@guest.com');
  const payType = document.getElementById('paytype').checked ? 'Cash' : 'Card';
  const cart = window.cart ?? JSON.parse(sessionStorage.getItem('cart'));
  let emailbody = 
  `Order from ${emailto}:\n\nPayment format: ${payType}\n\nItems:\n`;

  //Build email structure from the cart
  let totalPrice = 0;
  let totalItems = 0;
  cart.forEach(item => {
    totalPrice += item.price;
    ++totalItems;
    emailbody += ` - ${item.name}\n`;
  });
  emailbody += `\nItems: ${totalItems}\nTotal: \$${totalPrice}`;

  //Send email
  // window.location = `mailto:clarenceprice@thepriceisnicecleaning.com?subject=Order%20from%20${emailto}&body=${emailbody}`;
  alert(emailbody);
}