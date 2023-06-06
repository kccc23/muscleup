import "./dashboard.css"
import React, { useEffect } from "react";
import { useGetProfileQuery } from "../../redux-elements/profileApi";


function ProfileDashboard() {
    const { data: profile, refetch: refetchProfile } = useGetProfileQuery();

    useEffect(() => { refetchProfile() }, [refetchProfile]);

    return (
        <div>
            <p>Your goals are {profile?.goal}, your current weight is {profile?.weight} your goal weight is {profile?.goal_weight}</p>
        </div>
    );
}

export default ProfileDashboard;
