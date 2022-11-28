import React,{useState,useEffect,useRef} from 'react';
import axios from "axios";
import Transaction from './Transaction';

export default function Table() {
    const ref = useRef()
    const [type,setType] = useState("");

    const debit = ()=>{
        setType("Debit")
    }
    const credit = ()=>{
        setType("Credit")
    }

    const amount = []
    const [data,setdata] = useState(amount);
    const [transaction,setTransaction] = useState({
        amount: "",
        desc: ""
    })

    let runningAmount= 0
    const saveData = ()=>{
        let amount = transaction.amount
        let desc= transaction.desc
        if(data.length===0){
            runningAmount = parseInt(transaction.amount)
        }
        else if(type==="Credit"){
            runningAmount = parseInt(data[data.length-1].runningAmount)+parseInt(transaction.amount)
            
        }else{
            runningAmount = parseInt(data[data.length-1].runningAmount)-parseInt(transaction.amount)

        }
        console.log(runningAmount)
        
        axios.post("http://localhost:8000/postData",{desc,amount,type,runningAmount}).then((response)=>{
            setdata(data.concat(response.data))
        }).catch((err)=>{
            console.log(err)
        })
        ref.current.click()
    }
    

    useEffect(()=>{
        axios.get("http://localhost:8000/getData").then((response)=>{
            setdata(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    const handleData = (e)=>{
        setTransaction({...transaction,[e.target.name]: e.target.value})
    }
    return (
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <p >New Transaction</p>
                                <form action="">
                                    <div className='d-flex' >
                                        <p className='mt-4' >Transaction Type</p>
                                        <div className="d-grid gap-2 mx-4"  >
                                            <button type="button" style={{ width: "18rem" }} onClick={credit} className="btn btn-outline-secondary">Credit</button>

                                            <button type="button" style={{ width: "18rem" }} onClick={debit} className="btn btn-outline-secondary">Debit</button>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Amount</label>
                                        <input type="text" name="amount" className="form-control" onChange={handleData} id="exampleFormControlInput1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                        <input className="form-control" onChange={handleData}  name="desc" id="exampleFormControlTextarea1" rows="3"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={saveData} >Save</button>
                            <button type="button" className="btn btn-secondary" ref={ref} data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-4' >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Transaction App</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col" className="trans-button"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+ Made Transaction</button></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-dark">
                            <td>Date</td>
                            <td>Description</td>
                            <td>Credit</td>
                            <td>Debit</td>
                            <td>Running Balance</td>
                        </tr>
                        {data.map((e)=>{
                            return <Transaction key={e._id} Transaction={e}/>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
