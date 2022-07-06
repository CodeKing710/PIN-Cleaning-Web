(() => {
  if(!window.cart || window.cart == []) {
    window.cart = JSON.parse(sessionStorage.getItem('cart'));
  }

  if(window.cart.length > 0) {
    let view = `<table><tr><th colspan="3">Order</th></tr>`;
    let key = 0;
    let total = 0;

    for(const item of window.cart) {
      view += `<tr id="${key}">
      <td>${item.name}</td>
      <td>\$${item.price}</td>
      <td><a href="javascript:cartRemove({name: '${item.name}', key: ${key}});">Remove</a></td>
      </tr>`;
      ++key;
      total += Number(item.price);
    }
    view += `<tr id="total"><td>Total</td><td></td></tr>`

    view += `</table><label for="paytype">Cash: &nbsp;</label><input type="checkbox" id="paytype" />&nbsp;<a href="javascript:checkout();">Checkout</a>`;
    document.getElementById('cart-view').innerHTML = view;
  } else {
    document.getElementById('cart-view').innerHTML = "<h1>Empty Cart!</h1>";
  }
})();