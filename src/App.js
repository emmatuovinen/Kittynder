import React, { Component } from "react";
import "./App.css";
import {GetCats} from './catAPI';

class App extends Component {
  state = {
    cat: "",
    indexOfCurrentCat: 0,
    rightColumn: [],
    leftColumn: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.nextCat();
};

  nextCat = () => {
    this.setState({isLoading:true})
    GetCats(response => {
      let catUrl = response[0].url;
      this.setState({ cat: catUrl, isLoading: false});
    });
  };

  putToColumnLeft = (left) => {
    this.nextCat();
    const cat = this.state.cat;
    this.setState({ leftColumn: [cat, ...this.state.leftColumn] });
    localStorage.setItem(left, JSON.stringify(cat));
  };

  putToColumnRight = (right) => {
    this.nextCat();
    const cat = this.state.cat;
    this.setState({ rightColumn: [cat, ...this.state.rightColumn] });
    localStorage.setItem(right, JSON.stringify(cat));
  };

  render() {
    return (
      <div className="App">
        <img className="image" src={this.state.isLoading? "https://media.giphy.com/media/MTKsRM3QzNeOI59SbO/giphy.gif" :this.state.cat} alt="logo" />
        <div>
          <button onClick={this.putToColumnLeft}>❤️</button>
          <button onClick={this.putToColumnRight}>😻</button>
          <div className="container">
            <div>
              {this.state.leftColumn.map(cat => (
                <div>{cat}</div>
              ))}
            </div>
            <div>
              {this.state.rightColumn.map(cat => (
                <div>{cat}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
