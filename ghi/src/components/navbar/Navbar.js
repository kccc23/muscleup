import { NavLink, useNavigate } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import React, { useState } from "react";
import {
	useGetTokenQuery,
	useLogOutMutation,
} from "../../redux-elements/authApi";
import { useDispatch } from "react-redux";
import { authApiSlice } from "../../redux-elements/authApi";
import LogInModal from "../Modal/LoginModal";

function Navbar() {
	const [logInModal, setLogInModal] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
	const { data } = useGetTokenQuery();
	const [logOut] = useLogOutMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOut = async (e) => {
		e.preventDefault();
		const response = await logOut();
		if (response.data) {
			navigate("/");
		}
		dispatch(authApiSlice.util.resetApiState());
	};

	const handleClick = () => {
		setLogInModal(true);
	};

	const handleOutsideClick = (e) => {
		if (e.target.className.includes("fixed")) {
			setLogInModal(false);
		}
	};

	return (
		<nav className="bg-transparent p-8 shadow-md">
		<div className="container mx-auto flex justify-between items-center flex-wrap">
			<NavLink className="text-6xl font-bold text-white mb-4 md:mb-0" to="/">
			MUSCLE UP
			</NavLink>
			<div className="md:hidden">
			<ImMenu
				onClick={toggleDropdown}
				className="text-white cursor-pointer"
			/>
			</div>
			<div
			className={`mx-2 md:flex-row md:justify-between md:items-center md:flex md:flex-wrap ${
				dropdownOpen ? "block items-center flex-col" : "hidden"
			}`}
			>
				<NavLink className="text-2xl font-bold text-white mr-6 hover:scale-110 transition-transform duration-300" to="/trainers">
					Trainers
				</NavLink>
				{data ? (
					<div className="flex items-center space-x-4">
					<img
						className="h-10 w-10 rounded-full mr-4"
						src={data.account.avatar}
						alt="User Avatar"
					/>
					<span className="text-white text-2xl fond-bold">
						{data.account.username}
					</span>
					<div className="flex flex-col mt-2 md:flex-row">
						<button
							className="text-white text-2xl fond-bold hover:underline"
							onClick={() => navigate("/dashboard")}
						>
							Dashboard
						</button>
						<button
							className="text-white text-2xl font-bold hover:underline"
							onClick={handleLogOut}
						>
							Logout
						</button>
					</div>
					</div>
				) : (
					<>
						<button
							className="text-white text-2xl font-bold mr-6 hover:scale-110 transition-transform duration-300"
							onClick={handleClick}
						>
							Login
						</button>
						<NavLink
							className="bg-white text-2xl font-bold py-2 px-4 rounded hover:scale-110 transition-transform duration-300 text-red-600"
							to="/signup"
						>
							Muscle UP!
						</NavLink>
					</>
				)}
			</div>
		</div>
		{logInModal && (
			<div
				className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
				onClick={handleOutsideClick}
			>
				<div className="loginModal">
					<LogInModal/>
				</div>
			</div>
		)}
		</nav>
	);
}

export default Navbar;
