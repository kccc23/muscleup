import React from "react";
import { Link } from "react-router-dom";

function Main() {
	return (
	<div className="p-6">

		<div className="mb-6">
		<img
			className="w-full min-h-screen object-cover rounded-lg shadow-lg"
			src="https://images.unsplash.com/photo-1517245386807-9b0f8b5b8de7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhd24lMjBtb3JuaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
			alt="Cool Video"
		/>
		</div>

		<div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
		<div className="flex flex-col items-center justify-center">
		<p className="text-3xl text-gray-700 font-semibold mb-4 leading-tight">
			From Lawn Mowing to IronMan
			<br />
			From Seaweed to Tomahawk Steak
			<br />
			We Help you Track
			<br />
			Meet your Unique Goals
			<br />
			Keep you Challenged and Engaged
		</p>
		<Link
			to="/signup"
			className="bg-white w-1/3 text-center transform hover:scale-110 transition-transform duration-300 px-6 py-2 rounded inline-block font-bold text-gray-700 hover:bg-red-600"
		>
			Muscle Up!
		</Link>
		</div>
		</div>
	</div>
	);

}

export default Main;
