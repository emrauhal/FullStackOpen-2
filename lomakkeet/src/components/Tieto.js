import React, { Component } from 'react';

// apupalikka yksittäisen nimi-numero-parin esittämiseen
class Tieto extends Component {

    poista = () => {
        this.props.poista(this.props.hlo)
    }

    render() {

        return (
            <tr>
                <td>{this.props.hlo.name}</td>
                <td>{this.props.hlo.number}</td>
                <td><button onClick={this.poista}>poista</button></td>
            </tr>    
        )
    }
}
export default Tieto