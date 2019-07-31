let hotelTamplets = document.getElementById("hotels");
let hotelsClone = hotels.splice();
let filteredHotels;
let hash;
let itemsToClick = [];
let propCount = document.getElementsByClassName("propertiesCount");

function getHash() {
  hash = location.hash.split("#").join("").split(/[a-z]/).join("").split("/")
}

function getHotels() {
  getHash();
  hotelsClone = hotels.slice();
  hotelTamplets.innerHTML = "";
  for (let k = 0; k < hash.length - 1; k++) {
    let d = JSON.parse(hash[k]); 
    filteredHotels = [];
    for (let i of d) {
      hotelsClone.map(item => {
        if (Object.values(item).includes(qaunt[i].value)) {
          filteredHotels.push(item)
        }
      })
    }
    hotelsClone = filteredHotels;
  }
  hotelTamplets.innerHTML = hotelsClone.map(cardForHotel).join("");    
}


function getFilters() {    
  for (let i = 0; i < qaunt.length; i++) {
    if (qaunt[i].checked !== true) {      
      qaunt[i].click()
      if (hotelTamplets.innerHTML == "") {
        qaunt[i].classList.add("d-none");        
      } else {
        qaunt[i].classList.remove("d-none");        
      }
      qaunt[i].click();
    }    
  }
}


function getPropertiesCount() {
  for (let i = 0; i < qaunt.length; i++) {
    if (qaunt[i].checked !== true) {
      qaunt[i].click();
      propCount[i].innerHTML = "(" + hotelsClone.length + ")";
      qaunt[i].click();
    } else {
      propCount[i].innerHTML = "";      
    }
  }
}
 
function amountOfProperties() {
  document.getElementById("amountOfHotels").innerText =
    "Yerevan : " + hotelsClone.length + " properties found";    
}
  
