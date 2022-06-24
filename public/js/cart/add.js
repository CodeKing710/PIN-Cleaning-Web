function cartAdd(item) {
  window.cart.push(item);
  sessionStorage.setItem('cart',window.cart);
}