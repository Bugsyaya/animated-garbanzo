var currentBeer = 12;
const nbBeer = 325;

const beerName = document.getElementById('beer-name');
const beerImage = document.getElementById('beer-image');
const firstBrewed = document.getElementById('first-brewed');
const ph = document.getElementById('ph');
const attenuationLevel = document.getElementById('attenuation-level');
const boilVolume = document.getElementById('boil-volume');
const foodPairingUl = document.getElementById('food-pairing-ul');
const tagline = document.getElementById('tagline');
const ingredientsTable = document.getElementById('ingredients-table');
var maltIngredients = document.getElementById('malt-ingredients');
var hopsIngredients = document.getElementById('hops-ingredients');
const yeast = document.getElementById('yeast');
const description = document.getElementById('description');
const brewersTips = document.getElementById('brewers-tips');
const contributedBy = document.getElementById('contributed-by');

updatePage();

function prevBeer() {
  if (currentBeer > 1) {
    currentBeer--;
    updatePage();
  }
}

function nextBeer() {
  if (currentBeer < nbBeer) {
    currentBeer++;
    updatePage();
  }
}

function updatePage() {
  fetch('https://api.punkapi.com/v2/beers/' + currentBeer)
    .then(response => response.json())
    .then(data => {
      beerName.innerHTML = data[0].name;
      beerImage.src = data[0].image_url;
      firstBrewed.innerHTML = 'First brewed: ' + data[0].first_brewed;
      ph.innerHTML = 'PH: ' + data[0].ph;
      attenuationLevel.innerHTML = 'Attenuation level: ' + data[0].attenuation_level;
      boilVolume.innerHTML = 'Boil volume: ' + data[0].boil_volume.value + ' ' + data[0].boil_volume.unit;
      foodPairingUl.innerHTML = '';
      data[0].food_pairing.forEach(element => {
        foodPairingUl.innerHTML += '<li>' + element + '</li>';
      });
      tagline.innerHTML = data[0].tagline;
      ingredientsTable.innerHTML = '<tr id="malt-ingredients"><td>Malt</td><td></td><td></td></tr><tr id="hops-ingredients"><td>Hops</td><td></td><td></td></tr><tr><td>Yeast</td><td id="yeast">Wyeast 1056 - American Ale™</td><td></td></tr>';
      maltIngredients = document.getElementById('malt-ingredients');
      hopsIngredients = document.getElementById('hops-ingredients');
      for (let i = 0; i < data[0].ingredients.malt.length; i++) {
        maltIngredients.insertAdjacentHTML('afterend', '<tr><td></td><td>' + data[0].ingredients.malt[i].name + '</td><td>' + data[0].ingredients.malt[i].amount.value + ' ' + data[0].ingredients.malt[i].amount.unit + '</td></tr>');
      }
      for (let i = 0; i < data[0].ingredients.hops.length; i++) {
        hopsIngredients.insertAdjacentHTML('afterend', '<tr><td></td><td>' + data[0].ingredients.hops[i].name + '</td><td>' + data[0].ingredients.hops[i].amount.value + ' ' + data[0].ingredients.hops[i].amount.unit + '</td></tr>');
      }
      yeast.innerHTML = data[0].ingredients.yeast;
      description.innerHTML = data[0].description;
      brewersTips.innerHTML = 'Brewers tips: ' + data[0].brewers_tips;
      contributedBy.innerHTML = 'Contributed by: ' + data[0].contributed_by;
    });
}