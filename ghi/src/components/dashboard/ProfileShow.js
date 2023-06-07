import "./dashboard.css"
import React, { useEffect } from "react";
import { useGetProfileQuery } from "../../redux-elements/profileApi";


function ProfileDashboard() {
    const { data: profile, refetch: refetchProfile } = useGetProfileQuery();

    useEffect(() => { refetchProfile() }, [refetchProfile]);

    return (
        <div>
            <p>Your goals are {profile?.goal}. Your current weight is {profile?.weight} lbs. Your goal weight is {profile?.goal_weight} lbs</p>
        </div>
    );
}

export default ProfileDashboard;
