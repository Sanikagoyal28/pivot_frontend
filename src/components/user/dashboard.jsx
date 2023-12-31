import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { DashboardThunk, SortThunk, clearUserRedux } from "../../redux/userSlice"
import Loader from "../../utils/loader"
import { clearCategoryRedux } from "../../redux/categorySlice"

function Dashboard() {

    const reducer = useSelector((state) => state.userReducer)
    const [result, setResult] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(DashboardThunk(user.category))
    }, [])
    useEffect(() => {
        if (reducer.results != null || reducer.results != undefined || reducer.results != "")
            setResult(reducer.results)
    }, [reducer])

    function handleChange(e) {
        const difficulty = e.target.value
        const data = {
            category: user.category,
            difficulty: difficulty
        }
        dispatch(SortThunk(data))
    }

    function handleNext(){
        navigate("/")
        localStorage.clear()
        dispatch(clearUserRedux())
        dispatch(clearCategoryRedux())
    }
    return <>
        <section className="md:w-full flex flex-col items-center py-16 lg:px-24 sm:px-12 pb-32 overflow-x-hidden">
            <div className="border-red-400 border-2 inline px-[4px] py-1 text-center md:mb-[-40px]">
                <p className="border-blue-400 p-2 text-3xl border-2 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>DASHBOARD</p>
            </div>
            <div className="flex justify-end w-full md:mb-4 lg:mb-8">
                <div className="flex flex-col max-w-[160px] w-full my-4 text-gray-300">
                    <label className=" text-sm sm:text-base mb-1">Difficulty</label>
                    <select className="bg-gray-600 text-gray-200 rounded-lg w-[120px] md:w-full p-2 outline-none focus:bg-gray-700 focus:border border-gray-700" required onChange={handleChange}>
                        <option value="">--select--</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>

            <div className="mx-12 w-full">
                <table className="w-full lg:max-w-4/5 bg-gray-700 text-gray-200 table-fixed">
                    <tr>
                        <th className="text-lg border-2 border-gray-400 text-center px-1 py-3">User Name</th>
                        <th className="text-lg border-2 border-gray-400 text-center px-1 py-3">Quiz Category</th>
                        <th className="text-lg border-2 border-gray-400 text-center px-1 py-3">Quiz Difficulty</th>
                        <th className="text-lg border-2 border-gray-400 text-center px-1 py-3">Score</th>
                        <th className="text-lg border-2 border-gray-400 text-center px-1 py-3">Rank</th>
                    </tr>

                    {result.length > 0 && result.map((item, index) => {
                        return <tr className="bg-gray-500 capitalize" key={index}>
                            <td className="text-base border-2 border-gray-400 text-center py-2">{item.username}</td>
                            <td className="text-base border-2 border-gray-400 text-center py-2">{item.category.category}</td>
                            <td className="text-base border-2 border-gray-400 text-center py-2">{item.difficulty}</td>
                            <td className="text-base border-2 border-gray-400 text-center py-2">{item.score}</td>
                            <td className="text-base border-2 border-gray-400 text-center py-2">{index + 1}</td>
                        </tr>
                    })}
                </table>
            </div>
            <div className="flex justify-end w-full mb-16 mt-4">
                <button type="submit" className="w-full my-8 bg-black text-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 p-2 font-semibold max-w-[160px] md:max-w-[180px] outline-none" onClick={() => {
                    handleNext()
                }}>Play Again</button>
            </div>
        </section>
        <Loader loading={reducer.loading} />
    </>
}

export default Dashboard