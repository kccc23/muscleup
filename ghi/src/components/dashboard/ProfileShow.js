import "./dashboard.css"
import React from "react";
import { useGetProfileQuery } from "../../redux-elements/profileApi";
import { Link } from "react-router-dom";


function ProfileDashboard() {
    const { data: profile } = useGetProfileQuery();

    let createProfileClass = "create-profile";
    if (profile) {
        createProfileClass = "has-profile";
    }

    return (
        <>
        <div className={createProfileClass}>
            <h3>Please create your profile</h3>
            <Link to="/profileform">Click here </Link>
        </div>
        <div>
            <p>Your goals are {profile?.goal}, your goal weight is {profile?.goal_weight}</p>
        </div>
        </>
    );
}

export default ProfileDashboard;
