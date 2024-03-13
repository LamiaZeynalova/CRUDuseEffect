import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({ id: '', name: '', info: '', price: '' });

  

  const fetchProducts = () => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSubmit = { 
      name: currentProduct.name, 
      info: currentProduct.info, 
      price: currentProduct.price 
    };

    if (currentProduct.id) {
      axios.put(`http://localhost:3001/products/${currentProduct.id}`, productToSubmit)
        .then(() => {
          fetchProducts();
          setCurrentProduct({ id: '', name: '', info: '', price: '' });
        });
    } else {
      axios.post('http://localhost:3001/products', productToSubmit)
        .then(() => {
          fetchProducts();
          setCurrentProduct({ id: '', name: '', info: '', price: '' });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(() => {
        fetchProducts();
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder="product name"
          value={currentProduct.name}
          onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="product info"
          value={currentProduct.info}
          onChange={(e) => setCurrentProduct({ ...currentProduct, info: e.target.value })}
        />
        <input
          type="text"
          placeholder="price"
          value={currentProduct.price}
          onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
        />
        <button type="submit">Əlavə Et / Yenilə</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Info</th>
            <th>Price</th>
            <th>proses</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.info}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
