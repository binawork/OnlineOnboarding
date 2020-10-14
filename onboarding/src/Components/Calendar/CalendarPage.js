import React, { useRef } from "react";

//import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import Calendar from "./Calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarPage(props) {
    const packageIdRef = useRef(0);
    if(props.location.state)
        packageIdRef.current = props.location.state.packageId;

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar /> {/* placeholder */}
            </header>
            <LeftMenu packageId = { packageIdRef.current } />
            <main className="app-main">
                <div className="wrapper"><div className="page">
                    <div className="page-inner">
                        <PageAddressBar page = { "Kalendarz" } /> {/* placeholder */}

                        {/*<nav className="page-navs pr-3">
                            <div className="btn-group">
                                <button id="calendar-prev" className="btn btn-secondary"><i className="fa fa-chevron-left">&larr;</i></button>
                                <button id="calendar-today" className="btn btn-secondary">Today</button>
                                <button id="calendar-next" className="btn btn-secondary"><i className="fa fa-chevron-right">&rarr;</i></button>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="btn btn-success">Add event</button>
                                <button type="button" className="btn btn-secondary d-xl-none" data-toggle="sidebar"><i className="fas fa-tasks"></i></button>
                            </div>
                        </nav>*/}

                        <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" />

                    </div>
                </div></div>
            </main>
        </div>
    )
}

export default CalendarPage;

