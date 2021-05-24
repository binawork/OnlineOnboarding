import React from "react";

function QnARow(props){
    return (
        <div className="mb-3">
            <div className="QnA__card card">
                <div className="card-body">
                    <div className="form-group mb-4">
                        { props.question }
                    </div>
                    { props.answer }
                </div>
            </div>
        </div>
    );
}

export default QnARow;

