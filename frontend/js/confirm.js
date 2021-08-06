
// Récupération des objets dans le localstorage et le sessionstorage
const cart = JSON.parse(sessionStorage.getItem('panier')) || []
const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []


// affichage résumé informations commande
const informations = document.getElementById("contact")
informations.innerHTML += `
    <p class="fs-5 text-center">Félicitations <span class="font-weight-bold text-capitalize">${cart.contact.firstName}</span> pour votre achat sur notre site !</p>
    <p class="fs-5 text-center">Votre commande n° <span class="font-weight-bold">${cart.orderId}</span> a bien été prise en compte.</p>
    <p class="fs-5 text-center">Votre facture va vous être transmise par mail à l'adresse : <span class="font-weight-bold">${cart.contact.email}</span>.</p>
    <p class="fs-5 text-center">Votre commande sera envoyée à :</p>
    <div class=" fs-5 text-center font-weight-bold">
        <p class="text-capitalize">${cart.contact.firstName} ${cart.contact.lastName}</p>
        <p class="text-capitalize">${cart.contact.address}</p>
        <p class="text-capitalize">${cart.contact.zipcode} ${cart.contact.city}</p>
    </div>
    `

// affichage récapitulatif commande
for (product of shoppingCart) {
  const indexProduct = shoppingCart.indexOf(product)
  const productList = document.getElementById("resumeCommande")
  productList.innerHTML += `
  <tr class="text-center">
      <td class="w-25">
          <img src="${product.image}" class="img-fluid img-thumbnail" alt="${product.name}" width="200">
      </td>
      <td class="align-middle">
          <span>${product.name}</span>
      </td>
      <td class="align-middle">
          <span>${product.option}</span>
      </td>
      <td class="align-middle productQuantity">
          <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
      </td>
      <td class="align-middle">
          <span>${convertPrice(product.price)}</span>
      </td>
      <td class="align-middle">
          <span>${convertPrice(product.quantity * product.price)}</span>
      </td>
  </tr>`
}

//affiche le prix total
function totalPrice() {
  const total = document.getElementById("total")
  let totalBasket = 0
  shoppingCart.forEach((shoppingCart) => {
      totalBasket = totalBasket + shoppingCart.price * shoppingCart.quantity
  })
  total.innerHTML += `
  <tr class="text-center fs-5 bg-light">
      <td colspan="4" class="bg-white font-weight-bold">Total : </th>
      <td colspan="2" id="totalPriceP"  class="bg-white font-weight-bold">${convertPrice(totalBasket)}</th>
  </tr>`
}
totalPrice()

//Nettoyage storage
function clearStorage() {
    localStorage.clear()
    sessionStorage.clear()
}

//retour à la page d'accueil de la boutique
document.getElementById('btnIndex').addEventListener('click', () => {
    window.location.href = `index.html`
    clearStorage()
})
