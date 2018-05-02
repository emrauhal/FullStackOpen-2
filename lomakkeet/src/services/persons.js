import axios from 'axios';

const baseurl = 'http://localhost:3001/persons'

// hakee kaiken datan urlin perusteella json-muodossa
const getAll = () => {
    return axios.get(baseurl)
}

// lisää uuden olion json-tiedostoon asti
const create = (newObject) => {
    return axios.post(baseurl, newObject)
}

// päivittää uuden puhelinnumeron vanhan päälle
const update = (id, newObject) => {
    return axios.put(baseurl + '/' + id, newObject)
}

// poistaa yhden henkilön id:n perusteella
const remove = (hlo) => {
    let option = window.confirm('Poistetaanko ' + hlo.name + '?')
    
    if (option === true) {
        // käyttäjä klikkaa ok: poistetaan
        return axios.delete(baseurl + '/' + hlo.id)
    } else {
        // käyttäjä klikkaa peruuta: ei poisteta
        return axios.get(baseurl)
    }
}

export default { getAll, create, update, remove }