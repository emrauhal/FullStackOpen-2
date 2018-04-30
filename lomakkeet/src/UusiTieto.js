import React, { Component } from 'react';
import './index.css';

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
            alert('Nimi lisätty jo!') // löytyy: virheilmoitus
        } else {
            this.props.uusi(this.state) // ei löydy: lisätään uusi tieto
        }
        // tyhjennetään lomakekentät
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
                    <p>numero: <input type='number'
                                      value={this.state.newNumber} 
                                      onChange={this.uusiNumero} /></p>    
                    <button type='submit'>lisää</button>
                </form>
            </div>
        )
    }
}
export default UusiTieto