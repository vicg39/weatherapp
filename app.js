window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description')
    let tempDegree = document.querySelector('.temp-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let degreeSection = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.temperature span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/fbad9835844189bb11501c72a3179965/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently; 
                    // set DOm elements from API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // formula for temp celsius
                    let celsius = (temperature - 32) * (5 / 9)
                    // set icons
                    setIcons(icon, document.querySelector('.icon'));

                    // change temp to celsius
                    degreeSection.addEventListener('click', () => {
                        if(tempSpan.textContent === "F"){
                            tempSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius);
                        }else
                            tempSpan.textContent = "F";
                            tempDegree.textContent = temperature;
                    })
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});