if(!window.cart && !sessionStorage.getItem('cart')) {
  window.cart = [];
} else if(!window.cart && sessionStorage.getItem('cart')) {
  window.cart = JSON.parse(sessionStorage.getItem('cart'));
}