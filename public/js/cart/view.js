(() => {
  if(!window.cart || window.cart == []) {
    window.cart = JSON.parse(sessionStorage.getItem('cart'));
  }

  if(window.cart.length > 0) {
    let view = `<table><th>Order</th>`;
    let key = 0;

    for(const item of window.cart) {
      view += `<tr id="${key}">
      <td>${item.name}</td>
      <td>\$${item.price}</td>
      <td><a href="javascript:cartRemove({name: '${item.name}', key: ${key}});">Remove</a></td>
      </tr>`;
      ++key;
    }

    view += `</table>`;
    document.getElementById('cart-view').innerHTML = view;
  } else {
    document.getElementById('cart-view').innerHTML = "<h4>Empty Cart!</h4>";
  }
})();