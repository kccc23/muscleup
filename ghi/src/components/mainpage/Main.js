import "./main.css";
import React from "react";

function Main() {
return (
        <div className="hero-page" style={{ height: "100%" }}>
			<div className="img-container">
				<section className="hero-component">
						<div className="hero-paragraph">
							<p className="hero-p-tag">
								From Lawn Mowing to Iron Man
								<br />
								From Seaweed to Turducken
								<br />
								We Help you Track
								<br />
								Meet your Unique Goals
								<br />
								Keep you Challenged and Engaged
							</p>
							<a href="/signup" className="hero-sign-up">Muscle Up!</a>
						</div>
					</section>
			</div>
        </div>
    );
}

export default Main;
