import { randNum, displayFlex, randBool } from "./helpers";
import React, { Component } from "react";

class Card extends Component {
    render() {
        return <img src={this.props.src} className="Card" style={{ ...displayFlex(!(this.props.src == "")), rotate: `${this.props.rotate}deg`, translate: this.props.translate }} alt="card-image" />;
    }
}

export default Card;
