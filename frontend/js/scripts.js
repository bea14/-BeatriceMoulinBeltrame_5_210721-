//fonctions utiles pour toutes les pages

//Variables Globales
const baseUrl = `http://localhost:3000/api`
const OPTIONS = {
    teddies: 'colors',
    cameras: 'lenses',
    furniture: 'varnish',
}
// Menu
const navigation = [
    { name: 'Ours', href: '/teddies', categorie: 'teddies'},
    { name: 'Cameras', href: '/cameras', categorie: 'cameras'},
    { name: 'Meubles', href: '/furniture', categorie: 'furniture'},
 ]

menuName = navigation.map((anchor) => `${anchor.name}`)
category = navigation.map((anchor) => `${anchor.categorie}`)
newURL=`${baseUrl}/${category}`

//affichage d'un produit
function displayCategories() {
    for (let i=0; i < navigation.length; i++) {
        listCategories.innerHTML += `
        <li><a href="catalogue.html?category=${category[i]}" class="nav-link" aria-label="Lien vers la page">${menuName[i]}</a></li>`
  }
}
displayCategories()

//Barre de recherche
function searchBar() {
    // Script Bootstrap pour validation manuelle
    // car le formulaire n'est pas vbalidé (novalidate)
    var forms = document.getElementsByClassName('avec-validation')
    var validation = Array.prototype.filter.call(forms, function(form) {
        // Soumettre
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
            // Non valide
          event.preventDefault()
          event.stopPropagation()
          // Début du bloc de test
        } else {
          // Bloque le formulaire seulement pour le test.
          // à retirer avec le else...
          event.preventDefault()
          $("#searchReponse1").html("<b>Recherche validée</b> :<br />Catégorie : "+this.search.value + "<br />Mot(s) clé(s) : " + this.searchSaisie.value)
          // Fin du bloc de test
        }
        // Classe de Bootstrap valide
        form.classList.add('was-validated')
      }, false)
    })
}
searchBar()
  

//Fonctions
function getProducts(){
    return JSON.parse(localStorage.getItem('shoppingCart'))
}

function getProductCategory() {
    return new URL(window.location.href).searchParams.get('category')
  }

function getCategory() {
if (window.location.href ==='http://127.0.0.1:5501/frontend/index.html' || window.location.href ==='http://127.0.0.1:5501/frontend/index.html#catalogue') {
return urlcat = 'cameras'
}
else {
return urlcat = getProductCategory()
}
}
  
function updateNavBar(){
    cart = (JSON.parse(localStorage.getItem('shoppingCart')) || [] )
    if( cart.length === 0){
        navbarBadge.style.display = "none"
    }
    else {
        let count = 0;
        for(let i = 0; i < cart.length; i++){          
          count += parseInt(cart[i].quantity)
        }
        navbarBadge.innerHTML = count
        navbarBadge.style.display = "inline-block"
    }
}

function getSelectValue(selectId) {
    /**On récupère l'élement html <select>*/
    var selectElmt = document.getElementById(selectId)
    /**
    selectElmt.options correspond au tableau des balises <option> du select
    selectElmt.selectedIndex correspond à l'index du tableau options qui est actuellement sélectionné
    */
    return selectElmt.options[selectElmt.selectedIndex].value
}

function updateFavoris() {
    fav = (JSON.parse(localStorage.getItem('listFavoris')) || [] )     
    productId = new URL(window.location.href).searchParams.get('id') 
    let heart = document.getElementById('addFavorite')
    if (fav.length != 0){
        let concernedFavProduct = fav.findIndex(fav => productId === fav.id)
       if (concernedFavProduct != -1) {
        const fullHeart = "<i class=\"fa fa-heart\" aria-hidden=\"true\">&nbsp;</i>"
        heart.innerHTML = fullHeart
        heart.style.color = 'red'
       } else {
        const fullHeart = "<i class=\"far fa-heart\" aria-hidden=\"true\">&nbsp;</i>"
        heart.innerHTML = fullHeart  
        heart.style.color = 'black'
       }
    }

}

function getTotalPrice() {
    let total = 0
      for (let i in productsInShoppingCart) {
          total += productsInShoppingCart[i].quantity * productsInShoppingCart[i].price
      }
      return  total
}

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    //Intl.NumberFormat([locales[, options]])
    //style "currency" pour un affichage en fonction de la devise 
    //currency "EUR"qui affichera le code ISO de la devise
    //minimumFractionDigits nombre minimal de chiffres à utiliser pour la partie entière
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}


function sendCart(order, panier) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json',},
    }
    fetch(`http://localhost:3000/api/cameras/order`, requestOptions)
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