function cartRemove(item) {
  
  window.cart = JSON.parse(sessionStorage.getItem('cart'));
  if(window.cart.length == 1) {
    window.cart = [];
  } else {
    let c = 0;
    for(const i of window.cart) {
      if(i.name == item.name) {
        window.cart.splice(c, 1);
        break;
      }
      ++c;
    }
  }
  sessionStorage.setItem('cart',JSON.stringify(window.cart));

  if(window.location.pathname == '/cart') {
    document.getElementById(item.key).remove();
    if(window.cart.length == 0) {
      document.getElementById('cart-view').innerHTML = "<h4>Empty Cart!</h4>";
    }
  }
}