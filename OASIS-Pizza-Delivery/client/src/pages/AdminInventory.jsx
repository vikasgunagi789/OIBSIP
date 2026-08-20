import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "./AdminInventory.css";


const API_URL =
    "http://localhost:5000";


function AdminInventory() {

    const navigate =
        useNavigate();


    const [inventory, setInventory] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    const [showForm, setShowForm] =
        useState(false);


    const [form, setForm] =
        useState({

            name: "",

            category: "base",

            stock: 0,

            lowStockThreshold: 20

        });


    const [saving, setSaving] =
        useState(false);


    const token =
        localStorage.getItem(
            "adminToken"
        );


    // =====================================================
    // FETCH INVENTORY
    // =====================================================

    const fetchInventory =
        async () => {

            try {

                setLoading(true);

                setError("");


                const response =
                    await fetch(
                        `${API_URL}/api/inventory`,
                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to fetch inventory."
                    );

                }


                setInventory(
                    data.inventory || []
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        if (!token) {

            navigate(
                "/admin/login"
            );

            return;

        }


        fetchInventory();

    }, []);


    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;


            setForm(
                previous => ({

                    ...previous,

                    [name]: value

                })
            );

        };


    // =====================================================
    // ADD ITEM
    // =====================================================

    const handleAdd =
        async (e) => {

            e.preventDefault();

            setSaving(true);

            setError("");


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/inventory`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    name:
                                        form.name,

                                    category:
                                        form.category,

                                    stock:
                                        Number(
                                            form.stock
                                        ),

                                    lowStockThreshold:
                                        Number(
                                            form.lowStockThreshold
                                        )

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to add item."
                    );

                }


                setInventory(
                    previous => [
                        ...previous,
                        data.item
                    ]
                );


                setForm({

                    name: "",

                    category: "base",

                    stock: 0,

                    lowStockThreshold: 20

                });


                setShowForm(false);

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

            finally {

                setSaving(false);

            }

        };


    // =====================================================
    // UPDATE STOCK
    // =====================================================

    const updateStock =
        async (
            item,
            newStock
        ) => {

            if (
                Number(newStock) < 0
            ) {

                return;

            }


            try {

                const response =
                    await fetch(

                        `${API_URL}/api/inventory/${item._id}`,

                        {

                            method: "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    stock:
                                        Number(
                                            newStock
                                        )

                                })

                        }

                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to update stock."
                    );

                }


                setInventory(
                    previous =>
                        previous.map(
                            current =>
                                current._id ===
                                item._id

                                    ? data.item

                                    : current
                        )
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

        };


    // =====================================================
    // DELETE ITEM
    // =====================================================

    const deleteItem =
        async (id) => {

            const confirmed =
                window.confirm(
                    "Delete this inventory item?"
                );


            if (!confirmed) {

                return;

            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/inventory/${id}`,
                        {

                            method: "DELETE",

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to delete item."
                    );

                }


                setInventory(
                    previous =>
                        previous.filter(
                            item =>
                                item._id !== id
                        )
                );

            }

            catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            }

        };


    // =====================================================
    // CATEGORY HELPERS
    // =====================================================

    const getCategoryName =
        (category) => {

            const categories = {

                base: "Pizza Bases",

                sauce: "Sauces",

                cheese: "Cheese",

                vegetable: "Vegetables"

            };


            return (
                categories[category] ||
                category
            );

        };


    const getCategoryIcon =
        (category) => {

            const icons = {

                base:
                    "fa-solid fa-pizza-slice",

                sauce:
                    "fa-solid fa-bottle-droplet",

                cheese:
                    "fa-solid fa-cheese",

                vegetable:
                    "fa-solid fa-carrot"

            };


            return (
                icons[category] ||
                "fa-solid fa-box"
            );

        };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="inventory-loading">

                <i className="fa-solid fa-spinner fa-spin"></i>

                <p>
                    Loading VG PIZZA inventory...
                </p>

            </div>

        );

    }


    return (

        <div className="inventory-page">


            {/* HEADER */}

            <header className="inventory-header">


                <div
                    className="inventory-brand"
                    onClick={() =>
                        navigate(
                            "/admin/dashboard"
                        )
                    }
                >

                    <div className="inventory-logo">
                        VG
                    </div>


                    <div>

                        <span>
                            VG
                        </span>

                        <strong>
                            PIZZA
                        </strong>

                    </div>

                </div>


                <button
                    className="inventory-back"
                    onClick={() =>
                        navigate(
                            "/admin/dashboard"
                        )
                    }
                >

                    <i className="fa-solid fa-arrow-left"></i>

                    Dashboard

                </button>

            </header>



            {/* CONTENT */}

            <main className="inventory-content">


                <div className="inventory-title-row">

                    <div>

                        <p className="inventory-eyebrow">
                            VG PIZZA • ADMIN
                        </p>

                        <h1>
                            Inventory
                        </h1>

                        <p>
                            Manage ingredients and monitor stock levels.
                        </p>

                    </div>


                    <button
                        className="add-inventory-button"
                        onClick={() =>
                            setShowForm(
                                !showForm
                            )
                        }
                    >

                        <i className="fa-solid fa-plus"></i>

                        Add Item

                    </button>

                </div>



                {/* ERROR */}

                {error && (

                    <div className="inventory-error">

                        <i className="fa-solid fa-circle-exclamation"></i>

                        {error}

                    </div>

                )}



                {/* ADD FORM */}

                {showForm && (

                    <form
                        className="inventory-form"
                        onSubmit={handleAdd}
                    >

                        <h2>
                            Add Inventory Item
                        </h2>


                        <div className="inventory-form-grid">


                            <div>

                                <label>
                                    Item Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Mozzarella Cheese"
                                    required
                                />

                            </div>


                            <div>

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={
                                        form.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="base">
                                        Pizza Base
                                    </option>

                                    <option value="sauce">
                                        Sauce
                                    </option>

                                    <option value="cheese">
                                        Cheese
                                    </option>

                                    <option value="vegetable">
                                        Vegetable
                                    </option>

                                </select>

                            </div>


                            <div>

                                <label>
                                    Initial Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    min="0"
                                    value={
                                        form.stock
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div>

                                <label>
                                    Low Stock Alert
                                </label>

                                <input
                                    type="number"
                                    name="lowStockThreshold"
                                    min="0"
                                    value={
                                        form.lowStockThreshold
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <div className="inventory-form-buttons">

                            <button
                                type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                            >

                                {saving
                                    ? "Adding..."
                                    : "Add Item"}

                            </button>

                        </div>

                    </form>

                )}



                {/* INVENTORY */}

                {inventory.length === 0 ? (

                    <div className="empty-inventory">

                        <i className="fa-solid fa-box-open"></i>

                        <h2>
                            No Inventory Items
                        </h2>

                        <p>
                            Add your first VG PIZZA ingredient.
                        </p>

                    </div>

                ) : (

                    <div className="inventory-grid">

                        {inventory.map(
                            item => {

                                const isLowStock =
                                    item.stock <=
                                    item.lowStockThreshold;


                                return (

                                    <div
                                        className={
                                            `inventory-card ${
                                                isLowStock
                                                    ? "low-stock"
                                                    : ""
                                            }`
                                        }
                                        key={
                                            item._id
                                        }
                                    >


                                        <div className="inventory-card-top">

                                            <div className="inventory-item-icon">

                                                <i
                                                    className={
                                                        getCategoryIcon(
                                                            item.category
                                                        )
                                                    }
                                                ></i>

                                            </div>


                                            {isLowStock && (

                                                <span className="low-stock-badge">

                                                    <i className="fa-solid fa-triangle-exclamation"></i>

                                                    Low Stock

                                                </span>

                                            )}

                                        </div>


                                        <p className="inventory-category">

                                            {getCategoryName(
                                                item.category
                                            )}

                                        </p>


                                        <h2>
                                            {item.name}
                                        </h2>


                                        <div className="stock-section">

                                            <span>
                                                Current Stock
                                            </span>

                                            <strong>
                                                {item.stock}
                                            </strong>

                                        </div>


                                        <div className="stock-controls">

                                            <button
                                                onClick={() =>
                                                    updateStock(
                                                        item,
                                                        item.stock - 1
                                                    )
                                                }
                                                disabled={
                                                    item.stock === 0
                                                }
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>


                                            <span>
                                                {item.stock}
                                            </span>


                                            <button
                                                onClick={() =>
                                                    updateStock(
                                                        item,
                                                        item.stock + 1
                                                    )
                                                }
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>

                                        </div>


                                        <div className="inventory-card-bottom">

                                            <span>
                                                Alert below {item.lowStockThreshold}
                                            </span>


                                            <button
                                                className="delete-item"
                                                onClick={() =>
                                                    deleteItem(
                                                        item._id
                                                    )
                                                }
                                            >

                                                <i className="fa-solid fa-trash"></i>

                                            </button>

                                        </div>


                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </main>

        </div>

    );

}


export default AdminInventory;
