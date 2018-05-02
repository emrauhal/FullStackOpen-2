import React, { Component } from 'react';
import Luettelo from './Luettelo';
import './index.css';

class Filtteri extends Component {
    constructor(props) {
        super(props)
        this.state = {filter: ''}
    }

    uusiFilter = (event) => {
        this.setState({filter: event.target.value})
    }

    render() {
        return (
            <div>
                <p>
                    Rajaa näytettäviä: 
                    <input value={this.state.filter} onChange={this.uusiFilter} />
                </p>
                <Luettelo data={this.props.data} filter={this.state.filter}
                        poista={this.props.poista} />
            </div>    
        )
    }
}
export default Filtteri