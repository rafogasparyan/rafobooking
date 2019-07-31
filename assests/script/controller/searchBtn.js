let checkIn = document.getElementById("check-in");
let chekOut = document.getElementById("check-out")

addEventListener("click", function(event) {  
  if (event.target.id == "searchBtn") {
    getHotelsByDates()        
  }
})

function getHotelsByDates() {  
  filteredHotels = []  
  let givenDateFrom = new Date(checkIn.value);
  let givenDateTo = new Date(chekOut.value);
  if ((checkIn.value !== "") && (chekOut.value !== "")) {
    for (let i of hotels) {
      if (new Date(i.dateFrom) < givenDateFrom && new Date(i.dateTo > givenDateTo)) {
        filteredHotels.push(i)
      }
    }
  }

  if (filteredHotels.length !== 0) {
    hotelsClone = filteredHotels;
    amountOfProperties();
    hotelTamplets.innerHTML = filteredHotels.map(cardForHotel).join("");        
  }  
    
}