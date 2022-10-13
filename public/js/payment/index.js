let stripe = Stripe('pk_live_51LQc0TKqyNx7wyJjytWEeuSd6s1YNkHFmpuRSrzykD8bKoHvyx1e4DtUd3L3Ve1lcR4dLwbkVVAGe6AK71A74PU400xpX6P6sP');
let elements = stripe.elements();
let style = {
  base: {
    fontSize: '1em',
    color: '#005f7a',
    border: '1px solid black'
  }
};

let card = elements.create('card', {style: style});

card.mount('#card-element');

let form = document.getElementById('payment-form');

form.addEventListener('submit', async function(evt) {
  evt.preventDefault();

  try {
    const token = await stripe.createToken(card);
    if(token.error) {
      document.getElementById('card-errors').textContent = token.error.message;
    } else {
      document.getElementById('stripeToken').setAttribute('value',token.token.id);
    }
  } catch (e) {
    console.log('Unable to make token: '+e);
  }

  form.submit();
});