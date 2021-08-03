 //appel de la fonction
 (async () => {
    const products = await getProducts()
    displayPage(products)
  })()
  
  //récupération de tous les products au format json
  async function getProducts() {
    return fetch("http://localhost:3000/api/teddies")
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => products)
    .catch((error) => {
      alert( "La connexion au serveur n'a pas pu être effectué.")
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
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    cloneElt.getElementById('productDescription').textContent = product.description
    //cloneElt.getElementById('productLink').href = `products.html?id=${product._id}`
    // Display template
    document.getElementById('cards').appendChild(cloneElt)
  }
  
  updateNavBar()