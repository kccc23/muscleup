import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation, useLogOutMutation } from "../../redux-elements/authApi";
import { showModal, updateField, LOG_IN_MODAL } from "../../redux-elements/accountSlice";
import { useCallback } from 'react';
import { eventTargetSelector as target, preventDefault } from "../../redux-elements/utils";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

function LogInModal() {
    const { email, password } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [logIn] = useLogInMutation();
    const [logOut] = useLogOutMutation();
    const field = useCallback(
        e => dispatch(updateField({field: e.target.name, value: e.target.value})),
        [dispatch],
    );

    return (
    <CssVarsProvider>
        <main>
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto', // margin left & right
                    my: 4, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
            }}
            variant="outlined"
            >
            <div>
                <Typography level="h4" component="h1">
                    <b>Log In!</b>
                </Typography>
                <Typography level="body2">Sign in to continue.</Typography>
            </div>
            <FormControl method="POST" onSubmit={preventDefault(logIn, target)}>
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
            <Button sx={{ mt: 1 /* margin top */ }} type="submit" onClick={() => logIn({email: email, password: password})}>Log in</Button>
            <Button sx={{ mt: 1 /* margin top */ }} type="submit" onClick={() => logOut()}>Log out</Button>
            <Typography
                endDecorator={<Link href="/signup">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
            >
                Don&apos;t have an account?
            </Typography>
            </Sheet>
        </main>
    </CssVarsProvider>
    );
}

export default LogInModal;