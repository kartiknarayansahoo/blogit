import { MouseEventHandler } from "react";

type blogCardParams = {
    authorName: string,
    date: string,
    title: string,
    content: string,
    onClick: MouseEventHandler
};

export const BlogCard = ({ authorName, date, title, content, onClick }: blogCardParams) => {
    return (
        <div className="flex flex-col justify-center content-center p-8">
            {/* heading */}
            <div className="flex items-center">
                <div className="bg-linear-to-br from-violet-500 to-pink-400 px-4 py-2 rounded-full text-white">{authorName[0].toUpperCase()}</div>
                <div className="text-gray-800 ps-2">{authorName}</div>
                <div className="text-gray-500 ps-2">{date}</div>
            </div>
            {/* title */}
            <div className="text-3xl pt-2">
                <button onClick={onClick} className="hover:cursor-pointer hover:underline text-left">{title}</button>
            </div>
            {/* body */}
            <div className="text-xl pt-2 line-clamp-2">{content.length > 100 ? content.slice(0, 100) + '...' : content}</div>
            <div className="pt-4 border-b text-gray-200"></div>
        </div>
    )
}

export const SkeletonBlogCard = () => {
    return (
        <div className="">
            <div role="status" className="flex flex-col justify-center content-center p-8 animate-pulse">
                {/* heading */}
                <div className="flex items-center min-w-xs sm:min-w-sm lg:min-w-lg xl:min-w-xl">
                    <div className="h-5 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full w-1/5 mb-4 mr-2 z-"></div>
                    <div className="h-5 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full  w-1/10 mb-4"></div>
                    <div className="h-4 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full  mb-2.5"></div>
                </div>
                {/* title */}
                <div className="text-3xl pt-2">
                    <div className="h-3 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full w-2/5 mb-2.5"></div>

                </div>
                {/* body */}
                <div className="h-3 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full max-w-[full] mb-2"></div>
                <div className="h-3 bg-linear-to-br from-violet-300 bg-pink-200 rounded-full max-w-[full]"></div>
            </div>
        </div>

    )
}

