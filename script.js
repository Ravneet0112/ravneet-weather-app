const city_nameEl = document.querySelector(".city_name");
const dateEl = document.getElementsByClassName('date');
const currentTempEl = document.getElementById('currentTemp');
const weatherForecast = document.getElementById("weather-forecast");
const humidityEL = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const temperatureEl = document.querySelector(".temp");
const cityEl = document.querySelector(".cityname");
const dateformatEl = document.querySelector(".dateformat")
const iconEl = document.querySelector(".icon")
const valueEL = document.querySelector("#value");

const API_Key = 'b6bcdc4a998ff756004ea7d2db89078c';
var city = []
var place = document.getElementById('value').value;

window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${API_Key}`;

            fetch(url).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                cityEl.innerHTML = data.name;
        

        dateformatEl.innerHTML = new Date().toLocaleDateString();

        temperatureEl.innerText = 'Temp: ' + Math.floor(data.main.temp - 273) + ' °C';

        windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed * 60) + ' MPH';

        humidityEL.innerHTML = 'Humidity: ' + data.main.humidity + ' %';
                
            })
        })
    }
})


setInterval(() => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getUTCMonth();
    const date = time.getDate();

    const day = time.getDay();
});

function searchByCity() {
    var place = (document.getElementById('value').value.toUpperCase());
    var urlsearch = `http://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${API_Key}`;

    var cast = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&excude=hourly&appid=${API_Key}`;

   // var futureurl = `https.//api.openweathermap.org/data/2.5/forecast?q=${place}& + appid=${API_Key}`
    if (city.includes(place)===false){
    city.push(place);
    localStorage.setItem("city", JSON.stringify(city));
    }
    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        getWeatherData(data)
        futureTemp(data)
    })
    city_nameEl.innerHTML = "";
}
    
    function getWeatherData(data) {
        cityEl.innerHTML = data.name;
        //city_nameEl.append(button)

        dateformatEl.innerHTML = new Date().toLocaleDateString();

        temperatureEl.innerText = 'Temp: ' + Math.floor(data.main.temp - 273) + ' °C';

        windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed * 60) + ' MPH';

        humidityEL.innerHTML = 'Humidity: ' + data.main.humidity + ' %';


       
    }

function displayCityhistory(){
    city_nameEl.innerHTML = ""
    //localStorage.setItem("city", JSON.stringify(city));
   /* if (localStorage.getItem("city")) {
        city = JSON.parse((localStorage.getItem("city").toLocaleUpperCase()));
        console.log(city);
    }*/
    
    city = JSON.parse((localStorage.getItem("city").toLocaleUpperCase()))
    console.log(city);
    for(i = 0; i< city.length; i++){
        var button = document.createElement('button')
        button.classList = city[i]+" button";
        button.textContent = city[i]
        console.log(button)
    }
   city_nameEl.append(button)
   searchByCity()

}
displayCityhistory()


function futureTemp(data) {

    var place = document.getElementById('value').value;
    var cast = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&excude=hourly&appid=${API_Key}`;

    fetch(cast).then(res => {
        return res.json()
    }).then((data) => {
        console.log(data);

        document.querySelector('.weather-forecast').innerHTML = ''
        for (let i = 7; i < data.list.length; i += 8) {
            console.log(data.list[i]);
            let div = document.createElement('div');
            div.setAttribute('class', 'weather-forecast-item');

            let day = document.createElement('h4');
            day.setAttribute('class', 'date')
            day.innerText = new Date(data.list[i].dt_txt).toLocaleDateString();
            div.appendChild(day);

            /*let description= document.createElement('p');
            description.setAttribute('class','desc')
            description.innerText= forecast.list[i].weather[0].description;
            div.appendChild(description);*/

            let temp = document.createElement('h4');
            temp.innerText = 'Temp: ' + Math.floor((data.list[i].main.temp - 273)) + ' °C';
            div.appendChild(temp)

            // let icon = document.createElement('img');
            //icon.innerText = <img src="http://openweathermap.org/img/wn/${forecast.list[i]weather[0].icon}@2x.png" alt="weather icon" class="w-icon"></img>
            // div.appendChild(img)

            //  var icon = forecast.list[i].weather[0].icon;
            var icon = document.createElement('img');
            let iconurl = "https://api.openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
            iconEl.scr = iconurl;




            let wind = document.createElement('h4');
            wind.setAttribute('class', 'wind')
            wind.innerText = 'Wind: ' + Math.floor(data.list[i].wind.speed * 60) + ' MPH';
            div.appendChild(wind);

            let humidity = document.createElement('h4');
            humidity.setAttribute('class', 'humidity')
            humidity.innerText = 'Humidity: ' + data.list[i].main.humidity + ' %';
            div.appendChild(humidity);



            document.querySelector('.weather-forecast').appendChild(div)
        }
    })
}

futureTemp();
//getWeatherData()
/*
window.addEventListener("load", getWeatherData)

function getWeatherData() {

    navigator.geolocation.getCurrentPosition((success) => {
        let lon = success.coords.longitude;
        let lat = success.coords.latitude;
        console.log(lon, lat)
        /*
        const url = `https://api.openweather.org/data/2.5/weather?q=toronto&appid=b6bcdc4a998ff756004ea7d2db89078c`*/

        
        //showWeatherData(valueEL.value);
        //futureTemp(valueEL.value);
    

/*

function showWeatherData(cityname) {
    // var place = document.getElementById('input').value;
    var urlcast = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&excude=hourly&appid=${API_Key}`;


    fetch(urlcast).then(res => {
        return res.json()
    }).then((data) => {
        console.log(data);
        //currentTemp(forecast);

        cityEl.innerHTML = data.city.name;

        dateformatEl.innerHTML = new Date(data.list[0].dt_txt).toLocaleDateString();

        let iconEl = data.list[0].weather[0].icon;
        let iconurl = "https://api.openweathermap.org/img/w/" + iconEl + ".png";
        iconEl.scr = iconurl;

        temperatureEl.innerText = 'Temp: ' + Math.floor(data.list[0].main.temp - 273) + ' °C';

        windEl.innerHTML = 'Wind: ' + Math.floor(data.list[0].wind.speed * 60) + ' MPH';

        humidityEL.innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';


    })
}

function futureTemp(cityname) {

    var urlcast = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&excude=hourly&appid=${API_Key}`;

    fetch(urlcast).then(res => {
        return res.json()
    }).then((data) => {
        console.log(data);

        document.querySelector('.weather-forecast').innerHTML = ''
        for (let i = 7; i < data.list.length; i += 8) {
            console.log(data.list[i]);
            let div = document.createElement('div');
            div.setAttribute('class', 'weather-forecast-item');

            let day = document.createElement('h4');
            day.setAttribute('class', 'date')
            day.innerText = new Date(data.list[i].dt_txt).toLocaleDateString();
            div.appendChild(day);

            /*let description= document.createElement('p');
            description.setAttribute('class','desc')
            description.innerText= forecast.list[i].weather[0].description;
            div.appendChild(description);

            let temp = document.createElement('h4');
            temp.innerText = 'Temp: ' + Math.floor((data.list[i].main.temp - 273)) + ' °C';
            div.appendChild(temp)

            // let icon = document.createElement('img');
            //icon.innerText = <img src="http://openweathermap.org/img/wn/${forecast.list[i]weather[0].icon}@2x.png" alt="weather icon" class="w-icon"></img>
            // div.appendChild(img)

            //  var icon = forecast.list[i].weather[0].icon;
            var icon = document.createElement('img');
            let iconurl = "https://api.openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png";
            iconEl.scr = iconurl;




            let wind = document.createElement('h4');
            wind.setAttribute('class', 'wind')
            wind.innerText = 'Wind: ' + Math.floor(data.list[i].wind.speed * 60) + ' MPH';
            div.appendChild(wind);

            let humidity = document.createElement('h4');
            humidity.setAttribute('class', 'humidity')
            humidity.innerText = 'Humidity: ' + data.list[i].main.humidity + ' %';
            div.appendChild(humidity);



            document.querySelector('.weather-forecast').appendChild(div)
        }
    })
}*/


