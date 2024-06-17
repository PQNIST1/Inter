import React from "react";
import Add from "./add";
import List from "./list";
import DataProvider from "../controller/dataContext";
import Search from "./search";


const Home = () => {
    return (
       <DataProvider>
        <div className="container h-screen bg-slate-100 w-screen">
            <div className="relative bg-violet-700 container mx-auto  grid justify-center">
                <div className="static h-auto">
                    <h1 className="mx-auto text-left text-zinc-300 text-5xl pt-24 font-black">Todo-List</h1>
                    <Search/>
                    <Add />
                    <List />
                </div>
            </div>
        </div>
        </DataProvider>
    );
}
export default Home;