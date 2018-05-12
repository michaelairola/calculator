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

function Button(props) {
  const name = "btn " + props.value[1];
  const letter = props.value[0];
  return (
    <button className={name} onClick={props.onClick} >
      {letter}
    </button>
  );
}


class ButtonsContainer extends Component {
  renderButton(i) {
    return(
      <Button 
        key={i[0]} 
        value={i}
        onClick={() => this.props.onClick(i)}/>
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
      // For layout
      buttons: [
        ["cl", "func-btn" ],    ["%", "func-btn"], [ "^", "func-btn"],   ["+", "func-btn"],
        ["7","reg-btn"],        ["8", "reg-btn"],  ["9", "reg-btn"],     ["–", "func-btn"],
        ["4", "reg-btn"],       ["5", "reg-btn"],  ["6", "reg-btn"],     ["x", "func-btn"],
        ["1", "reg-btn"],       ["2", "reg-btn"],  ["3", "reg-btn"],     ["÷", "func-btn"],
        [".", "reg-btn"],       ["0", "reg-btn"],  [        "=", "result-btn"        ]   ],
      rows: 5,
      btns_per_row: [4,4,4,4,3],
      
      // for actual calculation
      result: "0",
      saved_result: "",
      current_func: "",
    };
  }
  
  handleFunction(current_func, first, second) {
    var result;
    first = parseInt(first);
    second = parseInt(second);
    // result = first + second;
    switch (current_func) {
      case "+":
        result = first + second;
        break; 
      case "–":
        result = first - second;
        break;
      case "x":
        result = first * second;
        break;
      case "÷":
        result = first / second;
        break;
      case "^":
        result = first ** second;
        break;
      case "%":
        result = first % second;
        break;
      default:
      console.log("something went wrong with handleFunction");
      console.log(current_func, first, second);
    }
    return result;
  }
  
  handleClick(i) {
    let btn_type = i[1], btn_val = i[0];
    let last_func = this.state.current_func;
    let result = this.state.result;
    let saved_result = this.state.saved_result;
    
    if (btn_type === "reg-btn"){
      if (result === "0") {result = btn_val}
      else if (last_func && !saved_result) {
        saved_result = result;
        result = btn_val; 
      }else {result += btn_val};
    }else if (btn_type === "func-btn") {
      if (btn_val === "cl"){
        result = "0";
        saved_result = "";
        last_func = "";
      }else if (last_func) {
        result = this.handleFunction(last_func, saved_result, result);
        saved_result = "";
      }else {last_func = btn_val}
    }else if (btn_type === "result-btn") {
      if(last_func && saved_result) {
        result = this.handleFunction(last_func, saved_result, result);
        saved_result = "";
        last_func = "";
      }
    }
    this.setState({
      result: result,
      saved_result: saved_result,
      current_func: last_func,
    });
  }
  
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
          btns_per_row={btns_per_row}
          onClick={(i) => this.handleClick(i)}/>
      </div>
    );
  }
}

export default App;
