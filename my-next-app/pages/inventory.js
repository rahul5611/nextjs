import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './components/Loading';

const InventoryManagement = () => {

    const [inventoryList, setinventoryList] = useState([]);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '' });
    const [showProgress, setShowProgress] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const addItem = () => {
        setShowProgress(true);
        if(!newItem.product_name) {
            alert("Please add product");
            return false;
        }
        if(!newItem.quantity) {
            alert("Please add quantity");
            return false;
        }
        if (newItem.product_name && newItem.quantity) {
            setItems([...items, { ...newItem, id: Date.now() }]);
            setNewItem({ product_name: '', quantity: '' });
            axios.post("/api/inventory", { method: "add", product_name: newItem.product_name, quantity: newItem.quantity }).then(response => {
                setShowProgress(false);
                getItemList();
            }).catch(err => {
                console.log("Error while fetching data. ", err);
                setShowProgress(false);
            })
        }
        
    };

    const removeItem = (id) => {        
        setShowProgress(true);
        setItems(items.filter(item => item.id !== id));
        axios.post("/api/inventory", {method: "delete", id: id }).then(response => {
            setShowProgress(false);
            getItemList();
        }).catch(err => {
            console.log("Error while fetching data. ", err);
            setShowProgress(false);
        })
    };

    const updateItem = (id, updatedData) => {
        debugger;
        setItems(
            items.map(item =>
                item._id === id ? { ...item, ...updatedData } : item
            )
        );        
    };

    const handleBlur = (name, id, val) => {
        let params;
        if(name === "product_name" ) {
            params = {product_name: val};
        } else {
            params = {quantity: val};
        }
        setShowProgress(true);
        axios.post("/api/inventory", {method: "update", id, params }).then(response => {
            setShowProgress(false);
            getItemList();
        }).catch(err => {
            console.log("Error while fetching data. ", err);
            setShowProgress(false);
        })
    }

    const getItemList = () => {
        setShowProgress(true);
        axios.get("/api/inventory?getList=true").then(response => {
            setItems(response.data);
            setShowProgress(false);
          }).catch(err => {
            console.log("Error while fetching data. ", err);
            setShowProgress(false);
          })
    }

    useEffect(() => {
        getItemList();
    }, [])

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Inventory Management</h2>

            <div style={{ marginBottom: '16px' }}>
                <input
                    type="text"
                    name="product_name"
                    placeholder="Item Name"
                    value={newItem.product_name}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px', padding: '8px' }}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px', padding: '8px' }}
                />
                <button onClick={addItem} style={{ padding: '8px 16px' }}>
                    Add Item
                </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, height: "calc(100vh - 320px)", overflowY: "auto"  }}>
                {items.map(item => (
                    <li key={item._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                        <input
                            type="text"
                            value={item.product_name}
                            onChange={(e) => updateItem(item._id, { product_name: e.target.value })}
                            style={{ marginRight: '8px', padding: '6px' }}
                            onBlur={() => handleBlur("product_name", item._id, item.product_name)}
                        />
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item._id, { quantity: e.target.value })}
                            style={{ marginRight: '8px', padding: '6px' }}
                            onBlur={() => handleBlur("quantity", item._id, item.quantity)}
                        />
                        <button onClick={() => removeItem(item._id)} style={{ padding: '6px 12px' }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            
            {showProgress ? <Loading overlay={showProgress}/> : ""}
        </div>
    );
};

export default InventoryManagement;
