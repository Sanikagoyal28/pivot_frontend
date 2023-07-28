

function Login() {
    return <>
        <div className="flex flex-col justify-center h-screen bg-blue-300 w-full">
            <form className="flex flex-col justify-center items-center bg-gray-900 py-4 px-12 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto">
                <h2 className="font-bold text-3xl text-center my-4">Admin SignIn</h2>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Username</label>
                    <input className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" placeholder="Enter your Username" type="text" required />
                </div>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Password</label>
                    <input className=" bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" placeholder="Enter your Password" type="text" required />
                </div>
                <button className="w-full my-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Signin</button>
            </form>
        </div>
    </>
}

export default Login