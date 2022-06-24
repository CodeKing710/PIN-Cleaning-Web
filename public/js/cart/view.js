(() => {
  if(!window.cart) {
    window.cart = sessionStorage.getItem('cart');
  }

  if(window.cart.length > 0) {
    document.getElementById('cart-view').innerHTML = `<table>
    
    </table>`;
  } else {
    document.getElementById('cart-view').innerHTML = "<h4>Empty Cart!</h4>";
  }
})();