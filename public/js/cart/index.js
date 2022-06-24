if(!window.cart && !sessionStorage.getItem('cart')) {
  window.cart = [];
} else if(!window.cart && sessionStorage.getItem('cart')) {
  window.cart = sessionStorage.getItem('cart');
}