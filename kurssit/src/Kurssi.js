import React, {Component} from 'react';
import './index.css';

const Otsikko = (props) => {
    return (
        <h3>Kurssi: {props.kurssi}</h3>
    )
}

const Sisalto = (props) => {
    const palat = props.osat.map(
        (osa) => <Osa key={osa.id} osa={osa} />
    )
    return (
        <div>
            {palat}
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi}: {props.osa.tehtavia} tehtävää</p>
    )
}

const Yhteensa = (props) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const tehtavat = props.osat.map(osa => osa.tehtavia)
    const summa = tehtavat.reduce(reducer)

    return (
        <div>
            <p>-----------------------------------------</p>
            <p>Yhteensä: {summa} tehtävää</p>
        </div>
    )
}

class Kurssi extends Component {

    render() {
        return (
            <div className='kurssi'>
                <Otsikko kurssi={this.props.kurssi.nimi} />
                <Sisalto osat={this.props.kurssi.osat} />
                <Yhteensa osat={this.props.kurssi.osat} />
            </div>
        )
    }
}
export default Kurssi;