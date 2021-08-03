# openclassrooms-dw-projet-5
Code source du Projet 5 de la formation Développeur Web d'OpenClassrooms, intitulé "Construisez un site e-commerce"

## Compétences évaluées :
- Interagir avec un web service avec JavaScript
- Créer un plan de test pour une application
- Valider des données issues de sources externes
- Gérer des événements JavaScript

### Scénario
Vous avez été recruté en tant que développeur front-end par Orinoco, une entreprise de commerce en ligne.
Son credo ? Se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits. Il y a par exemple Oribook pour les livres ou Oritextil pour les vêtements.
Vos compétences en développement web et votre personnalité ont plu à Paul, le fondateur de l’entreprise.
Dans un premier temps, Paul souhaite créer un premier MVP pour démontrer le fonctionnement de ses applications à ses investisseurs.
Vous êtes chargé de la partie front-end.

### Prérequis
- Cloner ce repository : https://github.com/OpenClassrooms-Student-Center/JWDP5.git et créer un dossier back-end
- Se placer dans le dossier back-end 
- Installer Node.js et npm (taper "node -v" et "npm -v" dans le terminal de l'éditeur de code pour vérifier que le tout est bien installé et les versions installées)
- Lancer npm avec la commande "npm install" pour installer les dépendances
- Taper "node server.js" pour lancer le serveur
- Une fois le serveur lancé, écrire l'url de l'API : http://localhost:3000/api/cameras pour les caméras, cela permettra de vérifier le bon fonctionnement

### Architecture générale
L'application web doit être composée de 4 pages :
- une page de vue sous forme de liste, montrant tous les articles disponibles
à la vente
- une page “produit”, qui affiche de manière dynamique l'élément
sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
l'ajouter à son panier
- une page “panier” contenant un résumé des produits dans le panier, le prix
total et un formulaire permettant de passer une commande. Les données
du formulaire doivent être correctes et bien formatées avant d'être
renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
- une page de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant le prix total et l'identifiant de commande envoyé
par le serveur

### Produits présentés
Dans un premier temps, une seule catégorie de produits sera présentée.
Choix à faire entre les 3 propositions suivantes :
- ours en peluche faits à la main ;
-  caméras vintage ;
-  meubles en chêne

### Planification de tests unitaires
Planifiez une suite de tests unitaires pour couvrir au minimum 80 % de la base de
code pour le front-end. Vous devrez formaliser un plan pour atteindre ce résultat,
sans obligation d’écrire ces tests Expliquez quelles lignes seront testées, et quels
“test cases” seront envisagés