import { IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from './DeleteDialog';

function TodoTable()
{
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [DeleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return(
        <React.Fragment>
            <form onSubmit={ (event) => {context.createTodo(event, {name: addTodo})} }>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={ (event) => {setAddTodo(event.target.value)} } label="New Task" fullWidth={true}/>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo ' + index}>
                                <TableCell>

                                {editIsShown === todo.id ? 
                                    <TextField 
                                        InputProps={{
                                            endAdornment: <React.Fragment>
                                                <IconButton onClick={() => {
                                                    setEditIsShown(false)
                                                    }}><CloseIcon/></IconButton>
                                                <IconButton onClick={() => {
                                                    context.updateTodo({id: todo.id, name: editTodo});
                                                    setEditIsShown(false);
                                                }}><DoneIcon/></IconButton>
                                            </React.Fragment>
                                            
                                        }}
                                        value={editTodo} 
                                        onChange={(event) => {
                                            setEditTodo(event.target.value)
                                        }}
                                    />
                                :
                                todo.name
                                }

                                </TableCell>
                                <TableCell align="right">

                                    <IconButton onClick={() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true); 
                                        setTodoToBeDeleted(todo)
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            {DeleteConfirmationIsShown && (
                <DeleteDialog 
                    todo={todoToBeDeleted} 
                    open={DeleteConfirmationIsShown} 
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}



        </React.Fragment>
    )
}

export default TodoTable;