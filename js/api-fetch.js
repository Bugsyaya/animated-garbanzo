const apiUrl = 'https://api.punkapi.com/v2/beers/10';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur de réseau (statut ${response.status})`);
        }

        return response.json();
    })
    .then(data => {
        document.getElementById("name").innerHTML = data[0]["name"];
        document.getElementById("img").src = data[0]["image_url"];
        document.getElementById("first-brewed").innerHTML = data[0]["first_brewed"];
        document.getElementById("ph").innerHTML = data[0]["ph"];
        document.getElementById("attenuation_level").innerHTML = data[0]["attenuation_level"];
        document.getElementById("boil-volume").innerHTML = data[0]["boil_volume"].value + " " + data[0]["boil_volume"].unit;
        let line;
        for (const food in data[0]["food_pairing"]) {
            line = "<li>" + data[0]["food_pairing"][food] + "</li>";
            document.getElementById("food_pairing-list").innerHTML += line;
        }
        document.getElementById("food_pairing-list").innerHTML
        document.getElementById("tagline").innerHTML = data[0]["tagline"];
        document.getElementById("description").innerHTML = data[0]["description"];
        document.getElementById("brewers_tips").innerHTML = data[0]["brewers_tips"];
        document.getElementById("contributed_by").innerHTML = data[0]["contributed_by"];
        const maltsRow = document.getElementById('malts');
        const hopsRow = document.getElementById('hops');
        document.getElementById('yeast').innerHTML = data[0]["ingredients"]["yeast"];
        for (const item of data[0]["ingredients"]["malt"]) {
            maltsRow.insertAdjacentHTML('afterend', `
                <tr>
                    <td></td>
                    <td>${item.name}</td>
                    <td>${item.amount.value} ${item.amount.unit}</td>
                </tr>
            `);
        }
        for (const item of data[0]["ingredients"]["hops"]) {
            hopsRow.insertAdjacentHTML('afterend', `
                <tr>
                    <td></td>
                    <td>${item.name}</td>
                    <td>${item.amount.value} ${item.amount.unit}</td>
                </tr>
            `);
        }
        console.log('Données récupérées:', data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });
