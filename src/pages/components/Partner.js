import React, { useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";
import Alert from "./Alert.js";

const Partner = ({ partner, setPartners }) => {

    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();

    const setStatus = async (serviceId, value) => {
        const confirm = window.confirm(`Are you sure you want to change service status to ${value}?`);

        if (confirm) {
            const response = await request(`/admin/partner-status`, "PUT", {
                "serviceId": serviceId,
                "value": value
            }, {
                authorization: `Bearer ${auth.token}`
            });
    
            if (response.status) {
                setPartners([]);
            }
        }
    }

    if (partner) return (
        <div>
            {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
            
            <h1 style={{ margin: "10px" }}>{partner ? partner.name : ""}</h1>

            <h2 style={{ color: "#2174ea" }}>Service info</h2>

            <div className="partner">
                <div className="description">Name: </div>
                <div className="info">{partner.name}</div>
            </div>
            
            <div className="partner">
                <div className="description">Description: </div>
                <div className="info">{partner.description}</div>
            </div>
            
            <div className="partner">
                <div className="description">Website: </div>
                <div className="info">{partner.website}</div>
            </div>

            <div className="partner">
                <div className="description">Logo: </div>
                <div className="info">{partner.logo}</div>
            </div>
            
            <div className="partner">
                <div className="description">Price: </div>
                <div className="info">{partner.price}</div>
            </div>
            
            <div className="partner">
                <div className="description">Tier: </div>
                <div className="info">{partner.tier}</div>
            </div>

            <h2 style={{ color: "#2174ea" }}>Company info</h2>
            
            <div className="partner">
                <div className="description">Company Legal Name: </div>
                <div className="info">{partner.companyName}</div>
            </div>
            
            <div className="partner">
                <div className="description">Business Registration Number: </div>
                <div className="info">{partner.companyNumber}</div>
            </div>
            
            <div className="partner">
                <div className="description">Tax Number: </div>
                <div className="info">{partner.companyTax}</div>
            </div>
            
            <div className="partner">
                <div className="description">Country: </div>
                <div className="info">{partner.companyCountry}</div>
            </div>
            
            <div className="partner">
                <div className="description">City: </div>
                <div className="info">{partner.companyCity}</div>
            </div>
            
            <div className="partner">
                <div className="description">Zip Code: </div>
                <div className="info">{partner.companyZipCode}</div>
            </div>
            
            <div className="partner">
                <div className="description">Address Line 1: </div>
                <div className="info">{partner.companyAddress1}</div>
            </div>
            
            <div className="partner">
                <div className="description">Address Line 2: </div>
                <div className="info">{partner.companyAddress2}</div>
            </div>
            
            <div className="partner">
                <div className="description">Phone Number: </div>
                <div className="info">{partner.companyPhone}</div>
            </div>

            <h2 style={{ color: "#2174ea" }}>Bank info</h2>
            
            <div className="partner">
                <div className="description">Bank Number: </div>
                <div className="info">{partner.bankNumber}</div>
            </div>
            
            <div className="partner">
                <div className="description">Bank Name: </div>
                <div className="info">{partner.bankName}</div>
            </div>
            
            <div className="partner">
                <div className="description">Bank Swift: </div>
                <div className="info">{partner.bankSwift}</div>
            </div>

            <h2 style={{ color: "#2174ea" }}>Status</h2>
            
            <div className="partner">
                <div className="description">Status: </div>
                <div className="info">{partner.status}</div>
            </div>
            
            <div className="partner">
                <div className="description">Status Last Update: </div>
                <div className="info">{`${new Date(partner.status_update).toDateString()} ${new Date(partner.status_update).toTimeString()}`}</div>
            </div>
            
            <button onClick={() => setStatus(partner._id, "approved")}>Approve</button>
            <button onClick={() => setStatus(partner._id, "rejected")}>Reject</button>
            <button onClick={() => setStatus(partner._id, "banned")}>Ban</button>
        </div>
    );
    else return "";
};

export default Partner;