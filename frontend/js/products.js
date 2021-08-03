// Main function, auto executed at load time
(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  displayPage(productData)
  displayLenses(productData)
  addPanier(productData)
  addFavorites(productData)
})()

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
  return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}

function displayPage(product) {
  // Complete page
  document.getElementById('productImage').src = product.imageUrl
  document.getElementById('productName').textContent = product.name
  document.getElementById('productPrice').textContent = convertPrice(product.price)
  document.getElementById('productDescription').textContent = product.description
  updateFavoris()  
  updateNavBar()
}

function displayLenses(product) {
  for (let i in product.lenses) {
    // Get template
    const templateElt = document.getElementById("productLensesName")
    // Clone template
    const cloneElt = document.importNode(templateElt.content, true)
    // Complete template
    cloneElt.getElementById('productLensesNameOption').textContent = product.lenses[i]
    // Display template
    document.getElementById('productLenses').appendChild(cloneElt)
  }
}

//Ajouter le produit au local storage en cliquant sur le bouton Ajouter au panier
function addPanier(product) {
  let quantity = 0;
  document.getElementById('addToCart').onclick = (event) => {
    //récupération quantité et option
    quantite = parseInt(document.getElementById('qte').value)
    optionLense = getSelectValue('productLenses')
    // Obtenir des informations sur le produit à partir de la demande d'API
    let produit = {
      'image': product.imageUrl,
      'id': product._id,
      'name': product.name,
      'lense': optionLense,
      'price': product.price,
      'quantity': quantite
    }
    // Ajout au local storage
    let shoppingCart = (JSON.parse(localStorage.getItem('shoppingCart')) || [])
    //Verification si produit est déjà dans panier
    let alreadyInCart = shoppingCart.findIndex((item => item.id === produit.id) && (item => item.lense === produit.lense))
    if (alreadyInCart == -1) {
      shoppingCart.push(produit)
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    } else {
      shoppingCart[alreadyInCart].quantity += quantite
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    }
    // maj nb articles dans panier
    updateNavBar()
  }
}

/**
 * Gestion des favoris, enregistrement d'un article en favoris, retrait d'un article des favoris et récupération de la liste des favoris
 */
function addFavorites(product) {
  document.getElementById('addFavorite').onclick = (event) => {
    let produitid = product._id
    let listFavoris = getFavoris()
    let alreadyInPreferred = listFavoris.findIndex(item => item.id === produitid)
    if (alreadyInPreferred == -1) {
      addFavoris(produitid);
    } else {
      removeFavoris(produitid);
    }
  }
}

function addFavoris(product) {
  let listFavoris = getFavoris()
  listFavoris.push({
    id: product,
    date: new Date()
  })
  saveFavorites(listFavoris)
}

function removeFavoris(product) {
  let listFavoris = getFavoris()
  listFavoris = listFavoris.filter(favoris => favoris.id != product)
  saveFavorites(listFavoris)
  let heart = document.getElementById('addFavorite')
  const fullHeart = "<i class=\"far fa-heart\" aria-hidden=\"true\">&nbsp;</i>"
  heart.innerHTML = fullHeart
  heart.style.color = 'black'
}

function getFavoris() {
  return (JSON.parse(localStorage.getItem('listFavoris')) || [])
}

function getFavoritesId() {
  return getFavoris().map(favori => favori.id)
}

function saveFavorites(listFavoris) {
  let heart = document.getElementById('addFavorite')
  const fullHeart = "<i class=\"fa fa-heart\" aria-hidden=\"true\">&nbsp;</i>"
  heart.innerHTML = fullHeart
  heart.style.color = 'red'
  localStorage.setItem("listFavoris", JSON.stringify(listFavoris))
}