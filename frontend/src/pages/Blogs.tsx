import { BlogCard, SkeletonBlogCard } from "../components/BlogCard"
import { useNavigate } from "react-router-dom"
import { blogType, useGetBlogs } from "../hooks"
import { Navbar } from "../components/Navbar"



export const Blogs = () => {
    const navigate = useNavigate();
    const { loading, blogs } = useGetBlogs();

    if (loading) {
        return (
            <div>
                {/* navbar */}
                <Navbar authorName="kartik" title="Create blog" onClick={() => navigate("/createblog")}></Navbar>

                {/* blog cards */}
                {/* {JSON.stringify(blogs)}; */}
                <div className="grid justify-center p-6">
                    <SkeletonBlogCard></SkeletonBlogCard>
                    <SkeletonBlogCard></SkeletonBlogCard>
                    <SkeletonBlogCard></SkeletonBlogCard>
                    <SkeletonBlogCard></SkeletonBlogCard>
                    <SkeletonBlogCard></SkeletonBlogCard>
                    <SkeletonBlogCard></SkeletonBlogCard>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                {/* navbar */}
                <Navbar authorName="kartik" title="Create blog" onClick={() => navigate("/createblog")}></Navbar>

                {/* blog cards */}
                {/* {JSON.stringify(blogs)}; */}
                <div className="grid justify-center p-6">
                    {blogs.map((x: blogType) => {
                        return <BlogCard onClick={() => { navigate(`/blog/${x.id}`) }} authorName={x.author.name} date="Feb 2, 2025" title={x.title} content={x.content}></BlogCard>
                    })}
                    <BlogCard onClick={() => { }} authorName="kartik" date="Feb 2, 2025" title="this is the title" content="this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay this is some other content okay"></BlogCard>
                </div>
            </div>
        </>
    )
}

