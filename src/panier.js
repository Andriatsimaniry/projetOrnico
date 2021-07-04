let produitEnregistreDanslocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log("produitEnregistreDanslocalStorage ",produitEnregistreDanslocalStorage);
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le localstorage en objet javascript

console.log(produitEnregistreDanslocalStorage);

// Affichage des produits du panier

// Séléction de la classe ou je vais injecter le code html
const positionElement3 = document.querySelector("#container-produits-panier");
console.log(positionElement3);

// Si le panier est vide : afficher le panier est vide
if(produitEnregistreDanslocalStorage === null){
  const panierVide = `
  <div class="row">
  <div class="col-xl-12 col-md-12">
  <div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
  <div class = "container-panier-vide">
  <h2 class="h6 px-4 py-3 bg-secondary text-center">Le Panier est vide</h2>
  </div>
  </div>
</div>
  </div>
    `;
    positionElement3.innerHTML = panierVide;
    console.log("panierVide");

}else{
  // Si le Panier n'est pas vide : afficher les produits dans le local storage
let  structureProduitPanier = [];

for(k = 0; k <produitEnregistreDanslocalStorage.length;k++){
  structureProduitPanier = structureProduitPanier +`
  <div class="container-recapitulatif">
                        <h2 class="h6 px-4 py-3 bg-secondary text-center"></h2>
                        <div class="h3  text-center py-3">Nom : ${produitEnregistreDanslocalStorage[k].produitName}</br>
                         Couleur : ${produitEnregistreDanslocalStorage[k].colors}</div>
  <div class="h3 text-center ">Prix : ${produitEnregistreDanslocalStorage[k].price}€</br>Suprimer l'article</div></br>Quantité 1

                    </div> 
                   </div> 
                    `;
                    if(k == produitEnregistreDanslocalStorage.length){
                    }
  // Injection html dans la page panier
positionElement3.innerHTML = structureProduitPanier;
                  }

}
