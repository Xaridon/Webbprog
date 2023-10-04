



async function safeFetchJson(url) {
    return fetch(url)
        .then(response => {
            if(!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
        }
        return response.json();
    });
}

async function fetchIngredient(type, ingredient) {
    return safeFetchJson(`http://localhost:8080/${type}/${ingredient}`)
}

async function fetchType(type, arrayOfIngredients){
    return Object.assign({}, ...await Promise.all(arrayOfIngredients.map(async (x) => {
        return {[x] : await fetchIngredient(type, x)}
    })))
}

export default async function fetchInventory() {
    const [foundations, proteins, extras, dressings] = await Promise.all([
        fetchType("foundations", await safeFetchJson(`http://localhost:8080/foundations`)),
        fetchType("proteins", await safeFetchJson(`http://localhost:8080/proteins`)),
        fetchType("extras", await safeFetchJson(`http://localhost:8080/extras`)),
        fetchType("dressings", await safeFetchJson(`http://localhost:8080/dressings`))
    ])

    
    return {
        foundations,
        proteins,
        extras,
        dressings
    }
}
    