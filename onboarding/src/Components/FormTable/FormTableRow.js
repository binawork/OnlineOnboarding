import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateToString } from "../utils";
import "../../static/css/style.css";

function FormTableRow(props) {
    const [styleRow, setStyleRow] = useState(null);

    useEffect(() => {
        if(props.lastRow && Date.now() - Date.parse(props.row.last_edit) < 3000) {
            setStyleRow('style-package-row')
        } else {
            setStyleRow(null);
        }
    }, [props.lastRow]);


    return (
      <tr className={ `table__row ${styleRow || ""}` }>
        <td className="table__data">
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
            {props.row.name}
          </Link>
        </td>
        <td className="table__data">{dateToString(props.row.last_edit)}</td>
        <td className="table__data table__data--nowrap">
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
            className="btn btn-secondary mr-1"
          >
            Edytuj
          </Link>
          <button 
            className="btn btn-warning"
            value={ props.row.id }
            onClick={ props.handleRemoveAsk }
          >
            Usuń
          </button>
        </td>
      </tr>
    );
}

export default FormTableRow;

