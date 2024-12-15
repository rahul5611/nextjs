import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from '../SharedComponent/Dropdown/Dropdown';
import Autocomplete from '../SharedComponent/AutoComplete';
import './CSS/user.css';
import Loading from './components/Loading';
import UserForm from './form';
const UserPage = () => {
  const [userList, setUserList] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [originalUserList, setOrigitalUserList] = useState([]);
  const [searchData, setSearchData] = useState();
  const [showListPage, setShowListPage] = useState(true);
  const [showFormPage, setShowFormPage] = useState(false);
  const [pageSize, setPageSize] = useState({ value: 10, label: 10 })
  const [options, setOptions] = useState([
    { value: "All", label: "All" }, { value: 10, label: 10 }, { value: 50, label: 50 }, { value: 100, label: 100 },
    { value: 200, label: 200 }, { value: 400, label: 400 }, { value: 500, label: 500 },
    { value: 1000, label: 1000 }, { value: 2000, label: 2000 },
  ])

  useEffect(() => {
    setShowProgress(true);
    axios.get("/api/user?pagesize=" + pageSize.label).then(response => {
      setUserList(response.data);
      setOrigitalUserList(response.data);
      setShowProgress(false);
    }).catch(err => {
      console.log("Error while fetching data. ", err);
      setShowProgress(false);
    })

  }, [pageSize.label]);

  const handleSelect = (val) => {
    setPageSize(val);
  }

  const handleOptionSelect = (option) => {
    setUserList(option);
  }

  return (
    <div style={{marginTop: "8px"}}>
      <div >
        {showListPage ? <><div style={{
          display: "flex",
          justifyContent: "flex-end",
          fontWeight: "bolder",
          paddingBottom: "8px"
        }}>
          <Autocomplete options={originalUserList} label={"Search"} onOptionSelect={handleOptionSelect} />&nbsp;
          <button onClick={() => {
            if (originalUserList && originalUserList.length > 0) {
              setUserList(originalUserList);
            } else {
              alert("No Data");
            }
            setSearchData("");

          }}
            style={{ height: "30px" }}>
            Reset
          </button>
          &nbsp;&nbsp;
          Page Size: &nbsp;&nbsp;&nbsp;<span style={{ marginRight: "50px" }}>
            <Dropdown placeholder="10" options={options} onSelect={handleSelect} /></span>
        </div>
          <div style={{ borderBottom: "1px solid gray" }}>

            <div className='data-container' style={{ color: "#FFF", display: "flex", paddingTop: "8px", minHeight: "30px", backgroundColor: "#45645a" }} key={"user-detail-header"}>
              <div style={{ fontWeight: "bold", paddingLeft: "8px", width: "18%", textAlign: "left" }}>
                First Name
              </div>
              <div style={{ fontWeight: "bold", paddingLeft: "8px", width: "18%", textAlign: "left" }}>
                Last Name
              </div>
              <div style={{ fontWeight: "bold", paddingLeft: "8px", width: "18%", textAlign: "left" }}>
                Email
              </div>
              <div style={{ fontWeight: "bold", paddingLeft: "8px", width: "23%", textAlign: "left" }}>
                Company
              </div>
              <div style={{ fontWeight: "bold", paddingLeft: "8px", width: "23%", textAlign: "left" }}>
                Country
              </div>
            </div>
            <div style={{ overflowY: "auto", height: " calc(100vh - 284px)" }}>
              <div className="dataContainer" style={{ border: "1px solid gray" }}>
                {userList && userList.length > 0 ? userList.map((ele, index) => {
                  return (<>
                    <div className={(index + 1) % 2 === 0 ? "even-dataContainer" : "odd-dataContainer"} style={{ display: "flex", paddingTop: "8px", minHeight: "40px" }} key={"user-detail-" + index}>
                      <div className="ellipes" title={ele.first} key={"user-" + ele.first}>{ele.first}</div>
                      <div className="ellipes" title={ele.last} key={"user-" + ele.last}>{ele.last}</div>
                      <div className="ellipes" title={ele.email} key={"user-email-" + ele.first}>{ele.email}</div>
                      <div className="ellipes" style={{ width: "23%" }} key={"user-" + ele.company} title={ele.company}>{ele.company}</div>
                      <div className="ellipes" style={{ width: "23%" }} key={"user-" + ele.country} title={ele.country}>{ele.country}</div>
                    </div>
                  </>)
                }) : ""}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", fontWeight: "bolder", paddingTop: "20px" }}>
            <button style={{ width: "auto", marginRight: "8px" }} onClick={() => {
              setShowListPage(false);
              setShowFormPage(true);
            }}>Show Form</button>

            <input type="text" name="name" placeholder="First Name"
              value={searchData} onChange={(e) => {
                setSearchData(e.target.value);
              }}
              style={{ marginRight: '8px', padding: '8px' }}
            />

            <button onClick={() => {
              // debugger;
              const filterData = originalUserList.filter(ele => {
                let firstName = "";
                firstName = ele.first.toString();
                if (firstName.toLowerCase().includes(searchData.toLowerCase())) {
                  return ele;
                }
              });
              setUserList(filterData)
            }} style={{ marginRight: '8px', padding: '8px 16px' }}>
              Search By First Name
            </button>

            <button onClick={() => {
              if (originalUserList && originalUserList.length > 0) {
                setUserList(originalUserList);
              } else {
                alert("No Data");
              }
              setSearchData("");

            }} style={{ marginRight: '8px', padding: '8px 16px' }}>
              Reset
            </button>
          </div>
        </> : <>
          <UserForm />
          <div style={{marginLeft: "30px"}}>
            <button onClick={() => {
              setShowListPage(true);
              setShowFormPage(false);

            }}>Show List Page</button>
          </div>
        </>}
      </div>
      {showProgress ? <Loading overlay={showProgress}/> : ""}

    </div>
  );
};

export default UserPage;
