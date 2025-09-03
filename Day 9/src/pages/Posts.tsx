import { Link, Outlet } from "react-router-dom"

const posts = [
    {id: 1, title: "Post Pertama"},
    {id: 2, title: "Post Kedua"},
    {id: 3, title: "Post Ketiga"},
]

export default function Posts() {
    return (
        <div className="flex flex-col item-center justify-center h-screen">
            <h1 className="text-3xl mb-5 font-bold">Posts Page</h1>
            <ul className="mb-4">
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={post.id.toString()} className="text-blue-500 underline">{post.title}</Link>
                    </li>
                ))}
            </ul>
            <Outlet/>
        </div>
    )
}