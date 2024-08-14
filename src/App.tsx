import {useState} from 'react'

const baseUrl: string = import.meta.env.BASE_URL;

interface Post{
    id: number;
    name: string;
}

function App() {
    const [posts, setPosts] = useState<Post[]>([])

    return (
        <>

        </>
    )
}

export default App
