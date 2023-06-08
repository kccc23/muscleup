import "./dashboard.css"
import React, { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../redux-elements/profileApi";
import { useGetTokenQuery, useUpdateAvatarMutation } from "../../redux-elements/authApi";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Avatar from '@mui/joy/Avatar';

function AvatarModal(showForm, setShowForm, form, setForm, updateAvatar=null) {


    const fields = Object.keys(form);

    const handleFormChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (updateAvatar) {
            updateAvatar(form);
        }
        setShowForm(false);
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={showForm}
            onClose={() => {setShowForm(false)}}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}
        >
        <ModalClose
            variant="outlined"
            sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
            }}
        />
        {fields.map(field => (
            <div key={field}>
                <FormLabel>{field}</FormLabel>
                <Input
                    required
                    value={form.field}
                    name={field}
                    onChange={handleFormChange}
                    type="text"
                    placeholder={field}
                />
            </div>
        ))}
        <Button onClick={handleSubmit}>Add</Button>
        </Sheet>
    </Modal>
    )
}

function ProfileDashboard() {
    const { data: profile, refetch: refetchProfile } = useGetProfileQuery();
    const { data: tokenData, refetch: refetchtokenData } = useGetTokenQuery();


    useEffect(() => { refetchProfile() }, [refetchProfile]);
    useEffect(() => { refetchtokenData() }, [refetchtokenData]);

    const [avatarForm, setAvatarForm] = useState({
        avatar_url: "",
    });
    const [showAvatarForm, setShowAvatarForm] = useState(false);
    const [ updateAvatar ] = useUpdateAvatarMutation();

    const handleAvatarClick = () => {
        setShowAvatarForm(true);
        setAvatarForm({
            avatar_url: "",
        })
    }




    return (
		<div className="profile-component">
			<div className="avatar-profile">
				<Avatar src={tokenData.account.avatar} onClick={handleAvatarClick} sx={{ width: 120, height: 120 }} />
			</div>
			<div className="profile-text">
				<p className="goals">{profile?.goal}</p>
				<div className="weight components">
					<div>Your current weight is {profile?.weight} lbs</div>
					<div>Your goal weight is {profile?.goal_weight} lbs </div>
				</div>
			</div>
			{showAvatarForm && AvatarModal(showAvatarForm, setShowAvatarForm, avatarForm, setAvatarForm, updateAvatar)}
		</div>
	);
}

export default ProfileDashboard;
