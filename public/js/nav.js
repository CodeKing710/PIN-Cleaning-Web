function openNav() {
  document.getElementById('mnav').style.left = 0;
  document.body.style.left = '35%';
}
function closeNav() {
  document.getElementById('mnav').style.left = '-35%';
  document.body.style.left = 0;
}

document.getElementById('menubtn').addEventListener('click', openNav);
document.getElementById('closemenubtn').addEventListener('click', closeNav);

window.onresize = widthCheck;

function widthCheck() {
  if( document.body.offsetWidth > 700 ) {
    document.getElementById('mnav').style.display = 'none';
    document.getElementById('menubtn').style.display = 'none';
    document.getElementById('nav').style.display = 'block';
  } else {
    document.getElementById('nav').style.display = 'none';
    document.getElementById('mnav').style.display = 'block';
    document.getElementById('menubtn').style.display = 'flex';
  }
}
widthCheck();