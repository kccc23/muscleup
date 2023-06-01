import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import ProfileDashboard from "./ProfileShow";
import Logs from './Logs';

function Dashboard() {

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width:"600px", border:"5px solid black", height:"300px", marginRight:"auto" }}>
                <ProfileDashboard />
                <Outlet />
            </div>
            <div style={{ width:"400px", border:"5px solid black", height:"600px", marginLeft:"auto" }}>
                <Logs />
            </div>
        </div>
    );
}

export default Dashboard;