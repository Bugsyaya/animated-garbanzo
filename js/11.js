async function afficherFilms() {

    try {
        const reponse = await fetch("https://api.punkapi.com/v2/beers/11");
        const data = await reponse.json();
        console.log(data);

        // Attribuer les valeurs aux différentes div
        const name = document.getElementById('beerName');
        const brewYear = document.getElementById('firstBrew');
        const ph = document.getElementById('ph');
        const attenuation = document.getElementById('attenuation');
        const boil = document.getElementById('boil');
        const foodPairing = document.getElementById('foodPairing');
        //const dateDegustation = document.getElementById('dateDegustation');
        const description = document.getElementById('description');
        const brewerTip = document.getElementById('brewerTip');
        const contributedBy = document.getElementById('contributedBy');
        const tagLine = document.getElementById('tagLine');

        // modification des données contenues dans les différentes divs
        name.textContent = data[0]['name'];
        brewYear.textContent = data[0]['first_brewed'];
        ph.textContent = data[0]['ph'];
        attenuation.textContent = data[0]['attenuation_level'];
        boil.textContent = data[0]['boil_volume']['value']+' '+data[0]['boil_volume']['unit'];
        foodPairing.textContent = data[0]['food_pairing'];
        //dateDegustation.textContent = data[0]['name'];
        description.textContent = data[0]['description'];
        brewerTip.textContent = data[0]['brewer_tips'];
        contributedBy.textContent = data[0]['contributed_by'];
        tagLine.textContent = data[0]['tagline'];

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    } 
}