let products = JSON.parse(
  localStorage.getItem("produit")
);
console.log(
  "products ",
  products
);
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le localstorage en objet javascript

console.log(products);

// Affichage des produits du panier

// Séléction de la classe ou je vais injecter le code html
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
  } else {
    // Si le Panier n'est pas vide : afficher les produits dans le local storage
    let structureProduitPanier = [];

    for (k = 0; k < products.length; k++) {
      structureProduitPanier =
        structureProduitPanier +
        `
  <div class="container-recapitulatif">
                        <h2 class="h6 px-4 py-3 bg-secondary text-center"></h2>
                        <div class="h3  text-center py-3">Nom : ${products[k].produitName}</br>
                         Couleur : ${products[k].colors}</div>
  <div class="h3 text-center ">Prix : ${products[k].price}€</br><button class="btn-supprimer"> Supprimer </button></div></br>Quantité 1

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
  // Alert "le panier a été vider "
  alert("Le panier a été vider");

  //rechargement de la page
  window.location.href = "panier.html";
});

// ================= Fin bouton pour vider le panier ================

// ======= Le montant total du panier ============
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalculer = [];

//Aller chercher les prix dans le panier
for (let m = 0; m < products.length; m++) {
  let prixProduitsDansLePanier = products[m].price;

  //Mettre les prix du panier dans la variables "prixTotalCalculer"
  prixTotalCalculer.push(prixProduitsDansLePanier);
  console.log(prixTotalCalculer);
}

//Additionner les prix qu'il y a dans le tableau de la variable "prixTotalucler"

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalculer.reduce(reducer, 0) + "€";
console.log(prixTotal);

//choisr l'element html pour afficher prix total
const affichagePrixHtml = document.getElementById("container-montant-total");
affichagePrixHtml.insertAdjacentHTML("beforeend", prixTotal);
console.log(affichagePrixHtml);

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
  
  //Mettre l'objet "formulaireValues" transformer en json dans localstorage
    localStorage.setItem("contact", JSON.stringify(contact));

  
//Mettre les valeurs du formulaire et les produits séléctionnés dans localStorage envoyer vers le serveur
  const tousEnvoyer = {
    products,
    contact,
  };
  console.log("tousEnvoyer", tousEnvoyer);

  const promise01 = fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify(tousEnvoyer)
});
//Pour voir le resultat du serveur dans le console
promise01.then(async(reponse) =>{
  //si la promesse n'est pas resolu, si elle est rejetée - gestion des erreurs
  try{
    const contenu = await response.json();
    console.log("contenu de reponse",contenu);

    if(reponse.ok){
      console.log(`Resulta de reponse.ok : ${response.ok}`);
    }else{
      console.log(`Réponse du serveur : ${response.statuts}`)
      alert(`Prolème avec le serveur : erreur ${response.statuts}`)
    }
    }catch(e){
      console.log("ERREUR qui vient du catch()");
      console.log(e);
      alert(`ERREUR qui vient du catch() $(e)`,e);
    }
  }, (e) => { console.log('erreur', e)});
}


  // ======================== FIN GESTION VALIDATION DU FORMULAIRE =========
  
  // Envoie de l'objet "tousEnvoyer" vers le serveur

  
