async function add() {
  const item = Array.from(document.getElementsByName('item')).filter(item => {
    return item.checked;
  })[0];
  const name = document.getElementById('service-name').innerText;
  const qty = document.getElementById('qty').value;

  //Send cart data
  try {
    const data = await fetch('/cart/add',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, item: item.id, qty: qty, price: item.value})
    });
    // console.log(await data.json());
  } catch(e) {
    console.log("Unable to upload cart data: "+e);
  } finally {
    alert('Added to Cart!');
  }
}

async function remove(item, row) {
  if(item === undefined && row === undefined) {
    //Remove current item (must be clicked from item page item was added)
    const _item = Array.from(document.getElementsByName('item')).filter(item => {
      return item.checked;
    })[0];
    const name = document.getElementById('service-name').innerText;
    const qty = document.getElementById('qty').value;
  
    //Send cart data
    try {
      const data = await fetch('/cart/remove',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, item: _item.id, qty: qty, price: _item.value})
      });
      // console.log(await data.json());
    } catch(e) {
      console.log("Unable to upload cart data: "+e);
    } finally {
      alert('Cart Item Removed');
    }
  } else {
    //Remove specific item
    try {
      const data = await fetch('/cart/remove',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: item.name, item: item.item, qty: item.qty, price: item.price})
      });
      // console.log(await data.json());
    } catch(e) {
      console.log("Unable to upload cart data: "+e);
    } finally {
      alert('Removed Item from Cart!');
    }

    //Update visually
    document.getElementById(`item${row}`).remove();
  }
}

async function clear() {
  try {
    const data = await fetch('/cart/clear',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'}
    });
    // console.log(await data.json());
  } catch(e) {
    console.log("Unable to upload cart data: "+e);
  } finally {
    alert('Cart Emptied!');
  }

  for(let i = 0; i < document.getElementById('cart-view').childNodes[1].childNodes.length-1; i++) {
    document.getElementById(`item${i}`).remove();
  }
}