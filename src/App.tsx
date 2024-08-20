import PostList from "./components/PostList.tsx";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <PostList/>
            </QueryClientProvider>
        </>
    )
}

export default App
