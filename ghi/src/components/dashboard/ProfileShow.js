import "./dashboard.css"
import React, { useEffect } from "react";
import { useGetProfileQuery } from "../../redux-elements/profileApi";
import { Link } from "react-router-dom";


function ProfileDashboard() {
    const { data: profile, refetch: refetchProfile } = useGetProfileQuery();

    useEffect(() => { refetchProfile() }, [refetchProfile]);

    let createProfileClass = "create-profile";
    if (profile) {
        createProfileClass = "has-profile";
    }
    const newWeight = (profile?.weight* 0.453592).toFixed(2);

    return (
        <>
        <div className={createProfileClass}>
            <h3>Please create your profile</h3>
            <Link to="/profileform">Click here </Link>
        </div>
        <div>
            <p>Your goals are {profile?.goal}, your current weight is {newWeight} your goal weight is {profile?.goal_weight}</p>
        </div>
        </>
    );
}

export default ProfileDashboard;
