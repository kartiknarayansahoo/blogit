import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/Navbar";
import { useGetBlog, useScrollToTop } from "../hooks";

export type getPostType = {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const Blog = () => {
    useScrollToTop();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, blog } = useGetBlog(id || "")

    if (loading) {
        return (
            <div>
                <Navbar authorName="kartik" title="Create blog" onClick={() => navigate("/createblog")}></Navbar>
                <div className="grid grid-rows-4 lg:grid lg:grid-cols-4 h-screen">
                    <div className="row-span-3 lg:row-span-full lg:col-span-3 py-10 px-8 lg:px-14">
                        <div className="py-4">
                            <button onClick={() => navigate('/blogs')} className="hover:cursor-pointer hover:text-violet-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg></button>
                        </div>
                        <div className="animate-pulse">
                            <div className="h-4 bg-violet-200 rounded-full w-1/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-1/10  mb-10 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                            <div className="h-4 bg-violet-200 rounded-full w-4/5  mb-4 mr-2"></div>
                        </div>

                    </div>
                    <div className="bg-gray-100 row-span-1 lg:row-span-full lg:col-span-1 py-10 px-8 lg:px-6 animate-pulse -z-10">
                        <div className="h-4 bg-violet-200 rounded-full w-2/5 mb-4 mr-2"></div>
                        <div className="flex items-center px-4">
                            <div className="rounded-full bg-violet-300 p-6">
                                <img src="" alt="" />
                            </div>
                            <div className="ps-2 w-full">
                                <div className="h-4 bg-violet-200 rounded-full w-2/5 mb-4 mr-2"></div>
                                <div className="h-4 bg-violet-200 rounded-full w-3/5  mb-4 mr-2"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }



    return (
        <div>
            <Navbar authorName="kartik" title="Create blog" onClick={() => navigate("/createblog")}></Navbar>
            <div className="grid grid-rows-4 lg:grid lg:grid-cols-4 h-screen">
                <div className="row-span-3 lg:row-span-full lg:col-span-3 py-10 px-8 lg:px-14">
                    <div className="py-4">
                        <button onClick={() => navigate('/blogs')} className="hover:cursor-pointer hover:text-violet-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg></button>


                    </div>
                    <div className="text-4xl font-bold pb-4">{blog.title}</div>
                    <div className="text-lg text-gray-500 pb-4">Posted on Date published</div>
                    <p>{blog.content}</p>
                </div>
                <div className="bg-gray-100 row-span-1 lg:row-span-full lg:col-span-1 py-10 px-6 lg:px-8">
                    <div className="text-lg pb-4 px-4 lg:p-4 font-semibold">Author</div>
                    <div className="flex items-center px-4">
                        <div className="rounded-full bg-gray-300 p-6">
                            <img src="" alt="" />
                        </div>
                        <div className="ps-2">
                            <div className="text-xl">{blog.author.name}</div>
                            <div className="text-md">Author's tagline</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}