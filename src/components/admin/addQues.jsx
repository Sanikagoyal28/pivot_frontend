
function AddQues() {
    return <>
        <section className="flex flex-col justify-center items-center w-full py-12">
            <div className="border-red-600 border-2 inline px-[4px] py-1 text-center mb-12">
                <p className="border-blue-600 p-2 text-3xl border-2 bg-gradient-to-r from-red-700 to-blue-600 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>ADD QUESTION</p>
            </div>
            <form className="flx flex-col justify-center items-center bg-gray-900 py-4 px-12 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto">
                <h2 className="font-semibold text-2xl text-center my-4">Add a Question by selecting a category, its Difficulty level and their options</h2>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Category</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700">
                        <option value="">--select--</option>
                        <option value="">General Knowledge</option>
                        <option value="">Science</option>
                        <option value="">Sports</option>
                        <option value="">Music</option>
                    </select>
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Difficulty</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700">
                        <option value="">--select--</option>
                        <option value="">Easy</option>
                        <option value="">Medium</option>
                        <option value="">Hard</option>
                    </select>
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Question</label>
                    <input type="text" placeholder="Enter Question" className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" />
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Correct Answer</label>
                    <input type="text" placeholder="Enter Correct Answer" className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" />
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Option 1</label>
                    <input type="text" placeholder="Enter Ques" className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" />
                </div>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Option 2</label>
                    <input type="text" placeholder="Enter Option 2" className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" />
                </div>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Option 3</label>
                    <input type="text" placeholder="Enter Question" className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" />
                </div>
            </form>
        </section >

    </>
}

export default AddQues