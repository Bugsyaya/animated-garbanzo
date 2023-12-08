counter = 1

function next(){
    if (infoBiere(counter+1)){
        counter++
    }
}

function prev(){
    if (infoBiere(counter-1)){
        counter--
    }
}

async function infoBiere(i){
    data = (await (await fetch(`https://api.punkapi.com/v2/beers/${i}`)).json())[0]
    if (!data){
        return false
    }
    for([key, val] of Object.entries(data)){
        if (ele = document.getElementById(key)){
            switch(key){
                case "food_pairing":
                    ele.innerText = ''
                    for (v of val){
                        ele.insertAdjacentHTML('beforeend', `<li>${v}</li>`)
                    }
                    break;
                case "boil_volume":
                    ele.innerText = Object.values(val).join(" ")
                    break;
                case "image_url":
                    ele.src = val
                    break;
                case "ingredients":
                    ele.innerText = ''
                    for ([k, v] of Object.entries(val)){
                        ele.insertAdjacentHTML('beforeend', `
                        <tr>
                            <td>${k}</td>
                        </tr>${
    
                            (typeof v == "object" ? v.map((el)=>`
                            <tr>
                                <td></td>
                                <td>${el.name}</td>
                                <td>${Object.values(el.amount).join(' ')}</td>
                            </tr>
                            `).join('') : `
                            <tr>
                                <td></td>
                                <td>${v}</td>
                                <td></td>
                            </tr>
                            `)
                        }`)
    
                    }
                    break;
                default:
                    ele.innerText = val
            }
        }
    }
    
    rate = Math.round(Math.random()*5)

    for(el of Array.from(document.getElementById("stars").children).slice(0, rate)){
        el.classList.add("ratedStar")
    }

    return true
}

infoBiere(counter)