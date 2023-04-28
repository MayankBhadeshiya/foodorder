import React,{useState} from 'react';
import ShowOrder from './ShowOrder';
import AddMeal from './AddMeal';
import classes from './Admin.module.css';
import img2 from '../../assets/meals.jpg'

export default function Admin(props) {
 const [addMeal,setAddMeal]=useState(false)
    const handleClick = () => {
        setAddMeal(!addMeal)
    }

    const myStyle = {
        backgroundImage:
            `url(${img2})`,
        backgroundSize: 'cover',
    };

    const logoutHandler = () => {
        props.setIsLoggedIn(false);
    }

    let btn = !addMeal ? 'Add Meal' : 'Orders'
    return (
        <div style={myStyle} className='h-screen overflow-auto'>
            <header className={classes.header}>
                <h2 className='font-bold text-3xl'>Admin Panel</h2>
                <div style={{display:"flex"}}>
                    <button onClick={handleClick}>{btn}</button>
                    <button style={{ backgroundColor: '#8a2b06', border: "none" }} onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
                </div>
            </header>
            <main className={classes.main} style={{minWidth: '670px'}}>
                {addMeal && <AddMeal />}
                {!addMeal && <ShowOrder />}
            </main>
        </div>
    );
}
