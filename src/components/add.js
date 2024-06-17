import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useContext} from "react";
import { DataContext } from "../controller/dataContext";


const Add = () => {
    const { addData } = useContext(DataContext);
    
    const [formData, setFormData] = useState("");
    const inputRef = useRef(null);
    const handleButtonClick = () => {
        inputRef.current.focus();
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
           handleFormSubmit(); // Call the update function if Enter key is pressed
        }
    };
    const handleFormSubmit = async (event) => {
        if (formData === "") {
            alert('DO NOT EMPTY')
        } else {
            const newTask = { title: formData };
            await addData(newTask); // Add new data and update the list
            setFormData(''); 
        }
      
    };

    return (
        <div className="flex bg-white mt-6 mb-20 w-96 h-12 rounded-md items-center">
            <FontAwesomeIcon icon={faPlus} className="rounded-full border-2 border-black w-4 h-4 ml-3" onClick={handleButtonClick} />
            <input onKeyPress={handleKeyPress} type="text" className="mx-3 w-72 outline-transparent focus:outline-none" placeholder="Add your new task" ref={inputRef} value={formData} onChange={(e) => setFormData(e.target.value)}></input>
            <button className="hover:text-blue-400" onClick={handleFormSubmit}>Add</button>
        </div>
    );
}
export default Add;