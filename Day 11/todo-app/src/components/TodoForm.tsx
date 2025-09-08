import React, { useState } from "react"
import { useTodo } from "../hooks/useTodo";

export default function TodoForm() {
    const [text, setText] = useState('');
    const { createTodo, loading } = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return;
        createTodo(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border" placeholder="Add new task ..."/>
            <button type="submit" disabled={loading} className="ml-4">Submit</button>
        </form>
    )
}