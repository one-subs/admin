import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";
import DatabaseGraph from "./components/DatabaseGraph.js";

const Databases = () => {

    const [database, setDatabase] = useState({})

    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();

    useEffect(() => {
        const getCount = async () => { 
            try {
                const response = await request(`/admin/database-count`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });

                if (response) {
                    setDatabase(response);
                }
            } catch (err) {}
        }

        getCount();
    }, [auth.token, request]);


    return (
        <div className="window">
            {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
            <div className="page_width">
                <div className="right_panel">
                    <div className="green">Download old Finances</div>
                    <div className="green">Download old History</div>
                    <div className="yellow">Delete old Utils</div>
                    <div className="red">Delete old Finances</div>
                    <div className="red">Delete old History</div>
                </div>
                <div className="screen">
                    <h1 style={{ fontSize: '35px', marginTop: '100px' }}>Database</h1>

                    <div className="graph">
                        <DatabaseGraph dataObject={database} />
                    </div>

                    <div className="horizontal" style={{ marginTop: '20px' }}>
                        <div className="card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{database.user}</h1>
                            <h2>Users</h2>
                        </div>
                        <div className="card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{database.partner}</h1>
                            <h2>Partners</h2>
                        </div>
                        <div className="card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{database.subscription}</h1>
                            <h2>Subscriptions</h2>
                        </div>
                        <div className="card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{
                                database.january_his +
                                database.february_his +
                                database.march_his +
                                database.april_his +
                                database.may_his +
                                database.june_his +
                                database.july_his +
                                database.august_his +
                                database.september_his +
                                database.october_his +
                                database.november_his +
                                database.december_his
                            }</h1>
                            <h2>Accesses</h2>
                        </div>
                        <div className="card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{0}</h1>
                            <h2>Old history</h2>
                        </div>
                        <div className="last_card" style={{ border: 'none' }}>
                            <h1 style={{ color: '#334155' }}>{0}</h1>
                            <h2>Old finances</h2>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Databases;