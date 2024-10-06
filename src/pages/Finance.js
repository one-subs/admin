import React, { useEffect, useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";
import SubsGraph from './components/SubsGraph.js';
import MoneyGraph from './components/MoneyGraph.js';
import Months from './components/Months.js';

const Finance = () => {

    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const [finance, setFinance] = useState([]);
    const [history, setHistory] = useState([]);

    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();

    useEffect(() => {
        const getCount = async () => { 
            try {
                const responseHistory = await request(`/admin/history?month=${month}&year=${new Date().getUTCFullYear()}`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });

                if (responseHistory) {
                    setHistory(responseHistory.history);
                }

                const responseFinances = await request(`/admin/finances?month=${month}&year=${new Date().getUTCFullYear()}`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });

                if (responseFinances) {
                    setFinance(responseFinances.finance);
                }
            } catch (err) {}
        }

        getCount();
    }, [auth.token, request, month]);

    const income = finance.reduce((acc, curr) => acc + (curr.days * curr.money), 0)
    const share = history.reduce((acc, curr) => acc + curr.price, 0)

    return (
        <div className="window">
            {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
            <div className="page_width">

                <Months month={month} setMonth={setMonth}/>

                <div className="screen">

                    <div className="horizontal" style={{ marginTop: '100px' }}>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#f1c40f' }}>${income.toFixed(1)}</h1>
                            <h2>income</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#e74c3c' }}>${share.toFixed(1)}</h1>
                            <h2>share</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#45b39d' }}>${(income - share).toFixed(1)}</h1>
                            <h2>profit</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#3498db' }}>{history.length}</h1>
                            <h2>access</h2>
                        </div>
                        <div className="bottom_last_card">
                            <h1 style={{ color: '#334155', color: '#8e44ad' }}>{finance.length}</h1>
                            <h2>subs</h2>
                        </div>                    
                    </div>

                    <div className="graph">
                        <MoneyGraph dataList={finance} month={month} history={history} />
                    </div>

                    <div className="horizontal" style={{ fontSize: '35px', marginTop: '10px' }}>
                        <div className="card">
                            <h1 style={{ color: '#334155' }}>S</h1>
                            <h2>{history.reduce((acc, cur) => (cur.tier === "S" ? acc + 1 : acc), 0)}</h2>
                        </div>
                        <div className="card">
                            <h1 style={{ color: '#334155' }}>M</h1>
                            <h2>{history.reduce((acc, cur) => (cur.tier === "M" ? acc + 1 : acc), 0)}</h2>
                        </div>
                        <div className="card">
                            <h1 style={{ color: '#334155' }}>L</h1>
                            <h2>{history.reduce((acc, cur) => (cur.tier === "L" ? acc + 1 : acc), 0)}</h2>
                        </div>
                        <div className="card">
                            <h1 style={{ color: '#334155' }}>XL</h1>
                            <h2>{history.reduce((acc, cur) => (cur.tier === "XL" ? acc + 1 : acc), 0)}</h2>
                        </div>
                        <div className="last_card">
                            <h1 style={{ color: '#334155' }}>XXL</h1>
                            <h2>{history.reduce((acc, cur) => (cur.tier === "XXL" ? acc + 1 : acc), 0)}</h2>
                        </div>
                    </div>
                
                    {/* <h1 style={{ fontSize: '35px', marginTop: '50px' }}>Subscriptions</h1>
                    <div className="graph">
                        <SubsGraph dataList={finance} month={month} />
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Finance;