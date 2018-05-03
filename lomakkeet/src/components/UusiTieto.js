import React, { Component } from 'react';

class UusiTieto extends Component {

    constructor(props) {
        super(props)
        this.state = {newName: '', newNumber: ''}
    }

    // käsitellään muutokset nimensyöttämiskentässä
    uusiNimi = (event) => {
        this.setState({newName: event.target.value})
    }

    // käsitellään muutokset numeronsyöttämiskentässä
    uusiNumero = (event) => {
        this.setState({newNumber: event.target.value})
    }

    // lomakkeen tietojen onSubmit-käsittely
    ready = (event) => {
        event.preventDefault() // estetään lomakkeen oletusarvoinen toiminta

        // haetaan henkilödatasta vain nimet
        const names = this.props.data.persons.map((hlo) => hlo.name)

        // tarkistetaan, löytyykö syötetty nimi jo tiedoista
        if (names.includes(this.state.newName)) { 

            // nimi löytyy: kysytään käyttäjältä, haluaako päivittää numeron
            let option = window.confirm(this.state.newName + 
                ' on jo luettelossa, korvataanko vanha numero?')

            if (option === true) { // jos käyttäjä klikkaa ok
                // etsitään nimen perusteella olemassaoleva olio jo sen id
                const obj = this.props.data.persons
                    .filter((hlo) => hlo.name === this.state.newName)
                // päivitetään puhelinnumero äsken haetun id:n perusteella   
                this.props.paivita(obj[0].id, this.state)
            } // else: käyttäjä klikkaa peruuta: ei lisätä eikä muokata

        } else {
            // nimeä ei löydy: lisätään uusi tieto
            this.props.uusi(this.state)
        }
        // tyhjennetään lopuksi lomakekentät
        this.setState({newName: '', newNumber: ''})
    }

    render() {
        return (
            <div>
                <h3>Lisää uusi: </h3>
                <form onSubmit={this.ready}>
                    <p>nimi: <input type='text' 
                                    value={this.state.newName} 
                                    onChange={this.uusiNimi} /></p>
                    <p>numero: <input type='text'
                                      value={this.state.newNumber} 
                                      onChange={this.uusiNumero} /></p>    
                    <button type='submit'>lisää</button>
                </form>
            </div>
        )
    }
}
export default UusiTieto