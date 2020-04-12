import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
    };
  }

  toggleButton = () => {
    this.setState({ showPartcipant: !this.state.showPartcipant });
  };

  updateParticipants = (val) => {
    let participants = this.state.participants;
    participants.push(val);
    this.setState({ participants },()=>this.props.handleChange("participants", participants));
    this.refs.participants.value = "";
  };
  render = () => {
    var { currentDate, newmeeting } = this.props;
    return (
      <React.Fragment>
        <div className="container h-75">
          <div className="row h-100">
            <div className="col-lg-10 m-auto shadow-lg p-5 mb-5 bg-white rounded">
              <div className="d-flex flex-wrap">
                <div className="col-12">
                  <div className="form-group">
                    <div>
                      <DatePicker
                        className="customInput"
                        selected={currentDate}
                        dateFormat="dd/MM/yyyy"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <DatePicker
                      selected={newmeeting.start_time && newmeeting.start_time}
                      onChange={(date) =>
                        this.props.handleChange("start_time", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      className="customInput"
                      excludeTimes={[newmeeting.end_time]}
                      timeCaption="Time"
                      dateFormat="hh:mm"
                      placeholderText="Start time"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <DatePicker
                      selected={newmeeting.end_time && newmeeting.end_time}
                      onChange={(date) =>
                        this.props.handleChange("end_time", date)
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      className="customInput"
                      timeIntervals={15}
                      excludeTimes={[newmeeting.start_time]}
                      timeCaption="Time"
                      dateFormat="hh:mm"
                      placeholderText="End time"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      placeholder="Add Description"
                      className="customTextarea"
                      rows="5"
                      value={newmeeting.description}
                      onChange={(e) =>
                        this.props.handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    {!this.state.showPartcipant && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.toggleButton()}
                      >
                        Add Participants
                      </button>
                    )}
                    {this.state.showPartcipant && (
                      <React.Fragment>
                        <input
                          placeholder="Add Participants"
                          ref="participants"
                          className="customInput"
                          onBlur={(e) =>
                            this.updateParticipants(e.target.value)
                          }
                        />
                        {/* <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => this.toggleButton()}
                        >
                          Add +
                        </button> */}
                      </React.Fragment>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  {this.state.participants.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };
}
