import React, { Component } from 'react';
import service from './services/persons';
import Filtteri from './Filtteri';
import UusiTieto from './UusiTieto';
import './index.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { persons: [] }
    }

    componentWillMount() {
        this.haeJaPaivita()
    }

    // luettelon sisällön päivittäminen:
    // täytyy hakea uudestaan aina, kun jokin muutos tapahtuu
    haeJaPaivita() {
        service
            .getAll()
            .then(function (response) {
                this.setState({persons: response.data})
            }.bind(this))
    }

    // käsitellään uuden tiedon lisääminen lomakkeella
    uusiTietoLomakkeelta = (data) => {
        // luodaan lomakkeen tietojen perusteella olio
        const personObject = {
            name: data.newName,
            number: data.newNumber,
            id: '' // autogeneroituu
        }
        service
            .create(personObject)
            .then(function (response) {

                if (response.status === 201) {
                    this.haeJaPaivita()
                } else {
                    throw new Error(response.statusText)
                }    
            }.bind(this))
    }

    // puhelinnumeron päivittäminen
    paivitaNumero = (id, data) => {
        // luodaan olio, jonka nimi ja id löytyvät jo listalta
        const personObject = {
            name: data.newName,
            number: data.newNumber,
            id: id
        }
        service
            .update(id, personObject)
            .then(function (response) {
                if (response.status === 200) {
                    this.haeJaPaivita()
                } else {
                    throw new Error(response.statusText)
                }
            }.bind(this))
    }

    // poistetaan yksittäinen puhelinnumerotieto id:n perusteella
    poistaTieto = (hlo) => {
        service
            .remove(hlo)
            .then(function (response) {
                if (response.status === 200) {
                    this.haeJaPaivita()
                } else {
                    throw new Error(response.statusText)
                }
            }.bind(this))
    }

    render() {
        return (
            <div className='App'>
                <h2>Puhelinluettelo</h2>
                <UusiTieto data={this.state} uusi={this.uusiTietoLomakkeelta} 
                            paivita={this.paivitaNumero}/>
                <Filtteri data={this.state} poista={this.poistaTieto} />   
            </div>
        )
    }
}
export default App