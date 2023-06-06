import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ImHome, ImMenu } from "react-icons/im";
import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../redux-elements/authApi";
import Avatar from "@mui/joy/Avatar";
import { useLogOutMutation } from "../../redux-elements/authApi";
import { useDispatch } from "react-redux";
import { authApiSlice } from "../../redux-elements/authApi";
import LogInModal from "../Modal/LoginModal";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

function Navbar() {
	const [sideBar, setSideBar] = useState(false);
	const [logInModal, setLogInModal] = useState(false);
	const toggleSideBar = () => setSideBar(!sideBar);
	const toggleLogInModal = () => setLogInModal(!logInModal);
	const { data } = useGetTokenQuery();
	const [logOut] = useLogOutMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Stuff for the material UI dropdown menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleDropDownClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleDropDownClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		// Hide Sidebar on Resize
		const hideMenu = () => {
			if (window.innerWidth <= 768) {
				setSideBar(false);
			}
		};

		window.addEventListener("resize", hideMenu);

		return () => {
			window.removeEventListener("resize", hideMenu);
		};
	}, []);

	const handleLogOut = async (e) => {
		e.preventDefault();
		const response = await logOut();
		toggleSideBar();
		if (response.data) {
			navigate("/");
		}
		dispatch(authApiSlice.util.resetApiState());
	};

	return (
		<nav className="navbar">
			<div className="navbar-container-image">
				<ImHome className="navbar-logo"></ImHome>
				<NavLink className="navbar-title" to="/">
					MuscleUp
				</NavLink>
			</div>

			<div className="right-bar">
				<div className="navbar-container-links">
					<ul className="navbar-links">
						{data ? (
							<>
								<li className="navbar-item">
									<NavLink className="navbar-link" to="">
										Trainers
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li className="navbar-item">
									<NavLink className="navbar-link" to="">
										Trainers
									</NavLink>
								</li>
								<li className="navbar-item">
									<div className="navbar-link" onClick={toggleLogInModal}>
										Login
									</div>
								</li>
							</>
						)}
					</ul>
				</div>
				{data ? (
					<>
						<div className="navbar-profile" onClick={handleDropDownClick}>
							<Avatar className="avatar" variant="solid" src="" />
						</div>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleDropDownClose}
							aria-labelledby="basic-demo-button"
						>
							<MenuItem onClick={() => {handleDropDownClose(); navigate("/")}}>Home</MenuItem>
							<MenuItem onClick={() => {handleDropDownClose(); navigate("/dashboard")}}>Dashboard</MenuItem>
							<MenuItem onClick={handleLogOut}>Logout</MenuItem>
						</Menu>
					</>
				) : (
					<div className="navbar-button">
						<NavLink className="navbar-link" to="/signup">
							Muscle UP!
						</NavLink>
					</div>
				)}
				<div className="navbar-hamburger-button">
					<ImMenu className="navbar-hamburger-menu-icon" onClick={toggleSideBar}></ImMenu>
				</div>

				{/* Hamburger Menu */}
				<div className="navSideMenu" style={sideBar ? { right: "0" } : { right: "-100%" }}>
					<ul className="navSideMenuItems">
						{data ? (
							<>
								<NavLink to="/" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
									<li className="navItemSide">Home</li>
								</NavLink>
								<NavLink to="/dashboard" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
									<li className="navItemSide">Dashboard</li>
								</NavLink>
								<NavLink to="/" onClick={handleLogOut} style={{ textDecoration: "None" }}>
									<li className="navItemSide">Logout</li>
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
									<li className="navItemSide">Home</li>
								</NavLink>
								<NavLink to="/signup" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
									<li className="navItemSide">Signup</li>
								</NavLink>
								<div
									onClick={() => {
										toggleLogInModal();
										toggleSideBar();
									}}
									style={{ textDecoration: "None" }}
								>
									<li className="navItemSide">Login</li>
								</div>
							</>
						)}
					</ul>
				</div>
				<div
					className="dark-overlay"
					onClick={toggleSideBar}
					style={sideBar ? { opacity: "100%" } : { opacity: "0%", display: "none" }}
				/>
				<div
					className="login-modal"
					style={logInModal ? { opacity: "100%", zIndex: "100" } : { opacity: "0%", pointerEvents: "none" }}
				>
					<LogInModal toggleLogInModal={toggleLogInModal} />
				</div>
				<div
					className="dark-overlay-login"
					onClick={toggleLogInModal}
					style={logInModal ? { opacity: "100%" } : { opacity: "0%", pointerEvents: "none" }}
				></div>
			</div>
		</nav>
	);
}

export default Navbar;
