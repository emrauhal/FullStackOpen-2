import React, { Component } from 'react';
import axios from 'axios';
import Filtteri from './Filtteri';
import UusiTieto from './UusiTieto';
import './index.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { persons: [] }
    }

    componentWillMount() {
        console.log('willmount')
        axios
            .get('http://localhost:3001/persons')
            .then(function (response) {
                console.log('axios')
                this.setState({persons: response.data})
            }.bind(this))
    }

    // käsitellään uuden tiedon lisääminen lomakkeella
    uusiTietoLomakkeelta = (data) => {
        const copy = this.state.persons
        copy.push({name: data.newName, number: data.newNumber})  
        this.setState({persons: copy})   
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