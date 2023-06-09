import "./trainer.css";
import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCreateTrainerMutation } from "../../redux-elements/trainerApi";
import { useGetTokenQuery } from "../../redux-elements/authApi";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/material/Alert";

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

function TrainerForm() {
    const [formData, setFormData] = useState({
        picture: "",
        qualification: "",
        tags: "",
        description: "",
        price: "",
    });
    const [ createTrainer, { error: trainerError, isSuccess } ] = useCreateTrainerMutation();
    const { data: account, error: tokenError, isLoading, refetch: refetchToken } = useGetTokenQuery();
    const navigate = useNavigate();

    useEffect(() => { refetchToken() }, [refetchToken]);

    useEffect(() => {
		try {
			if (isSuccess) {
				navigate("/trainers");
			}
		} catch (err) {
			console.error(err);
		}
	}, [isSuccess, navigate]);

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({...formData ,[inputName]: value});
    }

    if (tokenError) {
        return <div className="trainer-error-loading-null-div">Oh no, there is an error</div>;
    }

    if (isLoading) {
        return <div className="trainer-error-loading-null-div">Loading ...</div>;
    }

    if (!account) {
        return (
            <div className="trainer-error-loading-null-div">
                <h3>
                    Please{' '}
                    Login or <Link to="/signup">Sign up</Link> to apply
                </h3>
            </div>
        );
    }

    return (
        <div className="trainer-form">
            <h1>Apply to be a Trainer</h1>
			{trainerError && trainerError.status === 400 && (
				<Alert severity="error">This trainer already exists</Alert>
			)}
            <form>
                <FormLabel>Picture</FormLabel>
				<InputTag
					field={handleFormChange}
					value={formData.picture}
					name="picture"
					type="url"
					placeholder="Put your picture URL here..."
				/>
                <FormLabel>Qualification</FormLabel>
				<InputTag
					field={handleFormChange}
					value={formData.qualification}
					name="qualification"
					type="text"
					placeholder="Type your qualification here..."
				/>
                <FormLabel>Tags</FormLabel>
				<InputTag
					field={handleFormChange}
					value={formData.tags}
					name="tags"
					type="text"
					placeholder="Seperate your tags with space..."
				/>
                <FormLabel>Description</FormLabel>
				<InputTag
					field={handleFormChange}
					value={formData.description}
					name="description"
					type="text"
					placeholder="Type your description here..."
				/>
                <FormLabel>Price</FormLabel>
				<InputTag
					field={handleFormChange}
					value={formData.price}
					name="price"
					type="number"
					placeholder="Price"
				/>
            </form>
            <Button
				sx={{ mt: 1 /* margin top */ }}
				onClick={(e) => {
					e.preventDefault();
					createTrainer({
						picture: formData.picture,
						qualification: formData.qualification,
						tags: formData.tags,
						description: formData.description,
						price: formData.price,
					});
					setFormData({
						picture: "",
						qualification: "",
						tags: "",
						description: "",
						price: "",
					});
				}}
			>
				Apply
			</Button>
        </div>
    );
}

export default TrainerForm;
