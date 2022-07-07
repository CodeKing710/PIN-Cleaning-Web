function cartAdd(item) {
  const package = Array.from(document.getElementsByName('item')).filter(item => {
    return item.checked;
  });
  const qty = document.getElementById('qty').value;
  window.cart.push({...item, price: package[0].value, qty: qty});
  sessionStorage.setItem('cart',JSON.stringify(window.cart));
}