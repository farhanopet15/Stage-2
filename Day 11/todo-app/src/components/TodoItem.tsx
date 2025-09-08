import { useState } from "react";
import { useTodo } from "../hooks/useTodo"
import type { Todo } from "../types/Todo"

export const TodoItem = ({todo}: {todo: Todo}) => {
    const { updateTodo, deleteTodo, toggleComplete, loading} =
    useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    
    const handleUpdate = () => {
        updateTodo(todo.id, text);
        setIsEditing(false)
    }

    return (
        <div className="flex justify-center gap-5 items-center mt-10">
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {isEditing ? (
                <>
                <input value={text} onChange={(e) => setText(e.target.value)} className="border"
                disabled={loading}/>
                <button onClick={handleUpdate} disabled={loading}>Update</button>
                </>
            ) : (
                <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>{ todo.text }</span>
                <button onClick={() => setIsEditing(true)} disabled={loading}>Edit</button>
                </>
            )}
                <button onClick={() => deleteTodo(todo.id)} disabled={loading}>Delete</button>
        </div>
    )
}