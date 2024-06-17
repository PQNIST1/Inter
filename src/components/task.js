import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "../controller/dataContext";
let Task = ({ data }) => {
    const [isChecked, setIsChecked] = useState(data.doing);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(data.title);
    const inputRef = useRef(null);
    const { deleteData, updateData } = useContext(DataContext);
    const handleCheckboxChange = async () => {
        setIsChecked(!isChecked);
        const updatedTask = { ...data, doing: !isChecked };
        await updateData(data.id, updatedTask);
    };
    const handleUpdate = async () => {
        const updatedTask = { ...data, title: updatedTitle };
        await updateData(data.id, updatedTask);
        setIsEditing(false);
    };
    const handleDelete = async () => {
        await deleteData(data.id);
    };
    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
            setUpdatedTitle(data.title);
        }
        setUpdatedTitle(data.title);
        setIsChecked(data.doing);
    }, [isEditing, data]);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };
    const handleFix = () => {
        setIsEditing(false);
    }
    return (
        <div className="flex border-b border-gray-200 mx-3 py-1 my-3">
            <input type="checkbox" class="form-checkbox text-blue-600 w-4 h-4 mt-1" checked={isChecked} onClick={handleCheckboxChange}></input>
            {isEditing ? (
                <input onKeyPress={handleKeyPress} ref={inputRef} className="font-bold mx-2 text-zinc-500 outline-transparent focus:outline-none" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)}></input>
            ) : (
                <p className="font-bold mx-2 text-zinc-500">{data.title}</p>
            )}
            <div className="ml-auto">
                {isEditing ? (
                    <button className="mx-2"><FontAwesomeIcon icon={faCheck} size="sm" onClick={handleFix} /></button>
                ) : (
                    <button className="mx-2"><FontAwesomeIcon icon={faPen} color="black" size="sm" onClick={() => setIsEditing(true)} /></button>
                )}
                <button className=""><FontAwesomeIcon icon={faTrash} color="black" size="sm" onClick={handleDelete} /></button>
            </div>
        </div>
    );
}
export default Task;