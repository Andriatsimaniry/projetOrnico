//Récupération de l'id de la commande (provenant du serveur) dans le local storage
const responseId = localStorage.getItem("orderId");
console.log(`responseId : ${responseId}`);

//récupération du prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");
console.log(`prixTotal : ${prixTotal}`);

//La structure HTML de la page confirmationCommande
const positionElement5 = document.querySelector(
  "#container-recapitulatif-commande"
);
const structureConfirmation = `
    <div class="card-body">
      <p class="gras" >Merci pour votre Commande</p>
      <p>Votre Commande numéro :  <span class="gras">${responseId}</span>  a bien été prise en compte</p>
      <p>Le montant de votre Commande est de :  <span class="gras">${prixTotal}</span></p>
      <p class="gras">Au plaisir de vous revoir</p>
      <a href="./index.html" class="btn btn-primary">Revenir à l'Acceuil</a>
    </div>
`;

//Injection HTML
positionElement5.insertAdjacentHTML("afterbegin", structureConfirmation);

//Effacer tout le local storage
function enleverCleLocalStorage(key) {
  localStorage.removeItem(key);
}
enleverCleLocalStorage("prixTotal");
enleverCleLocalStorage("produit");
enleverCleLocalStorage("orderId");

//Remise à 0 nombreTotal
localStorage.setItem("nombreTotal", 0);
