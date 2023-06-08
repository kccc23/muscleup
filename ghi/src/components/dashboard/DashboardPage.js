import "./dashboard.css";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useGetTokenQuery } from "../../redux-elements/authApi";
import { useGetProfileQuery } from "../../redux-elements/profileApi";
import ProfileDashboard from "./ProfileShow";
import Logs from './Logs';
import GraphWeightCalories from "./GraphWeightCalories";
import GraphMacroSugar from "./GraphMacroSugar";


function Dashboard() {
    const { data: account, error, isLoading, refetch: refetchToken } = useGetTokenQuery();
    const { data: profile, refetch: refetchProfile } = useGetProfileQuery();

    useEffect(() => { refetchToken() }, [refetchToken]);
    useEffect(() => { refetchProfile() }, [refetchProfile]);

    if (error) {
        return <div className="error-loading-null-div">Oh no, there is an error</div>;
    }

    if (isLoading) {
        return <div className="error-loading-null-div">Loading ...</div>;
    }

    if (!account) {
        return (
            <div className="error-loading-null-div">
                <h3>
                    Please{' '}
                    Login or <Link to="/signup">Sign up</Link> to access the dashboard
                </h3>
            </div>
        );
    }

    if (account && profile && 'message' in profile) {
        return (
            <div className="error-loading-null-div">
                <h3>
                    Please{' '}
                    <Link to="/profileform">Create Your Profile</Link> to access the dashboard
                </h3>
            </div>
        );
    }

    return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div className="dashboard-container">
				<div className="dashboard-component">
					<ProfileDashboard />
				</div>
				<div className="dashboard-component">
					<Logs />
				</div>
				<div className="dashboard-component"><GraphWeightCalories /></div>
				<div className="dashboard-component"><GraphMacroSugar /></div>
			</div>
		</div>
	);
}

export default Dashboard;