"use client";

import {useState} from 'react'
import {useQuery} from "@tanstack/react-query";
import axios from "axios";


const baseUrl: string = import.meta.env.VITE_BASE_URL;

interface Post {
    id: number;
    title: string;
}


function PostList() {
    const [page, setPage] = useState(0)

    const {
        data: posts,
        isError,
        isPending,
        error
    } = useQuery({
        queryKey: ["posts", {page}],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/posts?page=${page}`);
            return (await response.data) as Post[];
        },
    });

    if (isError) {
        return (<span>Error occurred: ${error}</span>);
    }

    return (
        <div className='tutorial'>
            <h1>Data Fetching in React</h1>
            <button onClick={() => setPage(page + 1)}>Increment page {page}</button>
            <button onClick={() => setPage(page - 1)}>Decrement page {page}</button>
            {isPending && <div>Loading...</div>}
            {!isPending &&
                <ul>
                    {
                        posts?.map((post) => {
                            return <li key={post.id}>{post.title}</li>
                        })
                    }
                </ul>
            }

        </div>
    );
}

export default PostList;
