function breadcrumbs() {
  const url = window.location.pathname.substring(1, window.location.pathname.length);
  if(url) {
    //Generate Breadcrumbs
    const container = document.querySelector('section');
    const bcContainer = document.createElement('div');
    bcContainer.className = 'breadcrumbs';
    const paths = url.split('/');
    let bc = '/';
    bcContainer.innerHTML = `<a href="${bc}">Home</a>`;
    paths.forEach(path => {
      path = path[0].toUpperCase()+path.slice(1,path.length);
      bc += `${path}/`;
      bcContainer.innerHTML += ` > <a href="${bc}">${path}</a>`;
    });
    container.insertBefore(bcContainer ,container.children[0]);
  }
}

addDeps(true, breadcrumbs);