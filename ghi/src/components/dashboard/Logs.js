import React, { useState } from "react";
import { useCreateMealMutation, useGetMealsQuery, useDeleteMealMutation } from "../../redux-elements/logMealApi";
import Fab from "@mui/material/Fab";
import { SiCookiecutter } from "react-icons/si";
import { GiMuscleUp } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { ModalDialog } from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";


function LogModal(showForm, setShowForm, form, setForm, createMutation) {
    const fields = Object.keys(form);

    const handleFormChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createMutation(form);
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
        <Button onClick={handleSubmit}>Button</Button>
        </Sheet>
    </Modal>
    )
}

function Logs() {
    const [mealForm, setMealForm] = useState({
        log_meal: "",
        meal_name: "",
    });

    const [showMealForm, setShowMealForm] = useState(false);
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [showWeightForm, setShowWeightForm] = useState(false);

    const [ createMeal ] = useCreateMealMutation();
    const { data: meals } = useGetMealsQuery();

    const handleMealClick = () => {
        setShowMealForm(true);
        setMealForm({
            log_meal: "",
            meal_name: "",
        });
    }

    return (
        <>
        <div>
            Log your meal, exercise and weight here
            <div>
                <Fab onClick={handleMealClick}>
                    <SiCookiecutter style={{ fontSize: "2rem" }}/>
                </Fab>
                <Fab>
                    <GiMuscleUp style={{ fontSize: "2rem" }}/>
                </Fab>
                <Fab>
                    <FaWeight style={{ fontSize: "2rem" }}/>
                </Fab>
            </div>
            {showMealForm && (
                LogModal(showMealForm, setShowMealForm, mealForm, setMealForm, createMeal)
            )}

        </div>
        <div>
            See your meals here
            <div>
                {meals?.map(meal => {
                    const today = new Date().toDateString();
                    const mealDay = new Date(meal.datetime).toDateString();
                    if (mealDay === today) {
                        return (
                            <div key={meal.id}>
                            <h3>{meal.meal_name}</h3>
                            {meal.meal_items.map(meal_item => (
                                <p key={meal_item.calories}>{meal_item.food_name} {meal_item.calories}</p>
                            ))}
                            </div>
                    )}
                })}
            </div>
        </div>
        </>
    )
}

export default Logs;