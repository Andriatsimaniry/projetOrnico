let produitEnregistreDanslocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log("produitEnregistreDanslocalStorage ",produitEnregistreDanslocalStorage);
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le localstorage en objet javascript

console.log(produitEnregistreDanslocalStorage);

// Affichage des produits du panier

// Séléction de la classe ou je vais injecter le code html
const positionElement3 = document.querySelector("#container-produits-panier");
console.log(positionElement3);

//Fonction de rendu Html
function renduHtml() {
// Si le panier est vide : afficher le panier est vide
if(produitEnregistreDanslocalStorage === null || produitEnregistreDanslocalStorage == 0){
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
  <div class="h3 text-center ">Prix : ${produitEnregistreDanslocalStorage[k].price}€</br><button class="btn-supprimer"> Supprimer </button></div></br>Quantité 1

                    </div> 
                   </div> 
                    `;
                    if(k == produitEnregistreDanslocalStorage.length){
                    }
  // Injection html dans la page panier
positionElement3.innerHTML = structureProduitPanier;
                  }

}

};

renduHtml();
//==========Fin de l'affichage des produits du panier ======

// *********** Gestion du boutton supprimer l'article ******

//Selection des références de tous les boutons btn-supprimer

let btn_supprimer = document.querySelectorAll(".btn-supprimer");
console.log(btn_supprimer);

for (let l = 0; l < btn_supprimer.length; l++){
  btn_supprimer[l].addEventListener("click" , (event) =>{
    event.preventDefault();
    console.log(event);
    //selection de l'id du produit qui va être supprimer en cliquant sur le boutton
    let name_selectionner_suppression = produitEnregistreDanslocalStorage[l].produitName ;
    let color_selectionner_suppression = produitEnregistreDanslocalStorage[l].colors;
    console.log("name_selectionner_suppression",name_selectionner_suppression);
    
//avec la methode filter on séléctionne les éléments à supprimer
produitEnregistreDanslocalStorage = produitEnregistreDanslocalStorage.filter(word => word.produitName !== name_selectionner_suppression && word.color !== color_selectionner_suppression);
console.log(produitEnregistreDanslocalStorage);

//envoie de la  variable dans le local storage

localStorage.setItem("produit", JSON.stringify(produitEnregistreDanslocalStorage));
window.location.href = "panier.html";
  })
}

//**********Le bouton pour vider le panier*******

//choisir l'element html pour  vider tous les panier
const viderPanierElement = document.getElementById("vider-panier");
console.log(viderPanierElement);

// ********Suppression de la clé produit du local storage pour vider entierement le panier
viderPanierElement.addEventListener("click",(e) =>{
  e.preventDefault;

  //.removeItem pour vider le local storage
localStorage.removeItem("produit");
// Alert "le panier a été vider "
alert("Le panier a été vider");

//rechargement de la page
window.location.href ="panier.html";
});

// ================= Fin bouton pour vider le panier ================

// ======= Le montant total du panier ============
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalculer = [];



//Aller chercher les prix dans le panier
for(let m=0; m < produitEnregistreDanslocalStorage.length; m++){
  let prixProduitsDansLePanier = produitEnregistreDanslocalStorage[m].price;

  //Mettre les prix du panier dans la variables "prixTotalCalculer"
  prixTotalCalculer.push(prixProduitsDansLePanier)
  console.log(prixTotalCalculer);
}

//Additionner les prix qu'il y a dans le tableau de la variable "prixTotalucler"

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalculer.reduce(reducer,0)+ "€";
console.log(prixTotal);

//choisr l'element html pour afficher prix total 
const affichagePrixHtml = document.getElementById("container-montant-total");
affichagePrixHtml.insertAdjacentHTML("beforeend",prixTotal);
console.log(affichagePrixHtml);

// ================================= FIN MONTANT TOTAL PANIER ==============

// ******************** FORMULAIRE DE COMMANDE ***********************

const afficherFormulaire = () => {

//Séléction élément du DOM pour le positionnement du formulaire
const positionElement4 = document.querySelector("#formulaire-commande-produit");

  const structureFormulaire = `
  <div class="row">
  <div class="col-lg-12 col-md-12"> 
                <div id="formulaire-commande" class="h3 font-weight-semibold text-center py-3">Remplir le Formulaire Pour Commander 
                </div>
              </div>

                <div class="container pb-5 mt-n2 mt-md-n3">                
                    <div class="row">
                        <div class="col-lg-12 col-md-12">     
                    <div class="panel panel-default">
                          <div class="form-group">
                            <label class="col-sm-4 control-label">Prénom</label>
                            <div class="col-sm-8">
                              <input id="prenom" type="text" class="form-control">
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-12 control-label">Nom</label>
                            <div class="col-sm-8">
                              <input id="nom" type="text" class="form-control" required>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-4 control-label">E-mail</label>
                            <div class="col-sm-8">
                              <input id="email" type="email" class="form-control" required>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-4 control-label">Téléphone</label>
                            <div class="col-sm-8">
                              <input id="telephone" type="tel" class="form-control">
                            </div>
                         </div>
                          <div class="form-group">
                            <label class="col-sm-4 control-label">Adresse</label>
                            <div class="col-sm-8">
                              <textarea  id="adresse" rows="3" class="form-control" required></textarea>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-4 control-label">Ville</label>
                            <div class="col-sm-8">
                              <input id="ville" type="text" class="form-control" required>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-4 control-label">Code Postal</label>
                            <div class="col-sm-8">
                              <input id="codepostal" type="email" class="form-control">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-sm-4 col-sm-2">
                            <button id = "envoyerFormulaire" type="submit" class="btn btn-primary">Commander</button>
                          </div>
                        </div>
                </div>
            </div>    
  `;
  //Injection HTML
  positionElement4.insertAdjacentHTML("afterend", structureFormulaire);
};

//Affichage du formulaire
afficherFormulaire();

//Séléction du bouton envoyer le formulaire
const btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire")
console.log(btnEnvoyerFormulaire);


// ========  addEventListener =============
btnEnvoyerFormulaire.addEventListener("click", (e)=>{
  e.preventDefault();

  //Récupération des valeurs du formulaire pour les mettre dans le local storage
localStorage.setItem("prenom",document.querySelector("#prenom").value);
localStorage.setItem("nom",document.querySelector("#nom").value);
localStorage.setItem("email",document.querySelector("#email").value);
localStorage.setItem("telephone",document.querySelector("#telephone").value);
localStorage.setItem("adresse",document.querySelector("#adresse").value);
localStorage.setItem("ville",document.querySelector("#ville").value);
localStorage.setItem("codepostal",document.querySelector("#codepostal").value);

//Mettre les valeurs du formulaire dans un objet

const formulaire = {

  prenom:localStorage.getItem("prenom"),
  nom:localStorage.getItem("nom"),
  email:localStorage.getItem("email"),
  telephone:localStorage.getItem("telephone"),
  adresse:localStorage.getItem("adresse"),
  ville:localStorage.getItem("ville"),
  codepostal:localStorage.getItem("codepostal")
}
console.log(formulaire);

//Mettre les valeurs du formulaire et les produits séléctionnés dans un objet é envoyer vers le serveur
const tousEnvoyer = {
  produitEnregistreDanslocalStorage,
  formulaire
}
console.log(tousEnvoyer);

})



