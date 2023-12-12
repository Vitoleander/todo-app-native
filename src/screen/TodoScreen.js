import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import React, { useState } from 'react'
import Fallback from '../components/Fallback'
import Finished from '../components/Finished'

const TodoScreen = () => {
    //init local state
    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState([])
    const [checkedList, setCheckedList] = useState([])
    const [editTodo, setEditTodo] = useState(null)

    //handle add task
    const handleAddTask = () => {
        if (todo === '') {
            return
        }

        setTodoList([...todoList, { id: Date.now().toString(), title: todo }])
        setTodo('')
    }

    //handle edit task
    const handleEditTask = (todo) => {
        setEditTodo(todo)
        setTodo(todo.title)
    }

    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {

            if (item.id === editTodo.id){
                return {...item, title: todo}
            }
            
            return item
        })
        setTodoList(updatedTodos)
        setEditTodo(null)
    }

    //handle finished task
    const handleFinishedTask = (id) => {
      const finishedTodo = todoList.map((item) => {
        if (item.id === todo.id){
          return {...item, title: todo}
        }
        return item
      })
      const finDelete = todoList.filter((todo) => todo.id !== id)
      setCheckedList(finishedTodo)
      setTodoList('') //Raderar alla istället för den aktuella tasken

    }

    //handle delete task
    const handleDeleteTask = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id)

        setTodoList(updatedTodoList)
    }

    // handle delete checked task
    const handleDeleteCheck = (id) => {
      const deleteTodo = checkedList.filter((todo) => todo.id !== id )

      setCheckedList(deleteTodo)
    }

    //render finished list
    const renderChecked = ({item, index}) => {
      return (
          <View style={{
              backgroundColor: '#678c92',
              borderRadius: 6,
              paddingHorizontal: 16,
              paddingVertical: 18,
              marginBottom: 14,
              flexDirection: 'row',
              alignItems: 'center'
          }}>
              <Text style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  flex: 1
                  }}>
                  {item.title}
              </Text>

              <IconButton 
                  icon='trash-can'
                  iconColor='#fff'
                  onPress={()=> handleDeleteCheck(todo.id)}
                  />
          </View>
      )
    }

    //render list
    const renderTodos = ({item, index}) => {
        return (
            <View style={{
                backgroundColor: '#678c92',
                borderRadius: 6,
                paddingHorizontal: 16,
                paddingVertical: 18,
                marginBottom: 14,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: '600',
                    flex: 1
                    }}>
                    {item.title}
                </Text>

                <IconButton 
                    icon='pencil' 
                    iconColor='#fff'
                    onPress={() => handleEditTask(item)}
                />

                <IconButton icon='check'
                  iconColor='#fff'
                  onPress={() => handleFinishedTask(item)}/>

                <IconButton 
                    icon='trash-can'
                    iconColor='#fff'
                    onPress={()=> handleDeleteTask(item.id)}
                    />
            </View>
        )
    }

  return (
    <View 
    style={{
        marginHorizontal: 16, 
        marginVertical: 50
        }}>

      <TextInput 
        style={{
            borderWidth: 2, 
            borderColor: "#4d6227", 
            borderRadius: 6, 
            paddingVertical: 18,
            paddingHorizontal: 16
        }}
        placeholder='Add a task...'
        value={todo}
        onChangeText={(newTask) => setTodo(newTask)}
      />

    {
        editTodo ? <TouchableOpacity 
        style={{
          backgroundColor: '#4d6227',
          borderRadius: 6,
          paddingVertical: 18,
          marginTop: 16,
          marginBottom: 40,
          alignItems: 'center'
        }}
        onPress={() => handleUpdateTodo()}
        >
  
          <Text
          style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20,
          }}>Save</Text>
        </TouchableOpacity> : <TouchableOpacity 
      style={{
        backgroundColor: '#4d6227',
        borderRadius: 6,
        paddingVertical: 18,
        marginTop: 16,
        marginBottom: 40,
        alignItems: 'center'
      }}
      onPress={() => handleAddTask()}
      >

        <Text
        style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
        }}>Add</Text>
      </TouchableOpacity>
    }

      {/* Render Todo list*/}

      <FlatList data={todoList} renderItem={renderTodos}/>

      {
        checkedList.length >=1 && <Finished />
      }

      <FlatList data={checkedList} renderItem={renderChecked}/>

      {
        todoList.length <=0 && <Fallback />
      }
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})