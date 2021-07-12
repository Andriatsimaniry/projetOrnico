//Récupération de la chaine de requêtte dans l'url
const queryString_url_id = window.location.search;
// Pour extraire juste l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
id = urlSearchParams.get("id");
console.log(id);
//Récupération des valeurs d'un id
const Promise2 = fetch("http://localhost:3000/api/teddies/"+id); 
  Promise2.then(async(response) => {
   console.log("response",response);
   try{
    const utileId = await response.json();  
    console.log(utileId);
//Déclaration  des valeurs  id 
 produitName = utileId? utileId.name:"";
 description = utileId? utileId.description:"";
 imageUrl = utileId? utileId.imageUrl:"";
 price = utileId? utileId.price:"";
 colors = utileId? utileId.colors:[""];
 //selection de la classe pour injecter le code dans produit.html
const positionElement2 = document.querySelector(".container-page-teddies");
console.log(positionElement2);
//la structure html pour l'affichage du produit séléctionné
const structureProduit2 = ` 
<div class="col-xl-12 col-md-12">
    <!-- Item-->
    <div class="d-sm-flex justify-content-around my-4 pb-4 border-bottom">
        <div class="media d-block d-sm-flex text-center text-sm-left">
            <a class="cart-item-thumb mx-auto mr-sm-4" href="#"><img src="${imageUrl}" alt="Product"></a>
            <div class="media-body pt-3">
                <h3 class="product-card-title font-weight-semibold border-0 pb-0">Nom : <span class="text-muted mr-2"><a href="#">${produitName}</span></a></h3>
                <div class="font-size-sm font-weight-semibold">id : <span class="text-muted mr-2">${id}</span></div>
                <div class="font-size-sm font-weight-semibold">Description : <span class="text-muted mr-2">${description}</span></div>
                <div class="font-size-lg text-primary pt-2">Prix : <span class="text-muted mr-2">${price/100}€</span></div>
            </div>
        </div>
        <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style="max-width: 10rem;">        
            <form>
            <div class="form-row align-items-center">
              <div class="col-auto my-1 mx-auto">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Préférence</label>
                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">              
                </select>
                <label class="mr-sm-2" for="quantiteProduit">Choisir la Quantité</label>
                <select class="custom-select mr-sm-2" id="quantiteProduit">              
                </select>
              </div>             
            </div>
          </form>   
            <button id="addToCart" class="btn btn-outline-success btn-sm btn-block mb-2" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-1">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>Ajouter au Panier</button>
        </div>
</div>            
 `;
//injection  dans la page produit.html
positionElement2.innerHTML = structureProduit2;
let structureOptions = [];
//La boucle for pour afficher toutes les options de couleur
for (let j = 0; j < colors.length; j++){
    structureOptions = structureOptions + `    
    <option value="${colors[j]}">${colors[j]}</option>                            
    `;
}
//injection  dans la page produit.html pour le choix de couleur dans le formulaire
const positionChoixCouleur = document.querySelector("#inlineFormCustomSelect"); 
 positionChoixCouleur.innerHTML = structureOptions;
console.log(positionChoixCouleur.innerHTML);
//Choisir la quantité de produit
const structureQuantite =`
<option value = "1">1</option>
<option value = "2">2</option>
<option value = "3">3</option>
<option value = "4">4</option>
`;
//Afficher les Qantités dans le formulaire
const positionElementQuantite = document.querySelector("#quantiteProduit");
positionElementQuantite.innerHTML = structureQuantite;
// =================== La Gestion du panier =======================
// La récupération des données séléctionnées par l'utilisateur et envoi du panier
//Séléction de l'id du formulaire
const idForm = document.querySelector("#inlineFormCustomSelect ");
console.log(idForm);
//Séléction du botton Ajouter au Panier
const btn_envoyerPanier = document.querySelector(".btn-outline-success");
console.log( btn_envoyerPanier );
//Ecouter le botton et envoyer le Panier
btn_envoyerPanier.addEventListener("click",(event) =>{
event.preventDefault();
//Mettre le choix de l'utilisateur dans une variable
const choixForm = idForm.value; 
//Mettre la quantité dans une variable
const choixQuantite = positionElementQuantite.value;
//Nombre totale de produit dans le panier


//Récupération des valeurs du formulaire
let optionsProduit = {
    produitName : utileId.name,
    description : utileId.description,
    imageUrl :utileId.imageUrl,
    colors :choixForm,
    price :(utileId.price * choixQuantite) /100,
    id : id,
    quantite:choixQuantite,
} ;
console.log(optionsProduit);   
     // ==================================== Local Storage ====================================
// ==========Stocker la récupération des valeurs du formulaire dans le local storage ===== 
// ====== Déclaration de la variable "produitEnregistreDanslocalStorage" ===========
let produitEnregistreDanslocalStorage = JSON.parse(localStorage.getItem("produit"));
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le localstorage en objet javascript
console.log(produitEnregistreDanslocalStorage);
// Fonction fenêtre pop up
const popupConfirmation = () =>{
    if(window.confirm(`${utileId.name} ,Couleur ${choixForm} a été bien ajouter au panier
consulter le panier OK ou revenir à l'acceuil ANNULER`)){
    window.location.href = "panier.html";
    }else{
    window.location.href = "index.html";
    }
}
// s'il a déjà  des produits enregistré dans le local storage
if(produitEnregistreDanslocalStorage){
    produitEnregistreDanslocalStorage.push(optionsProduit);
    localStorage.setItem("produit", JSON.stringify(produitEnregistreDanslocalStorage));
    console.log(produitEnregistreDanslocalStorage);
    popupConfirmation();
}
// s'il n'y a pas de produit de produit enregistré dans le local storage
else{
    produitEnregistreDanslocalStorage = [];
    produitEnregistreDanslocalStorage.push(optionsProduit);
    localStorage.setItem("produit", JSON.stringify(produitEnregistreDanslocalStorage));    
    console.log(produitEnregistreDanslocalStorage);
    popupConfirmation();
}
});


}catch(e){
    console.log(e);
  }           
})

.catch((erreur) => 
      console.log(erreur));
//Récuperer le nombreTotal dans le localStorage
let nombreTotal = localStorage.getItem("nombreTotal");
console.log("nombreTotal",nombreTotal);
//Choisir l'élément pour afficher le nombre total
const affichageNombreTotal = document.getElementById("container-nombre-total");
affichageNombreTotal.insertAdjacentHTML("afterbegin", nombreTotal);
console.log("affichageNombreTotal",affichageNombreTotal);  



