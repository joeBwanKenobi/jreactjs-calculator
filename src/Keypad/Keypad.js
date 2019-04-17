import React from 'react';
import style from './Keypad.css';
import * as Constants from '../Constants/Constants.js';

class Keypad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  handleClick(e) {
    this.props.handleClick(e);
  }

  isInNumVals(value) {
    if (Object.values(Constants.NUM_VALS).indexOf(value) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  handleKeyPress(e) {
    if(this.isInNumVals(e.key)) {
      this.handleClick(e);
    } else {
      console.log("dongo");
    }
  }

  render() {
    return (
      <div className="col-sm-12 align-middle text-center" id="keypad">
        <div className="row">
          <div className="col key" id="clear" onClick={this.handleClick}>
            AC
          </div>
          <div className="col key" id="divide" onClick={this.handleClick}>
            \
          </div>
          <div className="col-3 key" id="multiply" onClick={this.handleClick}>
            X
          </div>
        </div>
        <div className="row">
          <div className="col key" id="seven" onClick={this.handleClick}>
            7
          </div>
          <div className="col key" id="eight" onClick={this.handleClick}>
            8
          </div>
          <div className="col key" id="nine" onClick={this.handleClick}>
            9
          </div>
          <div className="col key" id="add" onClick={this.handleClick}>
            +
          </div>
        </div>
        <div className="row">
          <div className="col key" id="four" onClick={this.handleClick}>
            4
          </div>
          <div className="col key" id="five" onClick={this.handleClick}>
            5
          </div>
          <div className="col key" id="six" onClick={this.handleClick}>
            6
          </div>
          <div className="col key" id="subtract" onClick={this.handleClick}>
            -
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              <div className="col key" id="one" onClick={this.handleClick}>
                1
              </div>
              <div className="col key" id="two" onClick={this.handleClick}>
                2
              </div>
              <div className="col key" id="three" onClick={this.handleClick}>
                3
              </div>
            </div>

            <div className="row">
              <div className="col key" id="zero" onClick={this.handleClick}>
                0
              </div>
              <div className="col key" id="decimal" onClick={this.handleClick}>
                .
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row equals">
              <div className="col key" id="equals" onClick={this.handleClick}>
                =
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Keypad;