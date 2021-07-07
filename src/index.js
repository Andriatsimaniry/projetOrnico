const affichageTeddyImage = document.querySelector(".card1");

const Promise1 = fetch("http://localhost:3000/api/teddies"); 
  Promise1.then((response) => {
    console.log(response);

    const teddiesData = response.json();

    console.log(teddiesData);

    

    teddiesData.then((utileTeddy) =>{
      console.log(utileTeddy);

      
    
    
 
   
//déclaration des variables et Mettre les données Teddy de l'Api dans des variables
let i = [];
let name = [];
let _id = [];
let description = [];
let price = [];
let imageUrl = [];
let structureTeddies = "";



// fonction qui va afficher les produits dans la page web automatiquement

function affichageProduits(utileTeddy){
  //selection élément du Dom
  const positionElement = document.querySelector(".container");
  console.log(positionElement);

  //La boucle pour afficher tous les objets dans la page web
  for (i = 0; i < utileTeddy.length; i++) {
    utileTeddy.forEach((element,i) => {
      name[i] = element.name;
      _id [i] = element._id;
      description[i] = element.description;
      price [i] = element.price;
      imageUrl [i] = element.imageUrl;
    
    });  
//<a href="./produit.html?id=${_id[i]}">
//Afficher tous les objets sur la page web
//<a class="cart-item-thumb mx-auto mr-sm-4" href="#"><img src="${imageUrl[i]}" alt="Product"></a>
structureTeddies = structureTeddies + ` 
<div class="row">
      <div class="col-xl-12 col-md-12">
        <h2 class="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary"><a class="font-size-sm" href="panier.html"><span>Panier</span></a>
      </div>
            <!-- Item-->
            <div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
                <div class="media d-block d-sm-flex text-center text-sm-left">
                    <a class="cart-item-thumb mx-auto mr-sm-4" href="./produit.html?id=${_id[i]}"><img src="${imageUrl[i]}" alt="Product"></a>
                    <div class="media-body pt-3">
                        <h3 class="product-card-title font-weight-semibold border-0 pb-0">Nom : <span class="text-muted mr-2"><a href="#">${name[i]}</span></a></h3>
                        <div class="font-size-sm font-weight-semibold">id : <span class="text-muted mr-2">${ _id [i]}</span></div>
                        <div class="font-size-sm font-weight-semibold">Description : <span class="text-muted mr-2">${description[i]}</span></div>
                        <div class="font-size-lg text-primary pt-2">Prix : <span class="text-muted mr-2">${price[i]/100}€</span></div>
                    </div>
                </div>
            </div>    
                <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left" style="max-width: 10rem;">
                    <a href="./produit.html?id=${_id[i]}">
                    <button class="btn btn-outline-primary btn-sm btn-block mb-2" type="button">
                     Choisir Une Option</button></a>
                </div>
  </div>           
      `;
  
  //injection html
  positionElement.innerHTML = structureTeddies;
  
  }
}
affichageProduits(utileTeddy);
      

    
      
    }); 
    
    })
  .catch((erreur) => 
      console.log(erreur));

      