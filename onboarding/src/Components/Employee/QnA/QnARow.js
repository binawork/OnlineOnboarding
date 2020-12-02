import React from "react";


function QnARow(props){



    return (
        <div className="task-issue">
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <p className="m-0">{ props.question }</p>
                    </div>
                    <hr />
                    <p className="m-0">{ props.answer }</p>
                </div>
            </div>
        </div>
    );
}

export default QnARow;

