import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CountUp from "react-countup";
import DateAdapter from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
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
    let difference = variable === "startDate" ? this.getDifference(date, this.state.endDate) : this.getDifference(this.state.startDate, date);
    if (!isNaN(difference)) {
      newState.startCounter = this.state.endCounter;
      newState.endCounter = difference;
    }
    console.log("new State: ", newState);
    this.setState(newState, () => {
      console.log("state: ", this.state);
    });
  };

  render() {
    return (
        <div className="app">
          <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
          />
          <Card className="card">
            <CardContent>

              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    className="datePicker"
                    label="Start date"
                    value={this.state.startDate}
                    onChange={date =>

                    { console.log("in here 1");
                      this.handleDateChange("startDate", date)}
                    }
                    maxDate={this.state.endDate}
                    renderInput={(params) => <TextField className="datePicker" {...params} />}
                />

                <DatePicker
                    className="datePicker"
                    label="End date"
                    value={this.state.endDate}
                    onChange={date => {
                      console.log("in here 2");
                      this.handleDateChange("endDate", date)}}
                    minDate={this.state.startDate}
                    renderInput={(params) => <TextField className="datePicker" {...params} />}
                />
              </LocalizationProvider>



              <CountUp
                  className="counter"
                  start={this.state.startCounter}
                  end={this.state.endCounter}
                  onEnd={() => console.log('Ended! 👏')}
                  onStart={() => console.log('Started! 💨')}
                  redraw={true}
                  duration={2}
              />
            </CardContent>
          </Card>
        </div>
    );
  }
}
export default App;
