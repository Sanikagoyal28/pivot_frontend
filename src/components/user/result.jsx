
function Result() {
    return <>
        <section className="w-full h-screen flex flex-col py-16 px-4 md:p-24">
            <div className="border-red-400 border-2 inline px-[4px] py-1 w-fit mx-auto text-center mb-16">
                <p className="border-blue-500 p-2 text-3xl border-2 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>RESULTS</p>
            </div>

            <div className="flex flex-col justify-center items-center mx-auto max-w-[560px] w-11/12">
                <div className="flex w-full items-center justify-start my-2 gap-4 mx-auto">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Name:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">Sai Pranav</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Correct Answer Count:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">10</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Wrong Answer Count:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">10</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Total Score:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">10</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Percentage:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">10%</p>
                </div>
            </div>
            {/* </div> */}
        </section >

    </>
}

export default Result