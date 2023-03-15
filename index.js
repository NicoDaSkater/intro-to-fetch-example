function main() {

    // HTML Elements
    const astroImageEl = document.querySelector("#astro-image");
    const latitudeEl = document.querySelector("#latitude");
    const longitudeEl = document.querySelector("#longitude");
    const sunriseEl = document.querySelector("#sunrise");
    const sunsetEl = document.querySelector("#sunset");

    // URLS to fetch from
    // 'https://go-apod.herokuapp.com/apod'
    // 'https://api.sunrise-sunset.org/json'


    // Astronomical Image



    /*
    1.fetch
    2.respons.json()
    3.use data
    4. catch any errors an console.log() them
    */

    // Fetch for the astronomical image here
    const fetchPromise = fetch('https://go-apod.herokuapp.com/apod');
    // fetch returns a Promise object
    console.log(fetchPromise); // prints [object Promise] { ... }
    const dataPromise = fetchPromise.then((response) => {
        return response.json();
    })
    dataPromise.then((data) => {
        astroImageEl.src = data.hdurl
    })

    /* Condenced
    fetch('https://go-apod.herokuapp.com/apod')
        .then(response => response.json())
        .then(data => {
            astroImageEl.src = data.hdurl
        })
        .catch(error => console.log(error))


    */

    // Sunset/Sunrise 

    latitudeEl.innerText = `Latitude: Loading...`;
    longitudeEl.innerText = `Longitude: Loading...`;
    sunriseEl.innerText = `Sunrise: Loading...`;
    sunsetEl.innerText = `Sunset: Loading...`;

    // use the navigator API to get your device's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('My General Position:', position);
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            latitudeEl.innerText = `Latitude: ${lat}`;
            longitudeEl.innerText = `Longitude: ${long}`;
            console.log(lat, long)
            // Fetch sunrise/sunset data here
            fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`)
                .then(response =>response.json())
                .then(data => {
                    sunriseEl.innerText = `Sunrise: ${data.results.sunrise}`
                    sunsetEl.innerText  = `Sunset: ${data.results.sunset}`
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }

    
}

main()