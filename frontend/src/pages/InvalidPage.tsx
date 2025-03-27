import { Link } from "react-router-dom";


export const InvalidPage = () => {

    return (
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <div className="text-3xl">{"This page does not exist :("}</div>
            <div className="text-lg text-center">Go to <Link className="underline" to={'/signin'}>login</Link></div>
        </div>
    )
}