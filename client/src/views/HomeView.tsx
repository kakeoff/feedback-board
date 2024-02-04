import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../redux/slices/posts"
import { AppDispatch, RootState } from "../redux/store"

export function HomeView () {
    const dispatch = useDispatch<AppDispatch>()
    const {posts, tags} = useSelector((state: RootState) => state.posts)
    const isPostsLoading = posts.status === 'loading'
    React.useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    console.log(posts)
    return (
        <>
        <div>homeView</div>
        <div>{isPostsLoading ? (<span>loading</span>) : posts.items.map((post) => (<div key={post.id}><pre>{post.title}</pre></div>)) }</div>
        </>
    )
}