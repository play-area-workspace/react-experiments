import {useEffect, useRef, useState} from 'react'

const baseUrl: string = import.meta.env.VITE_BASE_URL;

interface Post {
    id: number;
    title: string;
}

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()
    const [page, setPage] = useState(0)

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}/posts?page=${page}`, {
                    signal: abortControllerRef.current?.signal,
                });
                const posts = await response.json() as Post[];
                setPosts(posts);
            } catch (e) {
                if (e.name==="AbortError"){
                    console.log("Aborted!");
                    return;
                }
                setError(e);
            } finally {
                setIsLoading(false);
            }

        };
        fetchPosts();
    }, [page]);


    if (error) {
        console.log(error);
        return <div>Something went wrong please try again!</div>
    }

    return (
        <div className='tutorial'>
            <h1>Data Fetching in React</h1>
            <button onClick={() => setPage(page + 1)}>Increment page {page}</button>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <ul>
                    {
                        posts.map((post) => {
                            return <li key={post.id}>{post.title}</li>
                        })
                    }
                </ul>
            }

        </div>
    );
}

export default PostList
