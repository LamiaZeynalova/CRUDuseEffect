import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState({
        id: '',
        companyName: '',
        contactName: '',
        contactTitle: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('https://northwind.vercel.app/api/suppliers');
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentData.id) {
            await updateSupplier(currentData);
        } else {
            await addSupplier({
                companyName: currentData.companyName,
                contactName: currentData.contactName,
                contactTitle: currentData.contactTitle
            });
        }
        setCurrentData({ id: '', companyName: '', contactName: '', contactTitle: '' });
    };

    const handleChange = (e) => {
        setCurrentData({ ...currentData, [e.target.name]: e.target.value });
    };

    const addSupplier = async (newSupplier) => {
        try {
            await axios.post('https://northwind.vercel.app/api/suppliers', newSupplier);
            fetchData();
        } catch (error) {
            console.error("Failed to add supplier:", error);
        }
    };

    const deleteSupplier = async (id) => {
        try {
            await axios.delete(`https://northwind.vercel.app/api/suppliers/${id}`);
            fetchData();
        } catch (error) {
            console.error("Failed to delete supplier:", error);
        }
    };

    const updateSupplier = async (updatedSupplier) => {
        try {
            await axios.put(`https://northwind.vercel.app/api/suppliers/${updatedSupplier.id}`, updatedSupplier);
            fetchData();
        } catch (error) {
            console.error("Failed to update supplier:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    name="companyName"
                    value={currentData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                />
                <input
                    type="text"
                    name="contactName"
                    value={currentData.contactName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                />
                <input
                    type="text"
                    name="contactTitle"
                    value={currentData.contactTitle}
                    onChange={handleChange}
                    placeholder="Contact Title"
                />
                <button type='submit'>Submit</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Contact Name</th>
                        <th>Contact Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.companyName}</td>
                            <td>{item.contactName}</td>
                            <td>{item.contactTitle}</td>
                            <td>
                                <button onClick={() => setCurrentData(item)}>Edit</button>
                                <button onClick={() => deleteSupplier(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
