import "./Main.css";
import React from "react";
import { Link } from "react-router-dom";

function Main() {
	return (
		<div className="hero-page" style={{ height: "100%" }}>
			<div className="img-container">
				<section className="hero-component">
					<div className="hero-paragraph">
						<p className="hero-p-tag">
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
						<Link to="/signup" className="hero-sign-up">
							Muscle Up!
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Main;
