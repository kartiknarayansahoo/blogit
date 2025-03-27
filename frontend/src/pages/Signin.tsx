import { Quote } from "../components/Quotes"
import { SigninAuth } from "../components/Auth"

export const Signin = () => {
    return (
        <>
            <div className="grid lg:grid-cols-2 ">
                <SigninAuth></SigninAuth>
                <div className="hidden lg:block ">
                    <Quote></Quote>
                </div>
            </div>
        </>
    )
}