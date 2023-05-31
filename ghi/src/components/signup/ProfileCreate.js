import "./signup.css";
import React, { useCallback, useState } from "react";
import FormLabel from "@mui/joy/FormLabel/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useDispatch, useSelector } from "react-redux";
import { useCreateProfileMutation } from "../../redux-elements/profileApi";
import { updateField } from "../../redux-elements/profileSlice";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";



function ProfileCreate() {
    const rangeFeet = [3,4,5,6,7]
    const rangeInches = [0,1,2,3,4,5,6,7,8,9,10,11]
    const [createProfile, {isSuccess}] = useCreateProfileMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { goal, height_ft, height_in, weight, goal_weight, date_of_birth, gender } = useSelector(
        (state) => state.profile
    );
    const field = useCallback(
        (e) => dispatch(updateField({field: e.target.name, value: e.target.value})),
        [dispatch],
    );

    const handleGenderSelect = useCallback(
        (e, value) => dispatch(updateField({field: "gender", value: value})),
        [dispatch],
    );

    const handleFtSelect = useCallback(
        (e, value) => dispatch(updateField({field: "height_ft", value: value})),
        [dispatch],
    );

    const handleInSelect = useCallback(
        (e, value) => dispatch(updateField({field: "height_in", value: value})),
        [dispatch],
    );

    const [error, setError] = useState(false);

    const handleProfileCreate = async () => {
        const response = await createProfile({goal: goal,
            height_ft: height_ft,
            height_in: height_in,
            weight: weight, 
            goal_weight: goal_weight,
            date_of_birth: date_of_birth,
            gender: gender
        })

        if (response.data) {
			setError(false);
			navigate("/");
		} else {
			setError(true);
		}
    }

    

    return (
        <div className="sign-up-container">
            <h1>Create Your Profile</h1>
            {error && (
                <Alert severity="error" onClose={() => {setError(false)}}>
                <AlertTitle>Error</AlertTitle>
                    Profile for this user already exists
                </Alert>
            )}
            <form>
            <FormLabel>Goals</FormLabel>
            {/* come back to enforce max length on text-area */}
            <Textarea
                value={goal}
                onChange={field}
                name="goal"
                minRows={3}
                maxRows={6}
                placeholder="What are your goals?"
            />
            <FormLabel>Date of Birth</FormLabel>
            <Input value={date_of_birth} name="date_of_birth" type="date" onChange={field} />
            <FormLabel>Height</FormLabel>
            <Select placeholder={6}  name="height_ft" endDecorator="ft" onChange={handleFtSelect}>
                {rangeFeet.map( num => (<Option value={num} key={num}>{num}</Option>))}
            </Select>
            <Select placerholder={10} name="height_in" endDecorator="in" onChange={handleInSelect}>
                {rangeInches.map( num => (<Option value={num} key={num}>{num}</Option>))}
            </Select>
            <FormLabel>Weight</FormLabel>
            <Input
                name="weight"
                type="number"
                onChange={field}
                value={weight}
                placeholder="200"
                endDecorator="lbs"
                slotProps={{
                    input: {
                        min: 0,
                        max: 1000,
                        step: .1,
                    }
                }}
            />
            <FormLabel>Goal Weight</FormLabel>
            <Input
                onChange={field}
                value={goal_weight}
                name="goal_weight"
                type="number"
                placeholder="190"
                endDecorator="lbs"
                slotProps={{
                    input: {
                        min: 0,
                        max: 1000,
                        step: .1,
                    }
                }}
            />
            <FormLabel>Gender</FormLabel>
            <Select name="gender" placeholder="Other" onChange={handleGenderSelect}>
                <Option value="Male" key="Male">Male</Option>
                <Option value="Female" key="Female">Female</Option>
                <Option value="Other" key="Other">Other</Option>
            </Select>
            </form>
            <Button sx={{ mt: 1 }} type="submit" onClick={handleProfileCreate}>Create Profile</Button>
        </div>
    );
}

export default ProfileCreate;
