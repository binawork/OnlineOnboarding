import React from "react";


import Week from "./Week";


function Calendar() {


	return(
		<div className="board">
			<div className="card">
			    <header className="card-header d-flex flex-column flex-sm-row align-items-center justify-content-between">
			        <h5 className="card-title mb-sm-0">Październik 2020</h5>
			    </header>

				<div className="fc fc-media-screen fc-direction-ltr fc-theme-bootstrap fc-liquid-hack">
					<div className="fc-daygrid fc-dayGridMonth-view fc-view">
						<table className="fc-scrollgrid table-bordered fc-scrollgrid-liquid"><tbody>
<tr className="fc-scrollgrid-section fc-scrollgrid-section-header ">
	<td><div className="fc-scroller-harness"><div className="fc-scroller"><table className="fc-col-header "><colgroup></colgroup><tbody><tr><th className="fc-col-header-cell fc-day fc-day-sun"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Sun</a></div></th><th className="fc-col-header-cell fc-day fc-day-mon"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Mon</a></div></th><th className="fc-col-header-cell fc-day fc-day-tue"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Tue</a></div></th><th className="fc-col-header-cell fc-day fc-day-wed"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Wed</a></div></th><th className="fc-col-header-cell fc-day fc-day-thu"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Thu</a></div></th><th className="fc-col-header-cell fc-day fc-day-fri"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Fri</a></div></th><th className="fc-col-header-cell fc-day fc-day-sat"><div className="fc-scrollgrid-sync-inner"><a className="fc-col-header-cell-cushion ">Sat</a></div></th></tr></tbody></table></div></div>
	</td>
</tr>
							<tr className="fc-scrollgrid-section fc-scrollgrid-section-body  fc-scrollgrid-section-liquid">
								<td>
									<div className="fc-scroller-harness fc-scroller-harness-liquid">
										<div className="fc-scroller fc-scroller-liquid-absolute"><div className="fc-daygrid-body fc-daygrid-body-balanced "><table className="fc-scrollgrid-sync-table">
											<colgroup></colgroup>
											<tbody>
												<Week />
												<Week />
												<Week />
												<Week />
												<Week />
												<Week />
											</tbody>
										</table></div></div>
									</div>
								</td>
							</tr>
						</tbody></table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calendar;

