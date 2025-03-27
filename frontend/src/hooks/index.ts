import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useLocation } from "react-router-dom";

export type authorType = {
    name: string
}

export type blogType = {
    id: string,
    title: string,
    content: string,
    author: authorType
}

export const useGetBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Array<blogType>>([{
        id: "",
        title: "",
        content: "",
        author: {
            name: ""
        }
    }]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setBlogs(res.data.posts);
            setLoading(false);
            console.log(blogs);
        })
    }, [])

    return { loading, blogs };
}

export const useGetBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<blogType>({
        id: "",
        title: "",
        content: "",
        author: {
            name: ""
        }
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                console.log(res.data);
                setLoading(false);
                setBlog(res.data.post);
            }
            catch (e) {
                alert("Could not find blog")
                console.log(e);
            }
        }
        fetchBlog();
    }, [id])

    return { loading, blog };
}


export const useScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}