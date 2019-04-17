import React from 'react';
import styles from './Display.css';

class Display extends React.Component {
  render() {
    const { result, current, storedNums } = this.props;
    let list = current.map(i => i);
    let init = 0;
    let display;
    console.log(result);
    if (result) {
      display = result;
    } else {
      if (current.length == 0) {
        display = init;
      } else if (current.length > 12) {
        display = parseInt(list.join("")).toExponential(3);
      } else {
        display = list.join("");
      }
    }

    return (
      <div className="col-sm-12" id="display">
      <input type="text" value={display} readOnly="readonly" />
      </div>
    );
  }
}

export default Display;