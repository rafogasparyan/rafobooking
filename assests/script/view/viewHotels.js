function cardForHotel(item) {  
  return `
    <div class="card">
      <div class="d-flex">
        <div class="img-square-wrapper">
          <img class="" src="${item.img}" alt="Card image cap">
        </div>
        <div class="card-body">
          <div class="row card-title">
            <h4 class="col-auto">${item.name}</h4>
            <p class="ml-auto">Rat. <span class="bg-primary p-1">${
              item.rating
            }</span></p>
          </div>          
          <p>${item.propertyType}</p>
          <p class="card-text">${item.funThings}</p>
          <div class="text-right">
            <button class="btn btn-primary">Show prices</button>
        </div>        
        </div>        
      </div>      
    </div>
  `;
}

let listOfHotels = document.getElementById("hotels");
listOfHotels.innerHTML = hotels.map(cardForHotel).join("");