import React, { useState } from "react";
import Dropdown from "@/SharedComponent/Dropdown/Dropdown";
import { useAuth } from './Context/AuthContext';
import { useRouter } from 'next/router';
import Loading from './components/Loading';
import axios from "axios";
import "./css/roles.css";

let availableRoles = ["Admin", "User", "Editor", "Guest", "Report", "Quiz"]

const Roles = props => {
    const router = useRouter();    
    const {user, setLoginData} = useAuth();
    const [ddUserList, setddUserList] = useState([]);
    const [showLoading, setShowLoading ] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [assignedRoles, setAssignedRoles] = useState();

    const AssignRoles = () => {
        if(selectedUser && selectedUser.value){
            if (assignedRoles && Object.keys(assignedRoles).length > 0) {
                let params = {
                    id: selectedUser.value,
                    name: "update",
                    Roles: Object.keys(assignedRoles)
    
                };
                setShowLoading(true);
                axios.post("/api/role", params ).then(response => {
                    setShowLoading(false);
                    getItemList();
                }).catch(err => {
                    console.log("Error while updating data. ", err);
                    setShowLoading(false);
                })
            }
        } else {
            alert("Please select an user.");
        }
    }

    const handleSelect = val => {
        let temp = {};
        setSelectedUser(val);
        val.role.map(ele => {
            temp[ele] = true;
        });
        setAssignedRoles(temp);
    }

    const getAllUsers = () => {
        setShowLoading(true);
        fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({ name: "getUser" })
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        }).then(response => {
            if (response.success) {
                const { result } = response;
                let tempUsers = []
                if (result && result.length > 0) {
                    result.forEach(element => {
                        tempUsers.push({value: element._id, label:`${element.firstName} ${element.lastName}`, role: element.Roles}) 
                    });
                    setddUserList(tempUsers);
                    setShowLoading(false);

                } else {
                    setddUserList([]);  
                    setShowLoading(false);
                    resetAll();
                }
            } else {
                setddUserList([]);
                setShowLoading(false);
                resetAll();
            }
        }).catch(err => {
            console.log("Error =>  ", err);
            setShowLoading(false);
            setddUserList([]);
        })

    }

    const handleCheckboxClick = e => {
        let tempRole = {...assignedRoles}
        if(e.target.checked) {
            tempRole[e.target.name] = e.target.checked;
        } else {
            delete tempRole[e.target.name];
        }
        setAssignedRoles(tempRole);

    }

    React.useEffect(() => {
        if (user && user.user && user.user.isAuthenticated) {
            getAllUsers();
        } else {
            let loginInfo = JSON.parse(localStorage.getItem("user"));
            if (loginInfo && loginInfo.isAuthenticated) {
                setLoginData(setLoginData);
                getAllUsers();
            } else {
                router.push('/login');
            }
        }
    }, []);

    return <div className="roles-div" style={{ marginLeft: "20px" }}>
        <h1>Roles Assignment</h1>
        <div style={{ marginTop: "60px", marginLeft: "100px" }}>
            <h2>Available/Assign Roles</h2>
            <div style={{ margin: "8px", border: '2px solid #ccc2c2', borderRadius: "5px",  width: "600px" }}>
                <div style={{ margin: "8px", width: "500px", justifyContent: "center", display: "flex" }}>
                    <span style={{ margin: "8px", fontWeight: "bolder" }}>User</span>
                    <Dropdown placeholder={selectedUser && selectedUser.label ? selectedUser.label : "Users Roles"}
                        options={ddUserList} onSelect={handleSelect}
                    />
                </div>

                <hr />

                <div className="role-container" style={{ overflowY: "auto", height: 'calc(100vh - 450px)', width: "100%" }}>
                    {availableRoles.map((ele, index) => {
                        return <><div style={{ border: "1px solid gray", borderRadius: "5px", padding: "16px 8px", margin: "8px", marginTop: "30px", width: "42%", float: "left" }}>
                            <input style={{ height: "20px", width: "16px" }} checked={assignedRoles && assignedRoles[ele] ? true : false}
                                onClick={handleCheckboxClick} type="checkbox" name={ele} value={ele} />
                            <span style={{ fontWeight: "bolder", marginLeft: "16px" }}>{ele}</span>
                        </div>
                            {index !== 0 && index % 2 === 0 ?
                                <br /> : ""
                            }
                        </>

                    })}
                </div>
            </div>
        </div>
        <button style={{ padding: "12px", marginLeft: "100px" }} onClick={AssignRoles}>Assign Roles</button>
        {showLoading ? <Loading overlay={showLoading} /> : ""}
    </div>
}

export default Roles;