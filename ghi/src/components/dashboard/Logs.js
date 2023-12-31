import * as React from "react";
import { useState } from "react";
import { useCreateMealMutation, useGetMealsQuery, useDeleteMealMutation } from "../../redux-elements/logMealApi";
import { useCreateWeightMutation } from "../../redux-elements/logWeightApi";
import { useUpdateWeightProfileMutation } from "../../redux-elements/profileApi";
import {
	useCreateExerciseMutation,
	useGetExercisesQuery,
	useDeleteExerciseMutation,
} from "../../redux-elements/logExerciseApi";
import Fab from "@mui/material/Fab";
import { SiCookiecutter } from "react-icons/si";
import { GiMuscleUp } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function LogModal(showForm, setShowForm, form, setForm, createMutation, updateWeightProfile = null) {
	const fields = Object.keys(form);

	const handleFormChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createMutation(form);
		if (updateWeightProfile) {
			updateWeightProfile(form);
		}
		setShowForm(false);
	};

	return (
		<Modal
			aria-labelledby="modal-title"
			aria-describedby="modal-desc"
			open={showForm}
			onClose={() => {
				setShowForm(false);
			}}
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Sheet
				variant="outlined"
				sx={{
					maxWidth: 500,
					borderRadius: "md",
					p: 3,
					boxShadow: "lg",
				}}
			>
				<ModalClose
					variant="outlined"
					sx={{
						top: "calc(-1/4 * var(--IconButton-size))",
						right: "calc(-1/4 * var(--IconButton-size))",
						boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
						borderRadius: "50%",
						bgcolor: "background.body",
					}}
				/>
				{fields.map((field) => (
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
	);
}

function Logs() {
	const [mealForm, setMealForm] = useState({
		log_meal: "",
		meal_name: "",
	});
	const [weightForm, setWeightForm] = useState({
		log_weight: "",
	});

	const [exerciseForm, setExerciseForm] = useState({
		log_exercise: "",
		exercise_name: "",
	});

	const [showMealForm, setShowMealForm] = useState(false);
	const [showExerciseForm, setShowExerciseForm] = useState(false);
	const [showWeightForm, setShowWeightForm] = useState(false);

	const [createMeal] = useCreateMealMutation();
	const { data: meals, isLoading: mealLoading } = useGetMealsQuery();
	const [deleteMeal] = useDeleteMealMutation();

	const [createWeight] = useCreateWeightMutation();
	const [updateWeightProfile] = useUpdateWeightProfileMutation();

	const [createExercise] = useCreateExerciseMutation();
	const { data: exercises, isLoading: exerciseLoading } = useGetExercisesQuery();
	const [deleteExercise] = useDeleteExerciseMutation();

	const handleMealClick = () => {
		setShowMealForm(true);
		setMealForm({
			log_meal: "",
			meal_name: "",
		});
	};

	const handleWeightClick = () => {
		setShowWeightForm(true);
		setWeightForm({
			log_weight: "",
		});
	};

	const handleExerciseClick = () => {
		setShowExerciseForm(true);
		setExerciseForm({
			log_exercise: "",
			exercise_name: "",
		});
	};

	let foodTotalCal = 0;
	let exerciseTotalCal = 0;

	return (
		<div className="log-container">
			<div>
				<div className="button-box">
					<Fab onClick={handleMealClick} style={{ zIndex: "1" }} size="small">
						<SiCookiecutter style={{ fontSize: "1rem" }} />
					</Fab>
					<Fab onClick={handleExerciseClick} style={{ zIndex: "1" }} size="small">
						<GiMuscleUp style={{ fontSize: "1rem" }} />
					</Fab>
					<Fab onClick={handleWeightClick} style={{ zIndex: "1" }} size="small">
						<FaWeight style={{ fontSize: "1rem" }} />
					</Fab>
				</div>
				{showMealForm && LogModal(showMealForm, setShowMealForm, mealForm, setMealForm, createMeal)}
				{showExerciseForm &&
					LogModal(showExerciseForm, setShowExerciseForm, exerciseForm, setExerciseForm, createExercise)}
				{showWeightForm &&
					LogModal(
						showWeightForm,
						setShowWeightForm,
						weightForm,
						setWeightForm,
						createWeight,
						updateWeightProfile
					)}
			</div>
			<div>
				<p className="section-label">Today's calorie intake</p>
				{mealLoading ? (
					<>Loading...</>
				) : meals ? (
					<div>
						{meals.map((meal) => {
							const today = new Date().toDateString();
							const mealDay = new Date(meal.datetime).toDateString();
							if (mealDay === today) {
								return (
									<div key={meal.id}>
										<div style={{ display: "flex" }}>
											<ul className="calorie-list">
												{meal.meal_items.map((meal_item) => {
													foodTotalCal += meal_item.calories;
													return (
														<li key={meal_item.calories} className="calorie-item">
															{meal_item.serving_qty} {meal_item.serving_unit}{" "}
															{meal_item.food_name} {meal_item.calories} calories
															<IconButton
																aria-label="delete"
																onClick={(e) => {
																	e.preventDefault();
																	deleteMeal(meal.id);
																}}
															>
																<DeleteIcon />
															</IconButton>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				) : null}
			</div>
			<div style={{ marginTop: "1rem" }}>
				<p className="section-label">Today's calories burned</p>
				{exerciseLoading ? (
					<>Loading...</>
				) : exercises ? (
					<div>
						{exercises.map((exercise) => {
							const today = new Date().toDateString();
							const exerciseDay = new Date(exercise.datetime).toDateString();
							if (exerciseDay === today) {
								return (
									<div key={exercise.id}>
										<div style={{ display: "flex" }}>
											<ul className="calorie-list">
												{exercise.exercise_items.map((exercise_item) => {
													exerciseTotalCal += exercise_item.calories;
													return (
														<li key={exercise_item.calories}>
															{exercise_item.name} {exercise_item.duration_min} minutes{" "}
															{exercise_item.calories} calories burned
															<IconButton
																aria-label="delete"
																onClick={(e) => {
																	e.preventDefault();
																	deleteExercise(exercise.id);
																}}
															>
																<DeleteIcon />
															</IconButton>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				) : null}
			</div>
			<div>
				<p>Calories gained from food: {foodTotalCal.toFixed(2)} kcal</p>
				<p>Calories burned from exercise: {exerciseTotalCal.toFixed(2)} kcal</p>
			</div>
		</div>
	);
}

export default Logs;
