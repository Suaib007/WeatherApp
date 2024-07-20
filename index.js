
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// Initial variables needs

let oldTab = userTab;
const API_KEY = "e3eac7ba714d37d6f02d5c58f02a026a";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
   if(newTab != oldTab) {
      oldTab.classList.remove("current-tab");
      oldTab=newTab;
      oldTab.classList.add("current-tab");

      if(!searchForm.classList.contains("active")){
         userInfoContainer.classList.remove("active");
         grantAccessContainer.classList.remove("active");
         searchForm.classList.add("active");
      }
      else {
         // main pahle search tab pr tha toh your weather invisible tha or ab muhje your weather tab visible kr na h

         searchForm.classList.remove("active");
         userInfoContainer.classList.remove("active");
         getfromSessionStorage();

      }
   }
}

userTab.addEventListener("click", () => {
   // pass clicked tab as input parameter
   switchTab(userTab);
});

searchTab.addEventListener("click", () => {
   // pass clicked tab as input parameter
   switchTab(searchTab);
});


// check if coordinates are already present in sesson storage
function getfromSessionStorage() {
   const localCoordinates = sessionStorage.getItem("user-coordinates");

   if(!localCoordinates) {
      // agar local coordinates nahi mile
      grantAccessContainer.classList.add("active");
   }
   else {
      const coordinates = JSON.parse(localCoordinates);
      fetchUserWeatherInfo(coordinates);
   }
}

async function fetchUserWeatherInfo(coordinates) {
   const {lat, lon} = coordinates;
   // make grant-location-Access
    grantAccessContainer.classList.remove("active");
   //  make loader visible 
   loadingScreen.classList.add("active");

   // API CALL

   try{
      const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

      const data = await response.json();

      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data);
   }

   catch(err){
      loadingScreen.classList.remove("active");

      console.log("error ko fix kr bhai",  err);
   }
}

function renderWeatherInfo(weatherInfo) {
   // firstly, we have to fetch the elements

   const cityName = document.querySelector("[data-cityName]");
   const countryIcon = document.querySelector("[data-countryIcon]");
   const desc = document.querySelector("[data-weatherDesc]");
   const weatherIcon = document.querySelector("[data-weatherIcon]");
   const temp = document.querySelector("[data-temp]");
   const windspeed = document.querySelector("[data-windspeed]");
   const humidity = document.querySelector("[data-humidity]");
   const cloudiness = document.querySelector("[data-cloudiness]");

   // fetch values from weatherInfo object and put it UI elements

   cityName.innerHTML = weatherInfo?.name;
   countryIcon.src = `http://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   desc.innerHTML = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}.png`;
   temp.innerHTML = `${weatherInfo?.main?.temp} °C`;
   windspeed.innerHTML =`${ weatherInfo?.wind?.speed} m/s`;
   humidity.innerHTML = `${weatherInfo?.main?.humidity}%`;
   cloudiness.innerHTML = `${weatherInfo?.clouds?.all}%`;

  
}


function getLocation() {
   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   }

   else {
      alert("Geolocation is not supported by this browser.");
   }
}


function showPosition(position) {

   const userCoordinates = {

      lat: position.coords.latitude,
      lon: position.coords.longitude
   }

   sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
   fetchUserWeatherInfo(userCoordinates);

}


const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    
   catch(err) {
      console.log("kahi toh error h bhai found kr", err);
   }
}








/*  .......... ........... ........

console.log("HEllo Mr.Black");

const API_KEY = "e3eac7ba714d37d6f02d5c58f02a026a";

function renderWeatherInfo(data){
      let newPara = document.createElement('p');
      newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
   
      document.body.appendChild(newPara);
}

async function fetchWeatherDetails() {
   try {
      let city = "goa";
   
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
   
      const data = await response.json();

      console.log("Weather data:-> ", data);
   
      
      
      renderWeatherInfo(data);

   }
   catch(err){
      console.log("Error toh h bhai:-> ", err);
   }
}

async function getCustomWeatherDetails() {
   try {
      let latitude = 15.6333;
      let longitude = 18.3333;
   
      let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
   
      let data = await result.json();
      console.log(data);
   }
   catch(err){
      console.log("Error toh h bhai:-> ", err);
   }
}


function switchTab(clickedTab){

   apiErrorContainer.classList.remove("active");

   if(clickedTab !== currentTab) {
      currentTab.classList.remove = ("current-tab");
      currentTab = clickedTab;
      currentTab.classList.add("current-tab");

      if(!searchForm.classList.contains("active")) {
         userInfoContainer.classList.remove("active");
         grantAccessContainer.classList.remove("active");
         searchForm.classList.add("active");
      }
      else {
         searchForm.classList.remove("active");
         userInfoContainer.classList.remove("active");
         // getFromSessionStorage();
      }

      // console.log("Current Tab" ,currentTab);
   }
}

function getLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
   } else {
      console.log("Geolocation is not supported by this browser.");
   }
}

function showPosition(position) {
   let lat = position.coords.latitude;
   let long = position.coords.longitude;

   console.log(lat);
   console.log(long);
}


........   .................*/