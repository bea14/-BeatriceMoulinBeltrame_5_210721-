 //appel de la fonction
(async () => {
  const products = await getProducts()
  displayPage(products)
})()


//récupération de tous les products au format json
async function getProducts() {
  url = `${baseUrl}/`+ getCategory()
  return fetch(url)
  .then((httpBodyResponse) => httpBodyResponse.json())
  .then((products) => products)
  .catch((error) => {
    alert('Il y a eu un problème avec l\'opération fetch: ' + error.message)
      })
}

function displayPage(products) {
  //document.getElementById('productsList').innerHTML = ''
  //for (product of products)  
  products.forEach((product) => {
    displayProduct(product)
  })
}

//affichage d'un produit
function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById("product")
  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)
  // Complete template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productPrice').textContent = convertPrice(product.price )
  cloneElt.getElementById('productDescription').textContent = product.description
  const href =  `products.html?category=` + getCategory() + `&id=${product._id}`
  cloneElt.getElementById('productLink').href = href
  // Display template
  document.getElementById('cards').appendChild(cloneElt)
}

updateNavBar()