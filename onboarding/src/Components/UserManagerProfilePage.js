import React from "react";

import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import UserProfileManage from "./UserProfileManage";
import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import PageAddressBar from "./PageAddressBar"

function UserManagerProfilePage() {
	//const singleUser = {name: "Craig Hansen", email: "chansen@example.com", position: "Software Developer", department: "Foo Bar", localization: "Lorem Ipsum", sent: 4, finished: 2};

    return (
    	<div className="app">
    		<header className="app-header app-header-dark">
    			<Navbar />
    		</header>
    		<LeftMenu />
    		<main className="app-main">
    			<div className="wrapper"><div className="page">
    				<div className="page-inner">
    					<PageAddressBar page = { "Profil pracownika" } />

    					<div className="page-section">
    						<div className="card card-fluid">
    							<div className="card-header">Pracownik</div>
    							<div className="row"> {/* placeholder */}
    								<div className="col">
    									<div className="card-body align-items-center text-center">
    										<div className="user-avatar user-avatar-xl fileinput-button">
    											<div className="fileinput-button-label"> Dodaj/zmień zdjęcie </div><img src="/onboarding/static/images/unknown-profile.jpg" alt="" />
    											<input id="fileupload-avatar" type="file" name="avatar" />
    										</div>
    									</div>
    								</div>

    								<div className="col">
    									<UserProfileManage /> {/* placeholder */}
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div></div>
    	    </main>
        </div>
    );
}

export default UserManagerProfilePage;

