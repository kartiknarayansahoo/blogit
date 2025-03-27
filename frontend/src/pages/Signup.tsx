import { Quote } from "../components/Quotes"
import { SignupAuth } from "../components/Auth"

export const Signup = () => {
    return (
        <>
            <div className="grid lg:grid-cols-2">
                <SignupAuth></SignupAuth>
                <div className="hidden lg:block">
                    <Quote></Quote>
                </div>
            </div>
        </>
    )
}