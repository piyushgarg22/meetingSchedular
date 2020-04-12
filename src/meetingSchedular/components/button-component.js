import React from "react";

export const Button = (props) => {
  let { status, newmeeting, isPreviousDate } = props;

  console.log(isPreviousDate);

  if (!isPreviousDate) {
    return (
      <div className="container text-center">
        {status && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.changeStatus(status)}
          >
            Add Meeting
          </button>
        )}

        {!status && newmeeting && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              newmeeting.start_time &&
              newmeeting.end_time &&
              newmeeting.description
                ? () => props.changeStatus(status)
                : null
            }
          >
            save
          </button>
        )}
      </div>
    );
  } else return null;
};
