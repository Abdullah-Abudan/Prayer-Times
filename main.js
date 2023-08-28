axios.get("./cities.json")
.then((cities) => {
cities.data.map(city=>{
    const cities =  `<option value="${city.ar}">${city.ar}</option>`;
    document.getElementById("cities-select").innerHTML += cities
})        
})

document.getElementById("cities-select").addEventListener("change",(e)=>{
    document.getElementById("city-name").innerHTML =e.target.value
    axios.get("./cities.json")
    .then((cities) => {
        
    for(city of cities.data){
        if(city.ar == e.target.value ){
            console.log(city.ar);
            enName = city.en // Gets the English name to be passed to the function
        }
    }
    getPrayersTimingsOfCity("PS",enName)            
    })

})

function getPrayersTimingsOfCity(country,city){
const params = {
    country:country,
    city: city
}; 

axios.get('https://api.aladhan.com/v1/timingsByCity', {
    params: params
})
.then((response) => {
    const azan = response.data.data.timings
    fillTimeForPrayer("fajr-time",azan.Fajr)
    fillTimeForPrayer("sunrisr-time",azan.Sunrise)
    fillTimeForPrayer("dhuhr-time",azan.Dhuhr)
    fillTimeForPrayer("asr-time",azan.Asr)
    fillTimeForPrayer("sunset-time",azan.Sunset)
    fillTimeForPrayer("isha-time",azan.Isha)

    const day = response.data.data.date.hijri.weekday.ar
    const month= response.data.data.date.hijri.day
    const hijriMonth= response.data.data.date.hijri.month.ar

    const date = response.data.data.date.gregorian.date
    document.getElementById("date").innerHTML = `${day} ${month} ${hijriMonth}`
})
.catch((error) => {
    console.log(error.message);
})        
}
getPrayersTimingsOfCity("PS","Gaza City") // DEFAULT VALUE            

function fillTimeForPrayer(id,time){ //To not repeat the document, I used the function
    document.getElementById(id).innerHTML = time
}