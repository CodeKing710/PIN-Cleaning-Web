function breadcrumbs() {
  console.log("Breadcrumbs Loading")
  const url = window.location.pathname;
  //Generate Breadcrumbs
  const container = document.querySelector('section');
  const bcContainer = document.createElement('div');
  bcContainer.className = 'breadcrumbs';
  const paths = url.split('/');
  let bc = '/';
  bcContainer.innerHTML = `<a href="${bc}">Home</a>`;
  paths.forEach(path => {
    bc += `${path}/`;
    bcContainer.innerHTML += ` > <a href="${bc}">${path}</a>`;
  });
  container.insertBefore(bcContainer ,container.children[0]);
  console.log("Breadcrumbs loaded");
}

addDeps(true, breadcrumbs);