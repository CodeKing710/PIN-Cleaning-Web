function cartRemove(item) {
  let c = 0;
  for(const i of window.cart) {
    if(i == item) {
      window.cart.splice(c, c+1);
      break;
    }
    ++c;
  }
  sessionStorage.setItem('cart',window.cart);
}