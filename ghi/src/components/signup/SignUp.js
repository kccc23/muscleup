import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../../redux-elements/authApi";
import { updateField } from "../../redux-elements/accountSlice";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

function InputTag(props) {
	const { field, value, name, type, placeholder } = props;
	return (
		<Input
			required
			onChange={field}
			value={value}
			name={name}
			type={type}
			placeholder={placeholder}
		/>
	);
}

function SignUp() {
	const { username, email, password, first_name, last_name } = useSelector(
		(state) => state.account
	);
	const dispatch = useDispatch();
	const [signUp, { isSuccess }] = useSignUpMutation();
	const navigate = useNavigate();
	const field = useCallback(
		(e) =>
			dispatch(
				updateField({ field: e.target.name, value: e.target.value })
			),
		[dispatch]
	);

	useEffect(() => {
		try {
			if (isSuccess) {
				navigate("/profileform");
			}
		} catch (err) {
			console.error(err);
		}
	}, [isSuccess, navigate]);

	return (
		<div className="sign-up-container">
			<h1>Sign Up</h1>
			<form>
				<FormLabel>Username</FormLabel>
				<InputTag
					field={field}
					value={username}
					name="username"
					type="text"
					placeholder="johndoe"
				/>
				<FormLabel>Email</FormLabel>
				<InputTag
					field={field}
					value={email}
					name="email"
					type="email"
					placeholder="johndoe@email.com"
				/>
				<FormLabel>Password</FormLabel>
				<InputTag
					field={field}
					value={password}
					name="password"
					type="password"
					placeholder="********"
				/>
				<FormLabel>First Name</FormLabel>
				<InputTag
					field={field}
					value={first_name}
					name="first_name"
					type="text"
					placeholder="john"
				/>
				<FormLabel>Last Name</FormLabel>
				<InputTag
					field={field}
					value={last_name}
					name="last_name"
					type="text"
					placeholder="doe"
				/>
			</form>
			<Button
				sx={{ mt: 1 /* margin top */ }}
				onClick={(e) => {
					e.preventDefault();
					signUp({
						username: username,
						email: email,
						password: password,
						first_name: first_name,
						last_name: last_name,
					});
				}}
			>
				Sign Up
			</Button>
		</div>
	);
}

export default SignUp;
