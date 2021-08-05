(() => {
  let productsInShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  if (productsInShoppingCart === null) panierVide()
  displayPage(productsInShoppingCart)
})()

productsInShoppingCart = getProducts()

function displayPage(productsInShoppingCart) {
  updateNavBar()
  // Set total price
  let total = 0
  for (let i in productsInShoppingCart) {
      total += productsInShoppingCart[i].quantity * productsInShoppingCart[i].price
      console.log('total',total)
  }
  document.getElementById('totalPrice').textContent = convertPrice(total)
  //totalPrice()
  // Loop over all products and displays them
  const productList = Object.values(productsInShoppingCart)
  productList.forEach((product) => {
    displayProduct(product)
  })
}

function displayProduct(product) {
  // Get & clone template
  const templateElt = document.getElementById('productTemplate')
  const cloneElt = document.importNode(templateElt.content, true)
  let quantity = product.quantity - 1
  // Complete template  
  cloneElt.getElementById('productImage').src = product.image  
  cloneElt.getElementById('productID').textContent  = product.id  
  cloneElt.getElementById('productCategory').textContent  = product.category
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productOption').textContent = product.option
  cloneElt.getElementById('productQuantity').selectedIndex = quantity
  cloneElt.getElementById('productPrice').textContent = convertPrice(product.price)
  cloneElt.getElementById('productTotalPrice').textContent = convertPrice(product.price * product.quantity)

  // Add events quantity change
  //cloneElt.getElementById('productQuantity').addEventListener('click', (event) => {
    cloneElt.getElementById('productQuantity').onchange = (e) => {
    e.preventDefault()
    let productId = product.id
    let productOption= product.option
    let concernedProduct = productsInShoppingCart.findIndex( (product=> product.id === productId  && product.option === productOption))
    updateProductQuantity(concernedProduct, e.target.selectedIndex + 1)
    
    //Update nb produits dans panier et prix total produit
    updateNavBar()
    location.reload()


    
    // Update product total price
    const totalPriceElt = document.getElementById('productTotalPrice')
    console.log('totalPriceElt',totalPriceElt)
   
    const newPrice = (productsInShoppingCart[concernedProduct].price * productsInShoppingCart[concernedProduct].quantity) / 100 + '.00€'
    totalPriceElt.textContent = newPrice
    console.log('totalPriceElt.textContent',totalPriceElt.textContent)
    // Update all products total price    
    document.getElementById('totalPrice').textContent = getTotalPrice() + '.00€'
    console.log('totalPrice',document.getElementById('totalPrice').textContent) 
    window.location.reload()
    newQuantity = 0
    concernedProduct = -1
    console.log('newQuantity',newQuantity)
  }
  // Add events delete item
  cloneElt.getElementById('clearItem').addEventListener('click', (event) => {    
    event.preventDefault()
    let productId = product.id    
    let productOption = product.option
    let concernedProduct = productsInShoppingCart.findIndex( (product=> product.id === productId  && product.option === productOption))
    console.log('concernedProduct',concernedProduct)
    productsInShoppingCart.splice(concernedProduct, 1)
    localStorage.setItem('shoppingCart', JSON.stringify(productsInShoppingCart))
    console.log(productsInShoppingCart)
    window.location.reload()
    updateNavBar()
    panierVide()
  })
  // Display template
  document.getElementById('productsList').prepend(cloneElt)
}

function updateProductQuantity(productId, quantity) {
  productsInShoppingCart[productId].quantity = quantity
  console.log('productsInShoppingCart[productId]',productsInShoppingCart[productId])
  // Mise à jour du localstorage
  localStorage.setItem('shoppingCart', JSON.stringify(productsInShoppingCart))
  console.log('productsInShoppingCartmaj',productsInShoppingCart)
}

function clearCart () {
  const el = document.getElementById('clearCart')
  el.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.clear()
    window.location.reload()
    panierVide()
})
}
clearCart()

// Lorsque le panier est vide, masque les éléments et les supprime du localstorage
function panierVide() {
  if (JSON.parse(localStorage.getItem('shoppingCart')) == null) {
    document.getElementById('emptyCart').style.display = 'block'
  }
}

// Validation des différents champs du formulaire
let nom = document.getElementById('nom')
let prenom = document.getElementById('prenom')
let addresse = document.getElementById('address')
let cp = document.getElementById('zipcode')
let ville = document.getElementById('city')
let mail = document.getElementById('email')

//si le champ est valide, bordure verte sinon bordure rouge
function inputIsValid(elt) {
  elt.style.border = 'solid 1px green'
  elt.style.boxShadow = '#00800066 0px 0px 4px'
}
function inputIsNotValid(elt) {
  elt.style.border = 'solid 1px red'
  elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
}

function inputIsNeutral(elt) {
  elt.style.border = ''
  elt.style.boxShadow = ''
}

function clearInput() {
  nbErreurs = 0
  verifOK = false
  erreurs = []
  inputIsNeutral(nom)
  inputIsNeutral(prenom)
  inputIsNeutral(addresse)
  inputIsNeutral(zipcode)
  inputIsNeutral(ville)
  inputIsNeutral(mail)
}

function verif() {
  let nbErreurs = 0
  let erreurs = []
  let verifOK = false  
   
  console.log('nbErreurs',nbErreurs)   
  console.log('erreurs',erreurs)
  console.log('verifOK',verifOK)
  const regexLastName=/[a-zA-Z',.-]+( [a-zA-Z',.-]+)*/
  if (regexLastName.test(nom.value) && nom.value.length > 1) {
    inputIsValid(nom)
  } else {
    erreurs.push("Le nom n'est pas renseigné/valide")
    inputIsNotValid(nom)
    nbErreurs += 1
  }
  const regexFirstName=/[a-zA-Z',.-]+( [a-zA-Z',.-]+)*/
  if (regexFirstName.test(prenom.value) && prenom.value.length > 1) {
    inputIsValid(prenom) 
  } else {
    erreurs.push("Le prénom n'est pas renseigné/valide")
    inputIsNotValid(prenom)
    nbErreurs += 1
  }
  if (addresse.value.length < 6) {
    erreurs.push("La rue et son n° ne sont pas renseignés.")
    inputIsNotValid(addresse)
    nbErreurs += 1
  } else {
    inputIsValid(addresse)
  }
const Regexzipcode = /\d{2}[- ]?\d{3}/
  if (cp.value.length > 1 && Regexzipcode.test(cp.value)) {
    inputIsValid(cp)
  } else {
    inputIsNotValid(cp)
    erreurs.push("Le CP n'est pas renseigné/valide.")
    nbErreurs += 1
  }
  if (ville.value.length < 1) {
    erreurs.push("La ville n'est pas renseignée.")
    inputIsNotValid(ville)
    nbErreurs += 1
  } else {
    inputIsValid(ville)
  }
  const regexMail= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
  if (regexMail.test(mail.value)) {
    inputIsValid(mail)
  } else {
    erreurs.push("L'email n'est pas renseigné/valide.")
    inputIsNotValid(mail)
    nbErreurs += 1
  }  
  console.log('nbErreurs',nbErreurs)   
  console.log('erreurs',erreurs)
  console.log('verifOK',verifOK)
  if (nbErreurs != 0) {
     alert("Le formulaire n'a pas pu être validé car :\n\n" + erreurs.join("\n"))
  } else {
    verifOK = true
    contact = {
      firstName: prenom.value,
      lastName: nom.value,
      address: addresse.value,
      zipcode: cp.value,
      city: ville.value,
      email: mail.value,
    }
  }
  console.log('contact', contact)
  clearInput()
  console.log('nbErreurs',nbErreurs)   
  console.log('erreurs',erreurs)
  console.log('verifOK',verifOK)
  return (contact)
}

// Envoi au serveur
// Création de l'objet à envoyer
const submitBtn = document.getElementById('btn-validation')
submitBtn.addEventListener('click', (e) => {
  //on récupère les données du formulaire
  contact = verif()
  // on valide que le formulaire soit correctement rempli
  if ( contact.length != 0) {
    e.preventDefault();
    //on récupère les données du formulaire
    contact = verif()
    console.log('contact',contact)
    // On récupère les id des produits qui sont dans le panier
    let products = []
    for (let i in productsInShoppingCart ) {
          products.push(productsInShoppingCart[i].id)
    }  
    // On crée l'objet order qui contient les coordonnées de contact et les id des produits du panier  
    let order = {
      contact, products
    }
    console.log('order', order)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json',},
    }

    console.log('order=',order)
    console.log('requestOptions=',requestOptions)
    //const url = `${baseUrl}/` + getCategory() + `/order`
    const url = `${baseUrl}/cameras/order`
    console.log('url',url)
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((validatedProducts) => {      
        console.log(validatedProducts)
        sessionStorage.setItem('panier',JSON.stringify(validatedProducts))
        console.log('panier.orderId',validatedProducts.orderId)
        
        document.location.href = "confirm.html?orderId=${validatedProducts.orderId}"
      })
      .catch((error) => {
        alert( "La connexion au serveur n'a pas pu être effectué.")
      })
    }
    else {
      alert ('Merci de remplir correctement le formulaire')
      console.log('Merci de remplir correctement le formulaire')
    }
})
