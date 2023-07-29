

function Input(props) {

    function handleChange(e) {
        props.onChange(props.name, e.target.value)
    }
    return <>
        <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
            <label className="text-base mb-1">{props.label}</label>
            <input className=" bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" placeholder={props.placeholder} type="text" required onChange={handleChange} value={props.value} />
        </div>
    </>
}

export default Input