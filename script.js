const city_nameEl = document.querySelector(".city_name");
const dateEl = document.getElementsByClassName('date');
const currentTempEl = document.getElementById('currentTemp');
const weatherForecast = document.getElementById("weather-forecast");
const humidityEL = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const temperatureEl = document.querySelector(".temp");
const cityEl = document.querySelector(".cityname");


const API_Key = 'b6bcdc4a998ff756004ea7d2db89078c';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();

    const day = time.getDay();
},1000);

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) =>{ 
        let lon=success.coords.longitude;
        let lat = success.coords.latitude;   
        console.log(lon, lat)
        /*
        const url = `https://api.openweather.org/data/2.5/weather?q=toronto&appid=b6bcdc4a998ff756004ea7d2db89078c`*/

        const url = `https://api.openweathermap.org/data/2.5/forecast/?q=Brampton,ON,CA&excude=hourly&appid=${API_Key}`
        
        fetch(url).then(res => {
            return res.json()}).then((data) => {
        console.log(data)
        return data
        });
        showWeatherData();
        futureTemp();
        })
    }

    function showWeatherData(data) {

        var urlcast = `https://api.openweathermap.org/data/2.5/forecast/?q=brampton&excude=hourly&appid=${API_Key}`;

        fetch(urlcast).then(res=>{
            return res.json()
        }).then((forecast)=>{
            console.log(forecast);
            //currentTemp(forecast);

            cityEl.innerHTML = forecast.city.name;

            dateEl.innerHTML = forecast.list[0].dt_txt;

            temperatureEl.innerText = 'Temp: ' + Math.floor(forecast.list[0].main.temp - 273) + ' C';

            windEl.innerHTML = 'Wind: ' + Math.floor(forecast.list[0].wind.speed * 60) + ' MPH';

            humidityEL.innerHTML = 'Humidity: ' + forecast.list[0].main.humidity + ' %';

            
        })
    }

    function futureTemp(data) {
        var urlcast = `https://api.openweathermap.org/data/2.5/forecast/?q=brampton&excude=hourly&appid=${API_Key}`;

        fetch(urlcast).then(res=>{
            return res.json()
        }).then((forecast)=>{
            console.log(forecast);

            document.querySelector('.weather-forecast').innerHTML=''
            for (let i = 8; i < forecast.list.length; i+=8) {
                console.log(forecast.list[i]);
                let div= document.createElement('div');
                div.setAttribute('class','weather-forecast-item');
                
                let day= document.createElement('p');
                day.setAttribute('class','date')
                day.innerText= new Date(forecast.list[i].dt*1000);
                div.appendChild(day);

                /*let description= document.createElement('p');
                description.setAttribute('class','desc')
                description.innerText= forecast.list[i].weather[0].description;
                div.appendChild(description);*/
        
                let temp= document.createElement('p');
                temp.innerText= Math.floor((forecast.list[i].main.temp - 273))+ ' °C';
                div.appendChild(temp)
        

                let wind= document.createElement('p');
                wind.setAttribute('class','wind')
                wind.innerText= 'Wind: ' + Math.floor(forecast.list[i].wind.speed * 60) + ' MPH';
                div.appendChild(wind);

                let humidity= document.createElement('p');
                humidity.setAttribute('class','humidity')
                humidity.innerText= 'Humidity: ' + forecast.list[i].main.humidity + ' %';
                div.appendChild(humidity);

                
        
                document.querySelector('.weather-forecast').appendChild(div)
            }
        })
    }

    //.toDateString(undefined,'Asia/Kolkata')