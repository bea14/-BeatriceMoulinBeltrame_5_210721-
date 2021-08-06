/**
 * Gère l'affichage et les interactions de la page de contact
 */
contactForm = document.getElementById('contactForm')
function validate() {      
   if( contactForm.nom.value == "" ) {
      alert( "Please provide your name!" )
      contactForm.nom.focus()
      return false
   }
   if( contactForm.prenom.value == "" ) {
      alert( "Please provide your prenom!" )
      contactForm.prenom.focus()
      return false
   }
   if( contactForm.email.value == "" ) {
      alert( "Please provide your Email!" )
      contactForm.email.focus()
      return false
   }
   if( contactForm.phone.value == "" || isNaN( contactForm.phone.value ) ||
      contactForm.phone.value.length != 10 ) {       
      alert( "Please provide a phone in the format ##########." )
      contactForm.phone.focus() 
      return false
   }
   if( contactForm.message.value == "" ) {
      alert( "Please provide your message!" )
      return false
   }
   return(true)
}

document.getElementById('submitButton').addEventListener("click",function(){
   if (validate()) {
      alert("Votre message a bien été envoyé.")
   } else {
      alert("Votre message n'a pas pu être envoyé, merci de vérifier le formulaire")
   }
})