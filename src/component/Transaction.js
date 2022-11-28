import React from 'react';

export default function Transaction(props) {
    return (
        <tr>
            <td>{new Date(props.Transaction.createAt).toDateString()}</td>

            <td>{props.Transaction.desc}</td>
            {props.Transaction.type==="Credit"?<td>{props.Transaction.amount}</td>:<td>---</td>}
            {props.Transaction.type==="Debit"?<td>{props.Transaction.amount}</td>:<td>---</td>}
            <td>{props.Transaction.runningAmount}</td>

        </tr>
    )
}
