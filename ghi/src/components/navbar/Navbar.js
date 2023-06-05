import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { ImHome, ImMenu } from "react-icons/im";
import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "../../redux-elements/authApi";

function Navbar() {
	const [sideBar, setSideBar] = useState(false);
	const toggleSideBar = () => setSideBar(!sideBar);
	const { data } = useGetTokenQuery();

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
										CSS
									</NavLink>
								</li>
								<li className="navbar-item">
									<NavLink className="navbar-link" to="/login">
										SUCKS!!!!
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
									<NavLink className="navbar-link" to="/login">
										Login
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
				{data ? (
					<div className="navbar-button">
						<NavLink className="navbar-link" to="/signup">
							I'M LOGGED IN!!!!!!!!!!!!
						</NavLink>
					</div>
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
						<NavLink to="/" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
							<li className="navItemSide">Home</li>
						</NavLink>
						<NavLink to="/login" onClick={toggleSideBar} style={{ textDecoration: "None" }}>
							<li className="navItemSide">Login</li>
						</NavLink>
					</ul>
				</div>
				<div
					className="dark-overlay"
					onClick={toggleSideBar}
					style={sideBar ? { opacity: "100%" } : { opacity: "0%", display: "none" }}
				/>
			</div>
		</nav>
	);
}

export default Navbar;
