import { useDispatch, useSelector } from "react-redux";
import { authApiSlice } from "../../redux-elements/authApi";
import { useLogInMutation, useLogOutMutation } from "../../redux-elements/authApi";
import { updateField } from "../../redux-elements/accountSlice";
import { useCallback, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";


function LogInModal() {
	const { email, password } = useSelector((state) => state.account);
	const dispatch = useDispatch();
	const [logIn, { isSuccess }] = useLogInMutation();
	const [logOut] = useLogOutMutation();
	const navigate = useNavigate();
	const [error, setError] = useState(false);

	const field = useCallback(
    (e) =>
		dispatch(updateField({ field: e.target.name, value: e.target.value })),
		[dispatch]
	);

	const handleLogIn = async () => {
		const response = await logIn({ email: email, password: password });

		if (response.data) {
			setError(false);
			navigate("/dashboard");
		} else {
			setError(true);
		}
	};

	return (
		<CssVarsProvider>
			<main>
				<Sheet
					sx={{
						width: 300,
						mx: "auto", // margin left & right
						my: 4, // margin top & bottom
						py: 3, // padding top & bottom
						px: 2, // padding left & right
						display: "flex",
						flexDirection: "column",
						gap: 2,
						borderRadius: "sm",
						boxShadow: "md",
					}}
					variant="outlined"
				>
					<div>
						<Typography level="h4" component="h1">
							<b>Log In!</b>
						</Typography>
						<Typography level="body2">Sign in to continue.</Typography>
					</div>
					{error && (
						<Box sx={{ display: "flex", gap: 2, width: "100%", flexDirection: "column" }}>
							<Alert
								startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
								variant="soft"
								color="danger"
								endDecorator={
									<React.Fragment>
										<IconButton
											variant="soft"
											size="sm"
											color="danger"
											onClick={() => {
												setError(false);
											}}
										>
											<CloseIcon />
										</IconButton>
									</React.Fragment>
								}
							>
								<Typography color="danger" fontWeight="md">
									Invalid email or password
								</Typography>
							</Alert>
						</Box>
					)}
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							required
							onChange={field}
							value={email}
							name="email"
							type="email"
							placeholder="johndoe@email.com"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							required
							onChange={field}
							value={password}
							name="password"
							type="password"
							placeholder="password"
						/>
					</FormControl>
					<Button sx={{ mt: 1 /* margin top */ }} type="submit" onClick={handleLogIn}>
						Log in
					</Button>
					<Button sx={{ mt: 1 /* margin top */ }} type="submit" onClick={() => {logOut(); dispatch(authApiSlice.util.resetApiState());}}>
						Log out
					</Button>
					<Typography
						endDecorator={<Link href="/signup">Sign up</Link>}
						fontSize="sm"
						sx={{ alignSelf: "center" }}
					>
						Don&apos;t have an account?
					</Typography>
				</Sheet>
			</main>
		</CssVarsProvider>
	);
}

export default LogInModal;
