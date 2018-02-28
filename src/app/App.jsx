import React, { Component } from "react";
import { Card } from "material-ui";
import CountUp from "react-countup";
import DatePicker from "react-toolbox/lib/date_picker";

import moment from "moment";

class App extends Component {
  state = {
    startDate: null,
    endDate: null,
    startCounter: 0,
    endCounter: 0
  };

  getDifference = (start, end) => {
    return moment(end).diff(moment(start), "days");
  };

  handleDateChange = (variable, date) => {
    let newState = {};
    newState[variable] = date;
    let difference =
      variable == "startDate"
        ? this.getDifference(date, this.state.endDate)
        : this.getDifference(this.state.startDate, date);
    if (!isNaN(difference)) {
      newState.startCounter = this.state.endCounter;
      newState.endCounter = difference;
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="app">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <Card className="card">
          <DatePicker
            className="datePicker"
            label="Start date"
            maxDate={this.state.endDate}
            value={this.state.startDate}
            onChange={date => this.handleDateChange("startDate", date)}
          />
          <DatePicker
            className="datePicker"
            label="End date"
            minDate={this.state.startDate}
            value={this.state.endDate}
            onChange={date => this.handleDateChange("endDate", date)}
          />
          <CountUp
            className="counter"
            start={this.state.startCounter}
            end={this.state.endCounter}
          />
        </Card>
      </div>
    );
  }
}
export default App;
