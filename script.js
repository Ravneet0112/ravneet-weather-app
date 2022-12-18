const city_nameEl = document.querySelector(".city_name");
const dateEl = document.getElementsByClassName('date');
const currentTempEl = document.getElementById('currentTemp');
const weatherForecast = document.getElementById("weather-forecast");
const humidityEL = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const temperatureEl = document.querySelector(".temp");
const cityEl = document.querySelector(".cityname");
const dateformatEl = document.querySelector(".dateformat")
var iconEl = document.querySelector(".icon")
const valueEL = document.querySelector("#value");

const API_Key = 'b6bcdc4a998ff756004ea7d2db89078c';
var city = []
var place = document.getElementById('value').value;


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            var city = JSON.parse(localStorage.getItem('city'));
            if (city) {
                console.log(city)
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city[city.length-1]}&appid=${API_Key}`;

                fetch(url).then((res) => {
                    return res.json();
                }).then((data) => {
                    console.log(data);
                    cityEl.innerHTML = data.name;


                    dateformatEl.innerHTML = new Date().toLocaleDateString();
                    var icon = data.weather[0].icon;
                    console.log(icon)
                    iconEl.src = "https://openweathermap.org/img/wn/" +data.weather[0].icon+ "@2x.png";
                    
                    //iconEl.src = "http://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png";
                    temperatureEl.innerText = 'Temp: ' + Math.floor(data.main.temp - 273) + ' °C';

                    windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed * 60) + ' MPH';

                    humidityEL.innerHTML = 'Humidity: ' + data.main.humidity + ' %';
                })

                const cast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&` + `lon=${lon}&excude=hourly&appid=${API_Key}`;

                fetch(cast).then(res => {
                    return res.json()
                }).then((forecast) => {
                    console.log(forecast);

                    document.querySelector('.weather-forecast').innerHTML = ''
                    for (let i = 7; i < forecast.list.length; i += 8) {
                        console.log(forecast.list[i]);
                        let div = document.createElement('div');
                        div.setAttribute('class', 'weather-forecast-item');

                        let day = document.createElement('h4');
                        day.setAttribute('class', 'date')
                        day.innerText = new Date(forecast.list[i].dt_txt).toLocaleDateString();
                        div.appendChild(day);

                        let temp = document.createElement('h4');
                        temp.innerText = 'Temp: ' + Math.floor((forecast.list[i].main.temp - 273)) + ' °C';
                        div.appendChild(temp)


                        //  var icon = forecast.list[i].weather[0].icon;
                        var iconEl = document.createElement('img');
                        iconEl.src = "https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png";
                        http://openweathermap.org/img/wn/10d@2x.png
                       // let iconurl = "https://api.openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png";
                        console.log(forecast.list[i].weather[0].icon)
                       // iconEl.src = iconurl;
                       div.appendChild(iconEl)




                        let wind = document.createElement('h4');
                        wind.setAttribute('class', 'wind')
                        wind.innerText = 'Wind: ' + Math.floor(forecast.list[i].wind.speed * 60) + ' MPH';
                        div.appendChild(wind);

                        let humidity = document.createElement('h4');
                        humidity.setAttribute('class', 'humidity')
                        humidity.innerText = 'Humidity: ' + forecast.list[i].main.humidity + ' %';
                        div.appendChild(humidity);



                        document.querySelector('.weather-forecast').appendChild(div)
                    }

                })
            }
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
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${API_Key}`;

    var cast = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&excude=hourly&appid=${API_Key}`;

    // var futureurl = `https.//api.openweathermap.org/data/2.5/forecast?q=${place}& + appid=${API_Key}`
    if (city.includes(place) === false) {
        city.push(place);
        localStorage.setItem("city", JSON.stringify(city));
    }
    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        getWeatherData(data.name)
        futureTemp(data.name)

        //city_nameEl.innerHTML = "";
    })
}

function getWeatherData(place) {

    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${API_Key}`;

    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        cityEl.innerHTML = data.name;
        //city_nameEl.append(button)
        iconEl.src = "https://openweathermap.org/img/wn/" +data.weather[0].icon+ "@2x.png"
        dateformatEl.innerHTML = new Date().toLocaleDateString();

        temperatureEl.innerText = 'Temp: ' + Math.floor(data.main.temp - 273) + ' °C';

        windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed * 60) + ' MPH';

        humidityEL.innerHTML = 'Humidity: ' + data.main.humidity + ' %';
    })

}

function displayCityhistory() {
    city_nameEl.innerHTML = ""

    city = JSON.parse((localStorage.getItem("city").toLocaleUpperCase()))
    console.log(city);
    var result = city.filter(function (cityn) {
        return cityn !== "";
    })
    console.log(result)


    for (i = 0; i < result.length; i++) {
        var button = document.createElement('button')
        button.classList = "citybutton";

        button.textContent = result[i]
        console.log(button)
        city_nameEl.append(button)
        //   city_nameEl.addEventListener("click", searchByCity(city_nameEl))
    }
    var btn = document.querySelectorAll('.citybutton');
    for (i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", myFunction);
    }
    // city_nameEl.append(button)
    searchByCity()
}

function myFunction() {
    console.log(this.textContent)
    place = this.textContent;
    getWeatherData(place);
    futureTemp(place);
}

displayCityhistory()


function futureTemp(place) {
    console.log(place)
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

            let temp = document.createElement('h4');
            temp.innerText = 'Temp: ' + Math.floor((data.list[i].main.temp - 273)) + ' °C';
            div.appendChild(temp)


            //  var icon = forecast.list[i].weather[0].icon;
            var iconEl = document.createElement('img');
            iconEl.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                        
            console.log(data.list[i].weather[0].icon);
                       
            div.appendChild(iconEl);




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

