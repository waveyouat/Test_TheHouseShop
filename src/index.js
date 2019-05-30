import React, { Component } from "react";
import ReactDOM from "react-dom";

import Selection from "./Selection/Selection";
import Coming from "./Coming/Coming";
import Button from "./Button/Button";
import Suggested from "./Suggested/Suggested";
import IllJudged from "./IllJudged/IllJudged";

import "./styles.css";

const uniqid = require("uniqid");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResults: false,
      coming: [],
      suggestedSpots: [],
      scoreBoard: [],
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
    let whoComing = this.state.coming;
    let whoJoined = this.state.people.filter(
      p => p.name === e.target.textContent
    );
    whoComing.push(whoJoined[0]);
    this.setState({ coming: whoComing });

    console.log(this.state.coming);
  };

  findPlace = (statoVenues, statoPeople) => {
    let finalRestos = [];

    for (let i = 0; i < statoVenues.length; i++) {
      //EVERY VENUE TO BE CONSIDERED IN THE LEADERBORD INDIVIDUALLY

      var oggettoResto = { ...statoVenues[i], score: 0, comments: [] };
      //OBJECT WILL STORE VENUE SCORE DATA AND COMMENTS

      let cibi = statoVenues[i].food;
      let bevande = statoVenues[i].drinks;

      for (let g = 0; g < statoPeople.length; g++) {
        let nonPiace = statoPeople[g].wont_eat;
        let voglionoBere = statoPeople[g].drinks;

        bevande.map(restoDrink =>
          voglionoBere.map(drinkPreferito => {
            if (restoDrink === drinkPreferito) {
              oggettoResto.score += 1;
              console.log(
                statoPeople[g].name +
                  " can have " +
                  drinkPreferito +
                  " at " +
                  statoVenues[i].name
              );
            }
          })
        );
        cibi.map(restoFood =>
          nonPiace.map(personDislikes => {
            console.log(restoFood + " " + personDislikes);
            //EVERY MATCH OF FOOD AND DISLIKES

            if (restoFood === personDislikes) {
              oggettoResto.comments.push(
                statoPeople[g].name +
                  " won't eat " +
                  restoFood +
                  " at " +
                  statoVenues[i].name
              );
            } else {
              oggettoResto.score += 1;
            }
          })
        );
      }
      finalRestos.push(oggettoResto);
    }
    console.log(finalRestos);
    this.setState({ scoreBoard: finalRestos });

    let show = this.state.displayResults;
    this.setState({ displayResults: !show });
  };
  render() {
    return (
      <div className="App">
        <h1>Test</h1>
        <h2>Who's coming?</h2>
        <div>
          <div className="side-by-side">
            <div>
              <h4>Click on the partecipants:</h4>
              <ul>
                {this.state.people.map(person => {
                  return (
                    <Selection
                      key={uniqid()}
                      isComing={this.addToWhosComing}
                      name={person.name}
                    />
                  );
                })}
              </ul>
            </div>
            <div>
              <h4>Here's who's coming:</h4>
              <ul>
                {this.state.coming.length > 0 ? (
                  this.state.coming.map(person => {
                    return <Coming key={uniqid()} name={person.name} />;
                  })
                ) : (
                  <li>Click people to the left to add them</li>
                )}
              </ul>
            </div>
          </div>
          <Button
            process={() => this.findPlace(this.state.venues, this.state.coming)}
          />
          {this.state.displayResults ? (
            <div className="results">
              <h4>Places to go:</h4>
              <ul>
                <Suggested />
                <Suggested />
              </ul>
              <h4>Places to avoid:</h4>
              <ul>
                <IllJudged />
              </ul>
              <ul>
                <li>Reason 1</li>
                <li>Reason 2</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
