import React, { Component } from 'react';
import Digits from './Digits.js'
import './App.css';

class Result extends Component {
  render() {
    return (
      <div className="result-container">
          <Digits num={this.props.result} />
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const name = "btn " + this.props.className;
    const letter = this.props.letter;
    return (
      <button key={letter} className={name} >
          {letter}
      </button>
    );
  }
}

class ButtonsContainer extends Component {
  renderButton(i) {
    const key = "button " + i[0];    
    return(
      <Button key={key} 
        className= {i[1]}
        letter= {i[0]} />
    );
  }

  renderRow(row) {
    const btns_per_row = this.props.btns_per_row[row];
    const row_index = Array.from({length: btns_per_row}, (value, k) => 4*row + k);
    const buttons = this.props.buttons;
    row = "row " + (row + 1);
    return(
      <div key={row} className={row}>
          {
            row_index.map((btn) => this.renderButton(buttons[btn]))
          }
      </div>
    );
  }

  render() {
    var rows = Array.from({length: this.props.rows}, (value, k) => k);
    return(
      <div className="row-container">
        {
          rows.map((row) => this.renderRow(row))
        }
       </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      buttons: [
        ["cl", "danger-btn" ], ["%", ""],  [ "f", ""],     ["+", "func-btn"],
        ["7","reg-btn"],        ["8", "reg-btn"],  ["9", "reg-btn"],     ["–", "func-btn"],
        ["4", "reg-btn"],       ["5", "reg-btn"],  ["6", "reg-btn"],     ["x", "func-btn"],
        ["1", "reg-btn"],       ["2", "reg-btn"],  ["3", "reg-btn"],     ["÷", "func-btn"],
        [".", "reg-btn"],       ["0", "reg-btn"],  [        "=", "result-btn"        ]   ],
      rows: 5,
      btns_per_row: [4,4,4,4,3],
      result: "00"
    };
  }
  
  // handleFunc(i) {
  //   const result = this.state.result;
  //   if (i[1] === "reg-btn") {
  //     this.setState({
  //       result: result + i[0],
  //     })
  //   };
  // 
  // }
  
  render() {
    const buttons = this.state.buttons;
    const rows = this.state.rows;
    const btns_per_row = this.state.btns_per_row;
          
    return (
      <div className="calculator">
        <Result result={this.state.result}/>
        <ButtonsContainer 
          buttons={buttons}
          rows={rows} 
          btns_per_row={btns_per_row}/>
      </div>
    );
  }
}

export default App;
