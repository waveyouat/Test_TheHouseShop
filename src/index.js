import React, { Component } from "react";
import ReactDOM from "react-dom";

import Selection from "./Selection/Selection";
import Coming from "./Coming/Coming";

import "./styles.css";

const uniqid = require("uniqid");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coming: [],
      suggestedSpots: [],
      toAvoid: [],
      venues: [
        {
          name: "El Cantina",
          food: ["Mexican"],
          drinks: ["Soft drinks", "Tequila", "Beer"]
        },
        {
          name: "The York",
          food: ["Eggs", "Meat", "Fish", "Pasta", "Dairy"],
          drinks: [
            "Vodka",
            "Gin",
            "whisky",
            "Rum",
            "Cider",
            "Beer",
            "Soft drinks"
          ]
        },
        {
          name: "The Three Johns",
          food: ["Eggs", "Meat", "Fish", "Pasta", "Dairy"],
          drinks: ["Vodka", "Gin", "Cider", "Beer", "Soft drinks"]
        },
        {
          name: "Wagamama",
          food: ["Japanese"],
          drinks: ["Beer", "Cider", "Soft Drinks", "Sake"]
        },
        {
          name: "Sultan Sofrasi",
          food: ["Meat", "Bread", "Fish"],
          drinks: ["Beer", "Cider", "Soft Drinks"]
        },
        {
          name: "Spirit House",
          food: ["Nuts", "Cheese", "Fruit"],
          drinks: ["Vodka", "Gin", "Rum", "Tequila"]
        },
        {
          name: "Banana Tree",
          food: ["Fish", "Meat", "Salad", "Deserts"],
          drinks: ["Beer", "Cider", "Soft Drinks", "Sake"]
        }
      ],
      people: [
        {
          name: "John Doe",
          wont_eat: ["Fish"],
          drinks: ["Cider", "Rum", "Soft drinks"]
        },
        {
          name: "Tony Smith",
          wont_eat: ["Eggs", "Pasta"],
          drinks: ["Tequila", "Soft drinks", "beer", "Coffee"]
        },
        {
          name: "Frank Webb",
          wont_eat: ["Bread", "Pasta"],
          drinks: ["Vokda", "Gin", "Whisky", "Rum"]
        },
        {
          name: "Emily Pratt",
          wont_eat: [],
          drinks: ["Cider", "Beer", "Rum", "Soft drinks"]
        },
        {
          name: "Paulina Lang",
          wont_eat: ["Meat", "Fish"],
          drinks: ["Soft drinks", "Tea"]
        }
      ]
    };
  }
  addToWhosComing = e => {
    console.log(e.target.textContent);
    let whoComing = this.state.coming;
    whoComing.push(e.target.textContent);
    this.setState({ coming: whoComing });
  };
  render() {
    return (
      <div className="App">
        <h1>Test</h1>
        <h2>Who's coming?</h2>
        <div>
          <h4>Click on the partecipants:</h4>
          <div className="side-by-side">
            <div>
              {this.state.people.map(person => {
                return (
                  <Selection
                    key={uniqid()}
                    isComing={this.addToWhosComing}
                    name={person.name}
                  />
                );
              })}
            </div>
            <div>
              {this.state.coming.map(person => {
                return <Coming key={uniqid()} name={person} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
