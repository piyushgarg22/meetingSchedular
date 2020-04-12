import React, { Component } from "react";
import BackImg from "../assets/back.png";
import NextImg from "../assets/next.png";
import "../assets/style.css";
const imgStyle = {
  width: "50px",
  height: "50px",
};

const Loading = (props) => {
  return (
    <div className="row my-5">
      <div className="loading-item col-lg-4 text-center m-auto">
        {props.children}
      </div>
    </div>
  );
};

export default class MeetingList extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: -1 };
  }
  showData = (index) => {
    this.setState({ currentTab: index }, () =>
      console.log(this.state.currentTab)
    );
  };

  render = () => {
    var { loading, meetings, currentDateStr } = this.props;
    var { currentTab } = this.state;
    return (
      <React.Fragment>
        <div className="container h-75">
          <div className="row w-50 mx-auto my-5">
            <div className="col-lg-2">
              <img
                src={BackImg}
                style={imgStyle}
                alt=""
                onClick={() => this.props.changeDate(-1)}
              />
            </div>
            <div className="col-lg-8 d-flex align-items-center justify-content-center">
              <h2>{currentDateStr}</h2>
            </div>

            <div className="col-lg-2">
              <img
                src={NextImg}
                style={imgStyle}
                alt=""
                onClick={() => this.props.changeDate(1)}
              />
            </div>
          </div>

          {!loading ? (
            <div className="row my-5">
              {meetings.length > 0 ? (
                <ul className="list-group col-lg-10 m-auto">
                  {meetings.map((meeting, index) => {
                    return (
                      <React.Fragment>
                        <li
                          className="list-group-item custom-list justify-content-between text-uppercase"
                          key={index}
                          onClick={() => this.showData(index)}
                        >
                          <span class="col-4">
                            {meeting.start_time + "-" + meeting.end_time}
                          </span>
                          <span class="col-6 text-truncate">
                          Meeting for {meeting.description}
                          </span>
                        </li>
                        {index === currentTab && (
                          <li className="list-group-item">
                            Meeting Description : {meeting.description}
                            <br /> Members :{" "}
                            {meeting.participants.map((pr, idx) => (
                              <span className="members">
                                {idx + 1 + ") "}
                                {pr}
                              </span>
                            ))}
                          </li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              ) : (
                <ul className="list-group col-lg-10 m-auto">
                  <li className="list-group-item justify-content-center text-center">
                    No Meeting Found
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Loading>Loading...</Loading>
          )}
        </div>
      </React.Fragment>
    );
  };
}
