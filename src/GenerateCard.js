import { randNum, displayFlex, randBool } from "./helpers";
import React, { Component } from "react";
import "./GenerateCard.css";
import axios from "axios";
import Card from "./Card";


class GenerateCard extends Component {
    constructor(props) {
        super(props);
        this.state = { deckId: "", deckInfo: [{}], cardsArr: [], isLoad: false, remaining: 52, suit: "", value: "" };
        this.handleNewCard = this.handleNewCard.bind(this);
    }

    // making request to get the id through the API
    async componentDidMount() {
        let response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        this.setState({ deckId: response.data.deck_id });
    }

    // handling the click event to get new card and corresponding informaition
    async handleNewCard() {
        this.setState({ isLoad: true });
        let response;
        // meking the request
        try {
            response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`);
        } catch (err) {
            console.log(err)
        }

        // making changes in the state according to the data fetched through the API
        this.setState({ deckInfo: [response.data] });
        this.setState((curState) => ({
            remaining: response.data.remaining,
            cardsArr: [...curState.cardsArr, { cardsSrc: curState.deckInfo[0].cards[0].image, cardsRotate: randBool() ? randNum(40) : randNum(365, 325), translate: randBool() ? `${randNum(20)}px` : `-${randNum(20)}px` }],
            suit: response.data.cards[0].suit,
            value: response.data.cards[0].value,
        }));
        this.setState({ isLoad: false });
    }

    render() {
        // returning card component according to the state (cardsArr)
        let cards = this.state.cardsArr.map((cards) => {
            return <Card src={cards.cardsSrc} key={crypto.randomUUID()} rotate={cards.cardsRotate} translate={cards.translate} />;
        });
        return (
            <div className="GenerateCard flex-column">
                {/* top section */}
                <div className="head">Deck Of Card</div>
                <div className="text">A LITTLE DEMO MADE WITH REACT</div>

                {/* displaying the info about the cards */}
                <div className="cards-info flex">
                    <div className="remaining">Remaining Cards : {this.state.remaining}</div>
                    <div className="card-name" style={{...displayFlex(this.state.remaining < 52)}}>( {this.state.value}  OF {this.state.suit} )</div>
                </div>

                {/* button to generate the cards */}
                <div className={this.state.isLoad ? "no-hover flex" : "GenerateCard-btn flex"} onClick={this.handleNewCard}>
                    {!this.state.isLoad ? <p>Generate Card</p> : <div className="square"></div>}
                </div>

                {/* generated cards */}
                <div className="GenerateCard-cards">{cards}</div>
            </div>
        );
    }
}

export default GenerateCard;
