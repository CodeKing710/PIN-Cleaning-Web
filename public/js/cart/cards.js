const cards = document.getElementById('card-wrapper').children;
function selectCard(card) {
  switch(card) {
    case 'visa':
      selectVisa();
      break;
    case 'mast':
      selectMaster();
      break;
    case 'amex':
      selectAmex();
      break;
    case 'disc':
      selectDiscover();
      break;
  }
}

//First child = 0
function selectVisa() {
  const visa = cards.item(0);
  //Perform toggle
  visa.classList.contains('selected') ? visa.classList.remove('selected') : visa.classList.add('selected');
  //Reset other card selections
  cards.item(1).classList.contains('selected') ? cards.item(1).classList.remove('selected') : null;
  cards.item(2).classList.contains('selected') ? cards.item(2).classList.remove('selected') : null;
  cards.item(3).classList.contains('selected') ? cards.item(3).classList.remove('selected') : null;
}

//Second child = 1
function selectMaster() {
  const mast = cards.item(1);
  //Perform toggle
  mast.classList.contains('selected') ? mast.classList.remove('selected') : mast.classList.add('selected');
  //Reset other card selections
  cards.item(0).classList.contains('selected') ? cards.item(0).classList.remove('selected') : null;
  cards.item(2).classList.contains('selected') ? cards.item(2).classList.remove('selected') : null;
  cards.item(3).classList.contains('selected') ? cards.item(3).classList.remove('selected') : null;
}

//Third child = 2
function selectAmex() {
  const amex = cards.item(2);
  //Perform toggle
  amex.classList.contains('selected') ? amex.classList.remove('selected') : amex.classList.add('selected');
  //Reset other card selections
  cards.item(1).classList.contains('selected') ? cards.item(1).classList.remove('selected') : null;
  cards.item(0).classList.contains('selected') ? cards.item(0).classList.remove('selected') : null;
  cards.item(3).classList.contains('selected') ? cards.item(3).classList.remove('selected') : null;
}

//Fourth child = 3
function selectDiscover() {
  const disc = cards.item(3);
  //Perform toggle
  disc.classList.contains('selected') ? disc.classList.remove('selected') : disc.classList.add('selected');
  //Reset other card selections
  cards.item(1).classList.contains('selected') ? cards.item(1).classList.remove('selected') : null;
  cards.item(2).classList.contains('selected') ? cards.item(2).classList.remove('selected') : null;
  cards.item(0).classList.contains('selected') ? cards.item(0).classList.remove('selected') : null;
}