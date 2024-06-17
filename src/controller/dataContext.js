import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();
const apiUrl = 'https://65e695fbd7f0758a76e897e1.mockapi.io/api/v1/todo';

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addData = async (newData) => {
        try {
            await axios.post(apiUrl, newData);
            fetchData(); // Re-fetch the data after adding new data
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };
    const deleteData = async (id) => {
        try {
            await axios.delete(`https://65e695fbd7f0758a76e897e1.mockapi.io/api/v1/todo/${id}`);
            fetchData(); // Re-fetch the data after deleting the data
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
  
    const deleteAllData = async () => {
        try {
            setData([]);
            for (const item of data) {
                await axios.delete(`https://65e695fbd7f0758a76e897e1.mockapi.io/api/v1/todo/${item.id}`);
            }
            fetchData();   
        } catch (error) {
            console.error('Error deleting all data:', error);
        }
    };
    const updateData = async (id, updatedData) => {
        try {
            await axios.put(`https://65e695fbd7f0758a76e897e1.mockapi.io/api/v1/todo/${id}`, updatedData);
            fetchData(); // Re-fetch the data after updating the data
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

   return (
        <DataContext.Provider value={{ data, addData, deleteData, deleteAllData, updateData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
