import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetQuery } from "../../redux-elements/profileApi";
import { useGetTokenQuery } from "../../redux-elements/authApi";

function Main() {
	const { data: ProfileInformation, error, isLoading } = useGetQuery();
	console.log(ProfileInformation);

	return (
		<div>
			<button>TESTTTTTING</button>
		</div>
	);
}

export default Main;
