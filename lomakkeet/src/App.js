import React, { Component } from 'react';
import Filtteri from './Filtteri';
import UusiTieto from './UusiTieto';
import './index.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            persons: [ {name: 'Matti Majava', number: 123},
                       {name: 'Olli Orava', number: 687},
                       {name: 'Kalle Kissa', number: 890},
                       {name: 'Olli Outolintu', number: 777} ]
        }
    }

    // käsitellään uuden tiedon lisääminen lomakkeella
    uusiTietoLomakkeelta = (data) => {
        const dudes = this.state.persons
        dudes.push({name: data.newName, number: data.newNumber})  
        this.setState({persons: dudes})   
    }

    render() {

        return (
            <div className='App'>
                <h2>Puhelinluettelo</h2>
                <UusiTieto data={this.state} uusi={this.uusiTietoLomakkeelta} />
                <Filtteri data={this.state} />   
            </div>
        )
    }
}
export default App