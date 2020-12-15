import React from "react";


function QnARow(props){



    return (
        <div className="task-issue">
            { props.order === 1 ? <></> : <hr /> }
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <div className="m-0">{ props.question }</div>
                    </div>
                    <div className="m-0">{ props.answer }</div>
                </div>
            </div>
        </div>
    );
}

export default QnARow;

