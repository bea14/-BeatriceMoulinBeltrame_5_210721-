(() => {
  let productsInShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  if (productsInShoppingCart === null) panierVide()
  displayPage(productsInShoppingCart)
})()

let productsInShoppingCart = getProducts()

function displayPage(productsInShoppingCart) {
  // Set total price
  let total = 0
  for (let i in productsInShoppingCart) {
      total += productsInShoppingCart[i].quantity * productsInShoppingCart[i].price
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
  const newPrice = convertPrice((productsInShoppingCart[concernedProduct].price * productsInShoppingCart[concernedProduct].quantity))
  totalPriceElt.textContent = newPrice
  // Update all products total price    
  document.getElementById('totalPrice').textContent = convertPrice(getTotalPrice())
  window.location.reload()
  concernedProduct = -1
}

// Add events delete item
  cloneElt.getElementById('clearItem').addEventListener('click', (event) => {    
  event.preventDefault()
  let productId = product.id    
  let productOption = product.option
  let concernedProduct = productsInShoppingCart.findIndex( (product=> product.id === productId  && product.option === productOption))
  productsInShoppingCart.splice(concernedProduct, 1)
  localStorage.setItem('shoppingCart', JSON.stringify(productsInShoppingCart))
  window.location.reload()
  updateNavBar()
  panierVide()
  })
  // Display template
  document.getElementById('productsList').prepend(cloneElt)
}

function updateProductQuantity(productId, quantity) {
  productsInShoppingCart[productId].quantity = quantity
  // Mise ?? jour du localstorage
  localStorage.setItem('shoppingCart', JSON.stringify(productsInShoppingCart))
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

// Lorsque le panier est vide, masque les ??l??ments et les supprime du localstorage
function panierVide() {
  if (JSON.parse(localStorage.getItem('shoppingCart')) == null) {
    document.getElementById('emptyCart').style.display = 'block'
  }
}

// Validation des diff??rents champs du formulaire
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
  const regexLastName=/[a-zA-Z',.-]+( [a-zA-Z',.-]+)*/
  if (regexLastName.test(nom.value) && nom.value.length > 1) {
    inputIsValid(nom)
  } else {
    erreurs.push("Le nom n'est pas renseign??/valide")
    inputIsNotValid(nom)
    nbErreurs += 1
  }
  const regexFirstName=/[a-zA-Z',.-]+( [a-zA-Z',.-]+)*/
  if (regexFirstName.test(prenom.value) && prenom.value.length > 1) {
    inputIsValid(prenom) 
  } else {
    erreurs.push("Le pr??nom n'est pas renseign??/valide")
    inputIsNotValid(prenom)
    nbErreurs += 1
  }
  if (addresse.value.length < 6) {
    erreurs.push("La rue et son n?? ne sont pas renseign??s.")
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
    erreurs.push("Le CP n'est pas renseign??/valide.")
    nbErreurs += 1
  }
  if (ville.value.length < 1) {
    erreurs.push("La ville n'est pas renseign??e.")
    inputIsNotValid(ville)
    nbErreurs += 1
  } else {
    inputIsValid(ville)
  }
  const regexMail= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
  if (regexMail.test(mail.value)) {
    inputIsValid(mail)
  } else {
    erreurs.push("L'email n'est pas renseign??/valide.")
    inputIsNotValid(mail)
    nbErreurs += 1
  }  
  if (nbErreurs != 0) {
     alert("Le formulaire n'a pas pu ??tre valid?? car :\n\n" + erreurs.join("\n"))
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
  clearInput()
  return (contact)
}

// Envoi au serveur
// Cr??ation de l'objet ?? envoyer
const submitBtn = document.getElementById('btn-validation')
submitBtn.addEventListener('click', (e) => {
  //on r??cup??re les donn??es du formulaire
  contact = verif()
  // on valide que le formulaire soit correctement rempli
  if ( contact.length != 0) {
    e.preventDefault()
    //on r??cup??re les donn??es du formulaire
    contact = verif()
    // On r??cup??re les id des produits qui sont dans le panier
    let products = []
    for (let i in productsInShoppingCart ) {
          products.push(productsInShoppingCart[i].id)
    }  
    // On cr??e l'objet order qui contient les coordonn??es de contact et les id des produits du panier  
    let order = {
      contact, products
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json',},
    }
    //const url = `${baseUrl}/` + getCategory() + `/order`
    const url = `${baseUrl}/cameras/order`
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((validatedProducts) => {   
        sessionStorage.setItem('panier',JSON.stringify(validatedProducts))
        document.location.href = "confirm.html"
      })
      .catch((error) => {
        console.log('Il y a eu un probl??me avec l\'op??ration fetch: ' + error.message)
      })
  }
  else {
    alert ('Merci de remplir correctement le formulaire')
  }
})


