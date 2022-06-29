function cartAdd(item) {
  const package = Array.from(document.getElementsByName('item')).filter(item => {
    return item.checked;
  });
  window.cart.push({...item, price: package[0].value});
  sessionStorage.setItem('cart',JSON.stringify(window.cart));
}