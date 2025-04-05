export const Quote = () => {
    return (
        <div className="transition duration-500 bg-linear-to-br from-violet-600 to-pink-400 hover:bg-linear-to-br hover:from-violet-600 hover:to-green-400 h-screen p-20 flex flex-col justify-center content-center">
            <div className="text-2xl text-left text-white font-semibold">
                "One of the better blogging sites I have across in a long time."
            </div>
            <div className="text-left text-white font-medium pt-4">
                Julies Verdes
            </div>
            <div className="text-left text-sm text-gray-200 font-light">
                CEO, Acme Inc.
            </div>
        </div>
    )
}