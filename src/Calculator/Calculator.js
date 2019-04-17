import React, {Component} from 'react';
import styles from './Calculator.css';
import Display from '../Display/Display.js';
import Keypad from '../Keypad/Keypad.js';
import * as Constants from '../Constants/Constants.js';

class Calculator extends Component {
	constructor(props) {
    super(props);
    this.state = {
      current: [],
      storedNums: [],
      action: "",
      result: null,
      isFirst: false // if true signals that update display should be called to change display from zero
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let id = e.target.id;
    let newVal = Constants.NUM_VALS[e.target.id];
    if (id in Constants.NUM_VALS) {
      let newCurrent = [...this.state.current, newVal];
      // if button pressed is not the first after a reset
      if (!this.state.isFirst) {
        // does current contain any values? if false, zero is invalid input
        if (id === "zero" && this.state.current.length === 0) {
          console.log("Invalid input: First character cannot be a zero.");
        } else if (id === "zero" && this.state.current.length > 0) {
          // set current to empty array so Display is overwritten but updateDisplay callback
          this.setState({ current: [] }, () => this.updateDisplay(newCurrent));
        } else {
          // Don't allow more than one decimal in input
          if (id === "decimal" && this.state.current.indexOf(".") > -1) {
            console.log("Invalid input: decimal already exists in current.");
          } else {
            this.updateCurrent(newCurrent);
          }
        }
      } else {
        if (id === "zero" && this.state.current.length === 0) {
          console.log("Invalid input: First character cannot be a zero.");
        } else {
          this.setState({ current: [newVal], isFirst: false }, () =>
            console.log(this.state)
          );
        }
      }
    } else {
      this.handleOper(id);
    }
  }

  // reset current, storedNums, result and action to default in state
  clearAll() {
    this.setState(
      { current: [], storedNums: [], action: "", result: null });
  }

  updateCurrent(newCurrent) {
    this.setState({ current: newCurrent });
  }

  updateDisplay(id) {
    console.log("updateDisplay()");
    this.setState({ current: id }, () => console.log(this.state));
  }

  // Store current display array as single number
  storeNum() {
    let numToStore = Number(this.state.current.join("")).toFixed(3);
    this.setState({ storedNums: [...this.state.storedNums, numToStore] });
  }
  // handle incoming operator action to set action state
  handleOper(id) {
    if (id === "clear") {
      this.clearAll();
    } else if (id === "equals") {
      this.resolve(id);
    } else {
      this.operation(id);
    }
  }

  operation(id) {
    console.log(id + "() called, setting action to: " + id);
    this.storeNum();
    if (this.state.action === "equals") {
      this.setState((prevState, props) => {
        return { current: [prevState.result], action: id, result: null };
      });
      // if state's current action is an operator and Calculator waiting for number, update action if operator pressed
    } else if (Constants.OPERS_CHECK.includes(this.state.action) && this.state.isFirst) {
      console.log("updating action");
      this.setState({ action: id }, () => console.log(this.state.action));
      // if numbers are stored and new operator pressed, perform inline calculation of stored numbers and last action
    } else if (this.state.storedNums.length > 0) {
      this.setState(
        (prevState, props) => {
          // perform previously requested operation on prevState.storedNum index 0 and prevState.current
          let inlineRes = Constants.OPERATORS[prevState.action](
            prevState.storedNums[0],
            prevState.current.join("")
          );
          return {
            action: id,
            storedNums: [inlineRes],
            current: [inlineRes],
            result: inlineRes,
            isFirst: true
          };
        },
        () => console.log(this.state)
      );
    } else {
      this.setState({ action: id, isFirst: true }, () =>
        console.log(this.state)
      );
    }
  }

  isInteger(res) {
    if (res != ~~res) {
      return (res = res.toString());
    } else {
      return res;
    }
  }


  resolve(id) {
    console.log("resolve() called:");
    this.setState(
      (prevState, props) => {
        // create a single number from current array as current value
        let curr = Number(this.state.current.join(""));
        let res;
        // result of operation - this will be stored as result and in storedNums for operating on the result. toFixed limits decimal place to 3 digits
        if (this.state.action === "") {
          res = curr;
        } else {
          res = Constants.OPERATORS[prevState.action](prevState.storedNums[0], curr);
        }
        res = this.isInteger(res);
        return {
          current: [],
          action: id,
          result: res,
          storedNums: [res],
          isFirst: true
        };
      },
      () => console.log(this.state)
    );
  }

	render() {
		const { result, current, storedNums } = this.state;
	    return (
	      <div className="container" id="calculator">
	        <div className="row">
	          <Display result={result} current={current} storedNums={storedNums} />
	        </div>
	        <div className="row">
	          <Keypad handleClick={this.handleClick} />
	        </div>
	      </div>
	    );
	}
}

export default Calculator;