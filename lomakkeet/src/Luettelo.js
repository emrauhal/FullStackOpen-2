import React, { Component } from 'react';

class Luettelo extends Component {
    
    render() {
        // filtteröidään data hakukentän ehdon perusteella
        // case-sensitiivinen!
        // mäpätään data Tieto-komponenteiksi
        const numerot = this.props.data.persons
            .filter((hlo) => hlo.name.includes(
                this.props.filter) === true)
            .map((hlo) => <Tieto key={hlo.name} hlo={hlo} />
        )

        return (
            <div>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>nimi</th>
                            <th>numero</th>
                        </tr>   
                        {numerot}
                    </tbody>
                </table> 
            </div>
        )
    }
}
export default Luettelo

// apupalikka yksittäisen nimi-numero-parin esittämiseen
const Tieto = (props) => {
    return (
        <tr>
            <td>{props.hlo.name}</td>
            <td>{props.hlo.number}</td>
        </tr>    
    )
}