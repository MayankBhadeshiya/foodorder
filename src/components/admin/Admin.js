import React,{useState} from 'react';
import ShowOrder from './ShowOrder';
import AddMeal from './AddMeal';
import classes from './Admin.module.css';

export default function Admin(props) {
 const [addMeal,setAddMeal]=useState(false)
    const handleClick = () => {
        setAddMeal(!addMeal)
    }

    const logoutHandler = () => {
        props.setIsLoggedIn(false);
    }

    let btn = !addMeal ? 'Add Meal' : 'Orders'
    return (
        <>
            <header className={classes.header}>
                <h2>Admin Panel</h2>
                <div style={{display:"flex"}}>
                    <button onClick={handleClick}>{btn}</button>
                    <button style={{ backgroundColor: '#8a2b06', border: "none" }} onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
                </div>
            </header>
            <main className={classes.main} style={{minWidth: '670px'}}>
                {addMeal && <AddMeal />}
                {!addMeal && <><h1>Orders</h1>
                    <ShowOrder /></> }
            </main>
        </>
    );
}
