import React from "react";
import Task from "./task";
import { useContext, useEffect} from "react";
import { DataContext } from "../controller/dataContext";
const List = () => {
    const { data, deleteAllData } = useContext(DataContext);
    useEffect(() => {
        // Effect to run when `data` changes
        console.log('Data changed:', data);
    }, [data]);
    const handleDeleteAll = async () => {
        await deleteAllData(); // Call the function to delete all tasks
    };
    return (
        <div className=" bg-white my-10 w-96 h-96 rounded-md  absolute shadow-inner mt-20 top-60 ">
            <div className="flex text-zinc-600 py-1 pl-3 h-8 mb-3">
                <p className="">{data.length} take left</p>
                <button className="ml-auto pr-3 hover:text-blue-400" onClick={handleDeleteAll}>Clear all the task</button>
            </div>
            <div className="overflow-auto h-80">
                {data.map(item => (
                    <Task key={data.id} data={item} />
                ))}
            </div>
        </div>
    );
}
export default List;