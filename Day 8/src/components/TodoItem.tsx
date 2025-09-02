// import React from 'react';

// interface TodoItemProps {
//   todo: {
//     id: number;
//     text: string;
//     completed: boolean;
//   };
//   onToggle: (id: number) => void;
// }

// const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
//   return (
//     <li
//       onClick={() => onToggle(todo.id)}
//       style={{
//         textDecoration: todo.completed ? 'line-through' : 'none',
//         cursor: 'pointer',
//         listStyle: 'none',
//         padding: '10px',
//         borderBottom: '5px solid #ccc'
//       }}
//     >
//       {todo.text}
//     </li>
//   );
// };

// export default TodoItem;