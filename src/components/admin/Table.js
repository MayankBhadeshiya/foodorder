import React from 'react'
import classes from './ShowOrder.module.css'

function TD(props) {
    const data = props.data
    return (
        <div className={classes.item}>
            <div> Item: {data.iname} </div>
            <div> Contity: {data.contity},
                Price for that: ₹ {data.price * data.contity} </div>
        </div>
    )
}

function TR(props) {
    const data = props.data
    const items = data.items
    const col = items.map(i => {
        return (<TD data={i} key={i.iname} />)
    })

    const bill = []
    for (const item in items) {
        bill.push(items[item].price * items[item].contity)
    }
    let TottalBill = 0;
    for (const element of bill) {
        TottalBill += element;
    }
    return (
        <tr>
            <td>{data.id}</td>
            <td>
                <p>Name: {data.uname}</p>
                <p>Street: {data.street}</p>
                <p>City: {data.city}</p>
                <p>Pincode: {data.pinCode}</p>
            </td>
            <td>
                {col}
            </td>
            <td>Total Bill: <strong>₹ {TottalBill}</strong></td>
        </tr>
    )
}

export default function Table(props) {
    const row = props.data.map(d => { return (<TR data={d} key={d.id}></TR>) })
    return (
        <div className=''>
            <p className='text-4xl font-bold text-black text-center mb-2'>Orders</p>
            <table>
                <thead>
                    <tr>
                        <th>orderID</th>
                        <th>User Information</th>
                        <th>orderitems</th>
                        <th>Total Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        </div>
    )
}
