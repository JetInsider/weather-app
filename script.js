const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const tempEle = document.querySelector('.temperature');
const windEle = document.getElementById('windSpeedVal');
const apiKey = "56f4a4dac3f9a06314d5263fecb00e7e";
const humidityEle = document.getElementById('humidityVal');
const placeNameEle = document.querySelector('.place')

const searchBtn = document.getElementById('search-btn');
const inputElement = document.getElementById('inputPlace');
const mainAreaSection = document.getElementById('main-area');

const imageEle = document.querySelector('.weather-images');

//Adding Event Listener
searchBtn.addEventListener('click', () => {
    const place = inputElement.value.toLowerCase();
    fetchData(place);
});

//API Work
async function fetchData(place){
    
    try{
        
        const response = await fetch(apiUrl + `&q=${place}` + `&appid=${apiKey}`)
        const data = await response.json();

        if(response.ok){
            console.log(data);
            inputElement.value = "";
            // mainAreaSection.style.display = 'block';
            mainAreaSection.classList.add('show');
            placeNameEle.innerHTML = place.charAt(0).toUpperCase() + place.slice(1);
            tempEle.innerHTML = Math.round(data.main.temp) + "°C";
            windEle.innerHTML = Math.round(data.wind.speed) + " Km/h";
            humidityEle.innerHTML = Math.round(data.main.humidity) + "%";

            if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n" ||
                data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ||
                data.weather[0].icon === "10d" || data.weather[0].icon === "10n"
            ){
                imageEle.src = "/assets/images/rain.png";
            }

            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                imageEle.src = "/assets/images/snow.png";
            }

            else if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
                imageEle.src = "/assets/images/clear.png";
            }

            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                imageEle.src = "/assets/images/mist.png";
            }

            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n" ||
                    data.weather[0].icon === "03d" || data.weather[0].icon === "03n" ||
                    data.weather[0].icon === "04d" || data.weather[0].icon === "04n"
            ){
                imageEle.src = "/assets/images/cloud.png";
            }
            
        }

        else{
            throw new Error('Invalid City Name')
        }
        
    }
    
    catch(error)
    {
        alert("Please enter a Valid City Name")
        console.log(error);
    }
}
