//déclaration des variables et Mettre les données Teddy de l'Api dans des variables

let produitName = "";
let _id = "";
let description = "";
let price = 0;
let imageUrl = "";
let structureTeddies = "";



//Récupération de la chaine de requêtte dans l'url
const queryString_url_id = window.location.search;

// Pour extraire juste l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");



//Récupération des valeurs d'un id

const Promise2 = fetch("http://localhost:3000/api/teddies/"+id); 
  Promise2.then((response) => {
   console.log(response);

    const teddiesId = response.json();

  
    teddiesId.then((utileId) =>{
    console.log(utileId);

    //Déclaration  des valeurs  id 

    produitName = utileId? utileId.name:"";
    description = utileId? utileId.description:"";
    imageUrl = utileId? utileId.imageUrl:"";
    price = utileId? utileId.price:"";
    colors = utileId? utileId.colors:[""];
    console.log(colors);

    //selection de la classe pour injecter le code html

const positionElement2 = document.querySelector(".container-page-teddies");
console.log(positionElement2);
 
//la structure html pour l'affichage du produit séléctionné

const structureProduit2 = ` 
<div class="row">
<div class="col-xl-12 col-md-12">
    <h2 class="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary"><span>Produit</span><a class="font-size-sm" href="index.html"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left" style="width: 1rem; height: 1rem;"><polyline points="15 18 9 12 15 6"></polyline></svg>Continuez votre Achat</a></h2>
    <!-- Item-->
    <div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
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
              <div class="col-auto my-1">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Préférence</label>
                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                  
                </select>
              </div>
              
            </div>
          </form>
            
            <button class="btn btn-outline-success btn-sm btn-block mb-2" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-1">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>Ajouter au Panier</button>
        </div>
</div>
                 
    
         `
         ;

    //injection  dans la page produit.html
positionElement2.innerHTML = structureProduit2;


 

// =================== La Gestion du panier =======================

// La récupérration des données séléctionnées par l'utilisateur et envoi du panier
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
console.log(choixForm);


//Récupération des valeurs du formulaire
let optionsProduit = {
    produitName : utileId.name,
    description : utileId.description,
    imageUrl :utileId.imageUrl,
    colors :choixForm.colors,
    price : utileId.price /100
}    
    console.log(optionsProduit);

});

let structureOptions = [];

//La boucle for pour afficher toutes les options de couleur
for (let j = 0; j < colors.length; j++){
    structureOptions = structureOptions +
    `
    
    <option value="${colors[j]}">${colors[j]}</option>
                            
    `;
}

console.log(structureOptions);


//injection  dans la page produit.html pour le choix de couleur dans le formulaire
const positionChoixCouleur = document.querySelector("#inlineFormCustomSelect");


 
 positionChoixCouleur.innerHTML = structureOptions;
 
console.log(structureOptions);
 



});



})

    


 













