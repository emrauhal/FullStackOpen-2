import React, { Component } from 'react';
import service from './services/persons';
import Filtteri from './components/Filtteri';
import UusiTieto from './components/UusiTieto';
import { Notification, ErrorNotification } from './components/notifications';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { persons: [], info: '', error: '' }
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
                if (response.status === 200) {
                    this.setState({persons: response.data})
                } else {
                    throw new Error('Tietojen päivittäminen epäonnistui!')
                } 
            }.bind(this))
            .catch(error => {
                this.setState({error: 'Tietojen päivittäminen ei onnistunut!'})
                setTimeout(() => {
                    this.setState({ error: null })
                }, 5000)
            })
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
                    // asetetaan käyttäjälle näytettävä ilmoitusviesti (vihreä)
                    this.setState({info: 'Henkilön ' + data.newName +
                                    ' lisääminen onnistui!'})
                    // asetetaan viesti näkymään 5 sekunnin ajan                
                    setTimeout(() => {
                        this.setState({ info: null })
                    }, 3000)
                    this.haeJaPaivita()
                } else {
                    // heitetään virheilmoitus
                    throw new Error('Uuden henkilön lisääminen ei onnistunut!')
                }    
            }.bind(this))
            // käsitellään mahdolliset virheet
            .catch(error => {
                // asetetaan käyttäjälle näytettävä virheilmoitus (punainen)
                this.setState({error: 'Uuden henkilön lisääminen ei onnistunut!'})
                setTimeout(() => {
                    this.setState({ error: null })
                }, 5000)
            })
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
                    this.setState({info: 'Henkilön ' + data.newName +
                                    ' puhelinnumeron päivittäminen onnistui!'})
                    setTimeout(() => {
                        this.setState({ info: null })
                    }, 3000)
                    this.haeJaPaivita()
                } else {
                    throw new Error('Puhelinnumeron päivittäminen ei onnistunut!')
                }
            }.bind(this))
            .catch(error => {
                this.setState({error: 'Puhelinnumeron päivittäminen ei onnistunut.' + 
                                    ' Yhteystieto saattaa olla jo poistettu luettelosta.'})
                // mikäli henkilö jo poistettu esim. toisella selaimella, voitaisiin se
                // poistaa myös käytettävän selaimen listasta
                // this.setState({persons: this.state.persons
                //      .filter((hlo) => hlo.id !== id)})
                // VIRHEILMOITUS KUITENKIN YLEISKÄYTTÖINEN, JOTEN SE VOI AIHEUTUA MUUSTAKIN                 
                setTimeout(() => {
                    this.setState({ error: null })
                }, 5000)
            })
    }

    // poistetaan yksittäinen puhelinnumerotieto id:n perusteella
    poistaTieto = (hlo) => {
        service
            .remove(hlo)
            .then(function (response) {
                if (response.status === 200) {
                    this.setState({info: 'Henkilön poistaminen onnistui!'})
                    setTimeout(() => {
                        this.setState({ info: null })
                    }, 3000)
                    this.haeJaPaivita()
                } else {
                    throw new Error('Poistaminen ei onnistunut!')
                }
            }.bind(this))
            .catch(error => {
                this.setState({error: 'Poistaminen ei onnistunut!'})
                setTimeout(() => {
                    this.setState({ error: null })
                }, 5000)
            })

    }

    render() {
        // virheen ilmetessä tulostetaan punainen virheilmoitus
        if (this.state.error !== '') {
            return (
                <div className='App'>
                    <h2>Puhelinluettelo</h2>
                    <ErrorNotification message={this.state.error} /> 
                    <UusiTieto data={this.state} uusi={this.uusiTietoLomakkeelta} 
                                paivita={this.paivitaNumero}/>
                    <Filtteri data={this.state} poista={this.poistaTieto} />   
                </div>
            )
        }
        // onnistuneen suorituksen jälkeen tulostetaan vihreä ilmotus tapahtuneesta
        if (this.state.info !== '') {
            return (
                <div className='App'>
                    <h2>Puhelinluettelo</h2>
                    <Notification message={this.state.info} />   
                    <UusiTieto data={this.state} uusi={this.uusiTietoLomakkeelta} 
                                paivita={this.paivitaNumero}/>
                    <Filtteri data={this.state} poista={this.poistaTieto} />   
                </div>
            )
        }
        // muuten: ei tulostetan ilmoituksia
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