// let stripe = Stripe('pk_live_51LQc0TKqyNx7wyJjytWEeuSd6s1YNkHFmpuRSrzykD8bKoHvyx1e4DtUd3L3Ve1lcR4dLwbkVVAGe6AK71A74PU400xpX6P6sP');
let stripe = window.location.hostname == 'localhost' ? Stripe('pk_test_51LQc0TKqyNx7wyJjzcBQWkZ1olLBAu7d4o0SQVU6zRBRJY89sgLl4Z514Dt6LdJY9Yqht4sQpUQ0dVUtwpOYP56n00rKPNuesF') : Stripe('pk_live_51LQc0TKqyNx7wyJjytWEeuSd6s1YNkHFmpuRSrzykD8bKoHvyx1e4DtUd3L3Ve1lcR4dLwbkVVAGe6AK71A74PU400xpX6P6sP');
// console.log(window.location.hostname == 'localhost' ? 'pk_test_51LQc0TKqyNx7wyJjzcBQWkZ1olLBAu7d4o0SQVU6zRBRJY89sgLl4Z514Dt6LdJY9Yqht4sQpUQ0dVUtwpOYP56n00rKPNuesF' : 'pk_live_51LQc0TKqyNx7wyJjytWEeuSd6s1YNkHFmpuRSrzykD8bKoHvyx1e4DtUd3L3Ve1lcR4dLwbkVVAGe6AK71A74PU400xpX6P6sP');
let elements = stripe.elements();
let style = {
  base: {
    fontSize: '1.1em',
    color: '#005f7a',
    border: '1px solid black'
  }
};

let card = elements.create('card', {style: style});

card.mount('#card-element');

let payform = document.getElementById('payment-form');

payform.addEventListener('submit', async function(evt) {
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