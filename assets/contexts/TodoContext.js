import React, { createContext } from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            todos: [
                {id: 1, name: 'do something'},
                {id: 2, name: 'hola'}
            ]
        }
    }

    //create
    createTodo(e, todo)
    {
        e.preventDefault();
        let data = [...this.state.todos]
        data.push(todo);
        this.setState({
            todos: data
        })
    }
    //read
    readTodo()
    {

    }
    //update
    updateTodo(data)
    {
        let todos = [...this.state.todos];
        let todo = todos.find(todo =>{
            return todo.id === data.id;
        });
        todo.name = data.name;

        this.setState({
            todos: todos,
        })
    }
    //delete
    deleteTodo()
    {

    }
    render()
    {
        return(
            <div>
                <TodoContext.Provider value={{
                    ...this.state,
                    createTodo: this.createTodo.bind(this),
                    updateTodo: this.updateTodo.bind(this),
                    deleteTodo: this.deleteTodo.bind(this),
                }}>
                    {this.props.children}
                </TodoContext.Provider>
            </div>
        )
    }
}

export default TodoContextProvider;