import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateToString } from "../utils";
import bookOpenedIcon from "../../static/icons/book-opened.svg";
import trashIcon from "../../static/icons/trash.svg";

function FormTableRow(props) {
    const [styleRow, setStyleRow] = useState(null);

    useEffect(() => {
        if(props.lastRow && Date.now() - Date.parse(props.row.last_edit) < 3000) {
            setStyleRow("FormTable__row--darken")
        } else {
            setStyleRow(null);
        }
    }, [props.lastRow]);


    return (
      <tr className={ `FormTable__row ${styleRow || ""}` }>
        <td className="FormTable__data FormTable__data--name">
          <Link
            to={{
              pathname: `/form/${props.row.id}`,
              state: {
                packageId: props.packageId,
                packageTitle: props.packageTitle,
                formId: props.row.id,
                formName: props.row.name,
                description: props.row.description,
                link: props.row.link,
              },
            }}
          >
            <img className="FormTable__icon" src={ bookOpenedIcon } alt="#" />
            {props.row.name}
          </Link>
        </td>
        <td className="FormTable__data FormTable__data--date">{dateToString(props.row.last_edit)}</td>
        <td className="FormTable__data FormTable__data--nowrap">
          <div className="FormTable__buttons-box">
            <Link
              to={{
                pathname: `/form/${props.row.id}`,
                state: {
                  packageId: props.packageId,
                  packageTitle: props.packageTitle,
                  formId: props.row.id,
                  formName: props.row.name,
                  description: props.row.description,
                  link: props.row.link,
                },
              }}
              className="FormTable__button btn mr-1"
              >
              Edytuj
            </Link>
            <button 
              className="FormTable__button FormTable__button--smaller btn"
              data-id={ props.row.id }
              onClick={ props.handleRemoveAsk }
              >
              <img className="FormTable__button-icon" src={ trashIcon } data-id={ props.row.id } alt="Usuń" />
            </button>
          </div>
        </td>
      </tr>
    );
}

export default FormTableRow;

