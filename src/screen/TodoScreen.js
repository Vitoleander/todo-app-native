import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState } from "react";
import Fallback from "../components/Fallback";
import Favourites from "../components/Favourites";
import Finished from "../components/Finished";

const TodoScreen = () => {
	//init local state
	const [todo, setTodo] = useState("");

	const [todoList, setTodoList] = useState([]);
	const [checkedList, setCheckedList] = useState([]);

	const [favouritesList, setFavouritesList] = useState([]);
	const [editTodo, setEditTodo] = useState(null);

	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState("");

	const filterList = todoList.filter((task) =>
		task.title.toLowerCase().includes(search.toLowerCase())
	);

	//handle add task
	const handleAddTask = () => {
		if (todo === "") {
			return;
		}

		setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
		setTodo("");
	};

	//handle edit task
	const handleEditTask = (todo) => {
		setEditTodo(todo);
		setTodo(todo.title);
	};

	const handleEditFavTask = (todo) => {
		setEditTodo(todo);
		setTodo(todo.title);
	};

	const handleUpdateTodo = () => {
		const updatedTodos = todoList.map((item) => {
			if (item.id === editTodo.id) {
				return { ...item, title: todo };
			}

			return item;
		});
		setTodoList(updatedTodos);
		setEditTodo(null);
		setTodo("");
	};

	const handleFavouriteTask = (item) => {
		setFavouritesList([...favouritesList, item]);

		const updatedTodoList = todoList.filter((x) => x.id !== item.id);
		setTodoList(updatedTodoList);
	};

	const handleFinishedTask = (item) => {
		const updatedTodoList = todoList.filter((x) => x.id !== item.id);
		setCheckedList([...checkedList, item]);
		setTodoList(updatedTodoList);
	};

	// handleFinishedFavTask(
	const handleFinishedFavTask = (item) => {
		const deleteTodo = favouritesList.filter((x) => x.id !== item.id);
		setFavouritesList(deleteTodo);
	};

	//handle delete task
	const handleDeleteTask = (id) => {
		const updatedTodoList = todoList.filter((todo) => todo.id !== id);

		setTodoList(updatedTodoList);
	};

	// handle delete checked task
	const handleDeleteCheck = (id) => {
		const deleteTodo = checkedList.filter((x) => x.id !== id);

		setCheckedList(deleteTodo);
	};

	const handleDeleteFavTask = (id) => {
		const deleteTodo = favouritesList.filter((x) => x.id !== id);

		setFavouritesList(deleteTodo);
	};

	//render favourite list
	const renderFavourites = ({ item, index }) => {
		return (
			<View
				style={{
					backgroundColor: "#678c92",
					borderRadius: 6,
					paddingHorizontal: 16,
					paddingVertical: 18,
					marginBottom: 14,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: "600",
						flex: 1,
					}}
				>
					{item.title}
				</Text>

				<IconButton
					icon='pencil'
					iconColor='#fff'
					onPress={() => handleEditFavTask(item)}
				/>

				<IconButton
					icon='check'
					iconColor='#fff'
					onPress={() => handleFinishedFavTask(item)}
				/>

				<IconButton
					icon='trash-can'
					iconColor='#fff'
					onPress={() => handleDeleteFavTask(item.id)}
				/>
			</View>
		);
	};

	//render finished list
	const renderChecked = ({ item, index }) => {
		return (
			<View
				style={{
					backgroundColor: "#678c92",
					borderRadius: 6,
					paddingHorizontal: 16,
					paddingVertical: 18,
					marginBottom: 14,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: "600",
						flex: 1,
					}}
				>
					{item.title}
				</Text>

				<IconButton
					icon='trash-can'
					iconColor='#fff'
					onPress={() => handleDeleteCheck(item.id)}
				/>
			</View>
		);
	};

	//render list
	const renderTodos = ({ item, index }) => {
		return (
			<View
				style={{
					backgroundColor: "#678c92",
					borderRadius: 6,
					paddingHorizontal: 16,
					paddingVertical: 18,
					marginBottom: 14,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: "600",
						flex: 1,
					}}
				>
					{item.title}
				</Text>

				<IconButton
					icon='pencil'
					iconColor='#fff'
					onPress={() => handleEditTask(item)}
				/>

				<IconButton
					icon='heart'
					iconColor='#fff'
					onPress={() => handleFavouriteTask(item)}
				/>

				<IconButton
					icon='check'
					iconColor='#fff'
					onPress={() => handleFinishedTask(item)}
				/>

				<IconButton
					icon='trash-can'
					iconColor='#fff'
					onPress={() => handleDeleteTask(item.id)}
				/>
			</View>
		);
	};

	return (
		<View
			style={{
				marginHorizontal: 16,
				marginVertical: 50,
			}}
		>
			<IconButton icon='magnify' onPress={() => setShowSearch(!showSearch)} />
			{showSearch && (
				<TextInput
					style={{
						borderWidth: 2,
						borderColor: "#4d6227",
						borderRadius: 6,
						paddingVertical: 18,
						paddingHorizontal: 16,
            marginBottom: 40
					}}
					placeholder='Search for a task...'
					value={search}
					onChangeText={(text) => setSearch(text)}
				/>
			)}
      {!showSearch &&(
			<TextInput
				style={{
					borderWidth: 2,
					borderColor: "#4d6227",
					borderRadius: 6,
					paddingVertical: 18,
					paddingHorizontal: 16,
				}}
				placeholder='Add a task...'
				value={todo}
				onChangeText={(newTask) => setTodo(newTask)}
			/>
      )}

			{editTodo ? (
				<TouchableOpacity
					style={{
						backgroundColor: "#4d6227",
						borderRadius: 6,
						paddingVertical: 18,
						marginTop: 16,
						marginBottom: 40,
						alignItems: "center",
					}}
					onPress={() => handleUpdateTodo()}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						Save
					</Text>
				</TouchableOpacity>
			) : !showSearch && (
				<TouchableOpacity
					style={{
						backgroundColor: "#4d6227",
						borderRadius: 6,
						paddingVertical: 18,
						marginTop: 16,
						marginBottom: 40,
						alignItems: "center",
					}}
					onPress={() => handleAddTask()}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						Add
					</Text>
				</TouchableOpacity>
			)}

			{/* Render Todo list*/}
			{todoList.length > 0 &&
				(checkedList.length > 0 || favouritesList.length > 0) && (
					<Text
						style={{
							color: "#246f51",
							fontSize: 30,
							fontWeight: "400",
						}}
					>
						Todo List
					</Text>
				)}

			<FlatList
				data={filterList}
				renderItem={renderTodos}
				keyExtractor={(item) => item.id}
			/>

			{favouritesList.length >= 1 && <Favourites />}
			<FlatList
				data={favouritesList}
				renderItem={renderFavourites}
				keyExtractor={(item) => item.id}
			/>

			{checkedList.length >= 1 && <Finished />}
			<FlatList
				data={checkedList}
				renderItem={renderChecked}
				keyExtractor={(item) => item.id}
			/>

			{todoList.length === 0 &&
				checkedList.length === 0 &&
				favouritesList.length <= 0 && <Fallback />}
		</View>
	);
};

export default TodoScreen;

const styles = StyleSheet.create({});
