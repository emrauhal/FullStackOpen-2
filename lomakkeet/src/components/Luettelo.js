import React, { Component } from 'react';
import Tieto from './Tieto';

class Luettelo extends Component {

    render() {
        // filtteröidään data hakukentän ehdon perusteella
        // case-sensitiivinen!
        // mäpätään data Tieto-komponenteiksi
        const numerot = this.props.data.persons
            .filter((hlo) => hlo.name.includes(
                this.props.filter) === true)
            .map((hlo) => <Tieto key={hlo.id} hlo={hlo} 
                            poista={this.props.poista}/>
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