import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux-elements/authApi";
import { showModal, updateField, LOG_IN_MODAL } from "../../redux-elements/accountSlice";
import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

function LogInModal() {
    const { username, password } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [logIn, { error, isLoading: logInLoading }] = useLoginMutation();


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
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                required
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                required
                name="password"
                type="password"
                placeholder="password"
                />
            </FormControl>
            <Button sx={{ mt: 1 /* margin top */ }} onClick={() => dispatch()}>Log in</Button>
            <Typography
                endDecorator={<Link href="/sign-up">Sign up</Link>}
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