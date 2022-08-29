(() => {
  if(!window.cart || window.cart == []) {
    window.cart = JSON.parse(sessionStorage.getItem('cart'));
  }

  if(window.cart.length > 0) {
    let view = `<table><tr><th>Item</th><th>Price</th><th colspan="2">Quantity</th></tr>`;
    let key = 0;
    let total = 0;
    let itemTotal = 0;

    for(const item of window.cart) {
      view += `<tr id="${key}">
      <td>${item.name}</td>
      <td>\$${item.price*item.qty}</td>
      <td>${item.qty}</td>
      <td><a href="javascript:cartRemove({name: '${item.name}', key: ${key}});">Remove</a></td>
      </tr>`;
      ++key;
      total += Number(item.price*item.qty);
      itemTotal += Number(item.qty);
    }
    view += `<tr id="total"><td>Total</td><td name="price">\$${total}</td><td>${itemTotal}</td><td></td></tr></table>`;
    document.getElementById('cart-view').innerHTML = view;
    document.getElementById('checkout-btn').style.display = 'inline';
  } else {
    document.getElementById('cart-view').innerHTML = "<h1>Empty Cart!</h1>";
    document.getElementById('checkout-btn').style.display = 'none';
  }
})();