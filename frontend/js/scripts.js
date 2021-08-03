//fonctions utiles pour toutes les pages

function getProducts(){
    return JSON.parse(localStorage.getItem('shoppingCart'))
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