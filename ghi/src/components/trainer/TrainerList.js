import "./trainer.css";
import * as React from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useGetAllTrainersQuery } from "../../redux-elements/trainerApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";


function TrainerList() {
    const { data: trainers, error, isLoading, refetch: refetchTrainers } = useGetAllTrainersQuery();

    useEffect(() => { refetchTrainers() }, [refetchTrainers]);

    if (error) {
        return <div className="trainer-error-loading-null-div">Oh no, there is an error</div>;
    }

    if (isLoading) {
        return <div className="trainer-error-loading-null-div">Loading ...</div>;
    }

    return (
        <div className="trainer-list">
            <h1 className="trainer-list-h1">Many trainers. One Track.</h1>
            <Link to='/trainers/new' className='trainer-form-link'>Apply to be a Trainer</Link>
            <div className="trainer-list-container">
                {trainers?.map(trainer => (
                    <Card sx={{ maxWidth: 345 }} key={trainer.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={trainer.picture}
                                alt={trainer.description}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {trainer.tags.map(tag => `#${tag}`).join(' ')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Qualifications: {trainer.qualification}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {trainer.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${trainer.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                MORE
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TrainerList;