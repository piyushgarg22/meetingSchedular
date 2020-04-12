import React, { Component } from "react";
import {Navbar} from "./components/navbar-component";
import AddMeeting from "./components/addMeeting-component";
import MeetingList from "./components/meetingList-component";
import axios from "axios";
import {Button} from './components/button-component';

export default class MeetingSchedular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      loading: true,
      meetings: [],
      currentDate: new Date(),
      isMeetingAdded: false,
      newmeeting: {},
      isPreviousDate:false
    };
  }

  changeStatus = (val) => {
    if (!val) {
      let meetings = this.state.meetings;
      meetings.push(this.state.newmeeting);
      localStorage.setItem("meetings", JSON.stringify(meetings));
      this.setState({ isMeetingAdded: true, status: !val, newmeeting: {} });
    } else {
      this.setState({ status: !val, isMeetingAdded: true});
    }
  };

  componentDidMount() {
    this.getMeetings();
    // console.log(JSON.parse(localStorage.getItem("meetings")))
  }

  handleChange = (value, data) => {
    let newmeeting = this.state.newmeeting;
    newmeeting[value] = data;
    this.setState({ newmeeting: newmeeting }, () =>
      console.log(this.state.newmeeting)
    );
  };

  getMeetings = async () => {
    let date = this.state.currentDate;
    date.toLocaleDateString();
    await axios
      .get(
        `http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${date}`
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: false,
            meetings: response.data,
            isMeetingAdded: false,
          });
          localStorage.setItem("meetings", JSON.stringify(response.data));
        } else {
          console.log("no data response from api");
        }
      });

    this.getDateString();
  };


  checkAvailibility =()=>{
    let date = new Date();
    let todaydate = this.state.currentDate.setDate(this.state.currentDate.getDate());
    let previousdate = date.setDate(date.getDate()-1);
    console.log("previousdate",previousdate)
    console.log("todaydate",todaydate)
    if(todaydate < previousdate){
     this.setState({isPreviousDate:true})
    }else{
      this.setState({isPreviousDate:false})
    }

  }




  saveMeeting = () => {};

  changeDate = (val) => {
    let updatedDate = this.state.currentDate;
    updatedDate.setDate(updatedDate.getDate() + val);
    this.setState({ currentDate: updatedDate, loading: true }, () =>
      this.getMeetings(this.state.currentDate)
    );
    this.checkAvailibility();
  };

  getDateString = () => {
    let todayDate = this.state.currentDate;
    let date = todayDate.getDate();
    let month = todayDate.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = todayDate.getFullYear();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentDateStr = date + " " + months[month - 1] + " " + year;
    this.setState({ currentDateStr: currentDateStr });
  };

  



  render = () => {
    var { status ,isPreviousDate,currentDate} = this.state;
    var props = {
      loading: this.state.loading,
      currentDate: this.state.currentDate,
      meetings: this.state.meetings,
      currentDateStr: this.state.currentDateStr,
      changeDate: this.changeDate,
      newmeeting: this.state.newmeeting,
      handleChange: this.handleChange,
    };


    return (
      <React.Fragment>
        <Navbar status={status} />

        {status ? <MeetingList {...props} /> : <AddMeeting {...props} />}

        <Button status={status} changeStatus={this.changeStatus} currentDate={currentDate} newmeeting={this.state.newmeeting} isPreviousDate={isPreviousDate}/>
      </React.Fragment>
    );
  };
}
