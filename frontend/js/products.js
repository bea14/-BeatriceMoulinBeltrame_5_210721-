// Main function, auto executed at load time
(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  displayPage(productData)
  displayOptions(productData)
  addPanier(productData)
  addFavorites(productData)
})()

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
  const url = `${baseUrl}/` + getCategory() + `/${productId}`
  return fetch(url)
    .catch((error) => {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
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
}

function displayOptions(product) {
  category = getProductCategory()
  optionName = Object.values(product)[0]
  for (let i in optionName) {
    // Get template
    const templateElt = document.getElementById("productOptionName")
    // Clone template
    const cloneElt = document.importNode(templateElt.content, true)
    // Complete template
    cloneElt.getElementById('productOptionNameOption').textContent = Object.values(product)[0][i]
    // Display template
    document.getElementById('productOption').appendChild(cloneElt)
  }
}

document.getElementById('returnBack').onclick = (event) => {
  window.location.href = 'catalogue.html?category='+ getCategory()
}

//Ajouter le produit au local storage en cliquant sur le bouton Ajouter au panier
function addPanier(product) {
  document.getElementById('addToCart').onclick = (event) => {
    //récupération quantité et option
    quantite = parseInt(document.getElementById('qte').value)
    optionName = getSelectValue('productOption')
    categorie = getCategory()
    // Obtenir des informations sur le produit à partir de la demande d'API
    let produit = {
      'image': product.imageUrl,
      'id': product._id,
      'name': product.name,
      'option': optionName,
      'price': product.price,
      'quantity': quantite,
      'category': categorie
    }
    // Ajout au local storage
    let shoppingCart = (JSON.parse(localStorage.getItem('shoppingCart')) || [])
    //Verification si produit est déjà dans panier
    let alreadyInCart = shoppingCart.findIndex((item => item.id === produit.id) && (item => item.option === produit.option))
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
      addFavoris(produitid)
    } else {
      removeFavoris(produitid)
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