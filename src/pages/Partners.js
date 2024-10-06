import React, { useEffect, useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";
import Partner from './components/Partner.js';

const Finance = () => {

    const [id, setId] = useState(-1);

    const [partners, setPartners] = useState([]);

    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();

    useEffect(() => {
        const getPartners = async () => { 
            try {
                const response = await request(`/admin/partners`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });

                if (response.status) {
                    setPartners(response.partners);
                    setId(0);
                }
            } catch (err) {}
        }

        if (partners.length === 0) {
            getPartners();
        }
    }, [auth.token, request, setPartners, partners]);


    return (
        <div className="window">
            {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
            <div className="page_width">
                <div className="right_panel">
                    <div className="scroll">{
                        partners.map((element, index) => {
                            if (element.status === "pending") return <div key={index} className={id === index ? "active_yellow": "yellow"} onClick={() => setId(index)}>{element.name}</div>
                            if (element.status === "testing") return <div key={index} className={id === index ? "active_purple" : "purple"} onClick={() => setId(index)}>{element.name}</div>
                            if (element.status === "active") return <div key={index} className={id === index ? "active_green" : "green"} onClick={() => setId(index)}>{element.name}</div>
                            if (element.status === "banned") return <div key={index} className={id === index ? "active_red" : "red"} onClick={() => setId(index)}>{element.name}</div>
                        })
                    }</div>
                </div>

                <div className="screen">

                    <div className="horizontal" style={{ marginTop: '100px' }}>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#3498db' }}>{partners.length}</h1>
                            <h2>total</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#8e44ad' }}>{partners.reduce((acc, curr) => {
                                if (curr.status === "testing") return acc + 1
                                else return acc + 0
                            }, 0)}</h1>
                            <h2>testing</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#f1c40f' }}>{partners.reduce((acc, curr) => {
                                if (curr.status === "pending") return acc + 1
                                else return acc + 0
                            }, 0)}</h1>
                            <h2>pending</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#45b39d' }}>{partners.reduce((acc, curr) => {
                                if (curr.status === "active") return acc + 1
                                else return acc + 0
                            }, 0)}</h1>
                            <h2>active</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#e74c3c' }}>{partners.reduce((acc, curr) => {
                                if (curr.status === "banned") return acc + 1
                                else return acc + 0
                            }, 0)}</h1>
                            <h2>banned</h2>
                        </div>                    
                    </div>

                    {<Partner partner={partners[id]} setPartners={setPartners}/>}

                </div>
            </div>
        </div>
    );
};

export default Finance;