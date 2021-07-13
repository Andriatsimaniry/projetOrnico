// JSON.parse c'est pour convertir les données au format JSON qui sont dans le localstorage en objet javascript
let products = JSON.parse(
  localStorage.getItem("produit")
);
console.log("products ",products);
// Affichage des produits du panier
// Séléction de la classe ou  injecter le code html
const positionElement3 = document.querySelector("#container-produits-panier");
console.log(positionElement3);
//Fonction de rendu Html
function renduHtml() {
  // Si le panier est vide : afficher le panier est vide
  if (
    products === null ||
    products == 0
  ) {
    const panierVide = `
  <div class="row">
    <div class="col-xl-12 col-md-12">
      <div class="d-sm-flex justify-content-center my-4 pb-4 border-bottom">
        <div class = "container-panier-vide">
        <h2 class="h6 px-4 py-3 bg-secondary text-center">Le Panier est vide</h2>
        </div>
      </div>
    </div>
  </div>
    `;
    positionElement3.innerHTML = panierVide;
    console.log("panierVide");
  } else {
    // Si le Panier n'est pas vide : afficher les produits dans le local storage
    let structureProduitPanier = [];

    for (k = 0; k < products.length; k++) {
      structureProduitPanier =
        structureProduitPanier +
        `
<div class="container-recapitulatif">
   <h2 class="h6 d-flex flex-wrap justify-content-between align-items-center px-12 py-2 bg-secondary">
     <div class="p-2"> Nom : ${products[k].produitName}</div>  
      <div class="p-2"> Couleur : ${products[k].colors}</div> 
      <div class="p-2"> Prix : ${products[k].price}€</div>
      <div class="p-2"> Quantité : ${products[k].quantite}</div>
      <div class="p-2"><button class="btn-supprimer"> Supprimer </button></div></h2>
    </div>
  </div>
  </div>   
  `;
      if (k == products.length) {
      }
      // Injection html dans la page panier
      positionElement3.innerHTML = structureProduitPanier;
    }
  }
}
renduHtml();
//==========Fin de l'affichage des produits du panier ======
// *********** Gestion du boutton supprimer l'article ******
//Selection des références de tous les boutons btn-supprimer
let btn_supprimer = document.querySelectorAll(".btn-supprimer");
console.log(btn_supprimer);
for (let l = 0; l < btn_supprimer.length; l++) {
  btn_supprimer[l].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event); 
    //selection de l'id du produit qui va être supprimer en cliquant sur le boutton
    let name_selectionner_suppression =
      products[l].produitName;
    let color_selectionner_suppression =
      products[l].colors;
    console.log("name_selectionner_suppression", name_selectionner_suppression);
    //avec la methode filter on séléctionne les éléments à supprimer
    products =
      products.filter(
        (word) =>
          word.produitName !== name_selectionner_suppression &&
          word.color !== color_selectionner_suppression
      );
    console.log(products);
    //envoie de la  variable dans le local storage
    localStorage.setItem(
      "produit",
      JSON.stringify(products)
    );
    window.location.href = "panier.html";
  });
}
//**********Le bouton pour vider le panier*******
//choisir l'element html pour  vider tous les panier
const viderPanierElement = document.getElementById("vider-panier");
console.log(viderPanierElement);
// ********Suppression de la clé produit du local storage pour vider entierement le panier
viderPanierElement.addEventListener("click", (e) => {
  e.preventDefault;
  //.removeItem pour vider le local storage
  localStorage.removeItem("produit");
  //Mettre à jour le nombreTotal dans localStorage
  localStorage.setItem("nombreTotal",0);
  // Alert "le panier a été vider "
  alert("Le panier a été vider");
  //rechargement de la page
  window.location.href = "panier.html";
});
// ================= Fin bouton pour vider le panier ================
// ======= Le montant total du panier ============
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalculer = [];
let nombreTotalProduit = [];

//Aller chercher les prix dans le panier
for (let m = 0; m < products.length; m++) {
  let prixProduitsDansLePanier = products[m].price;
  //aller chercher la quantité dans le panier
  let nombreProduitDansLePanier = products[m].quantite;
  nombreProduitDansLePanier = parseInt(nombreProduitDansLePanier);
  console.log(typeof nombreProduitDansLePanier);
  //Mettre les prix du panier dans la variables "prixTotalCalculer"
  prixTotalCalculer.push(prixProduitsDansLePanier);
  //Mettre les quantité dans la variable "nombreTotalProduit"
  nombreTotalProduit.push(nombreProduitDansLePanier);
  console.log(prixTotalCalculer);
  console.log("nombreTotalProduit",nombreTotalProduit);
}
//Additionner les prix  qu'il y a dans le tableau de la variable "prixTotalCalculer"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalculer.reduce(reducer, 0) + "€";
console.log(prixTotal);

//Additionner les nombres qu'il y a dans le tableau de la variable "nombreTotalProduit"
const nombreTotal = nombreTotalProduit.reduce(reducer,0) ;
console.log(nombreTotal);
//Mettre le nombreTotal dans le localstorage
localStorage.setItem("nombreTotal",nombreTotal);

//choisr l'element html pour afficher prix total
const affichagePrixHtml = document.getElementById("container-montant-total");
affichagePrixHtml.insertAdjacentHTML("beforeend", prixTotal);
console.log("affichagePrixHtml",affichagePrixHtml);

//Choisir l'élément pour afficher le nombre total
const affichageNombreTotal = document.getElementById("container-nombre-total");
affichageNombreTotal.insertAdjacentHTML("afterbegin", nombreTotal);
if (nombreTotal == null){
  nombreTotal = 0 ;
}
console.log("affichageNombreTotal",affichageNombreTotal);

// ================================= FIN MONTANT TOTAL PANIER ==============
// ******************** FORMULAIRE DE COMMANDE ***********************
//Récupération des valeurs du formulaire
function validateform(){ 
  const contact = {
    lastName: document.formulaireCommande.nom.value,
    firstName : document.formulaireCommande.prenom.value,
    email : document.formulaireCommande.email.value,
    address : document.formulaireCommande.adresse.value,
    city : document.formulaireCommande.ville.value
  }
  console.log(contact);
  //Mettre l'objet "contact" transformer en json dans localstorage
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal)); 
//Mettre les valeurs du formulaire et les produits séléctionnés dans localStorage envoyer vers le serveur
  const tousEnvoyer = {
    products: products.map((produit) => {
      return produit.id;
    }),
    contact,prixTotal
  };
  console.log("tousEnvoyer", tousEnvoyer);
  //Envoyer vers le serveur le formulaire et les produits dans le panier
  (async () => {
    try{
  const promise01 = await fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify(tousEnvoyer)
});
const content = await promise01.json();
console.log('content', content.orderId);
//Enregistrer l'id dans localStorage
localStorage.setItem("orderId", JSON.stringify(content.orderId));
//Aller vers la page confirmation-commande
window.location = "confirmation-commande.html"; 
} catch(e){
  console.log(e);
}           
})(); 
}
  // ======================== FIN GESTION VALIDATION DU FORMULAIRE =========
 

  
