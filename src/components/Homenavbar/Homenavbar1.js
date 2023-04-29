import React, { useState, useEffect } from "react";
import HeaderCartButton from "../Layout/HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Homenavbar.module.css";
import Navbarsubcategory from "./Navbarsubcategory";

export default function Homenavbar(props) {
    const logoutHandler = () => {
        props.log();
        localStorage.setItem("isLoggedIn", 0);
    };

    const [data, setData] = useState(null);
    const [categoriesdata, setCategoriesdata] = useState([]);
    const [subcategoriesdata, setSubcategoriesdata] = useState([]);

    useEffect(() => {
        setCategoriesdata([]);
        setSubcategoriesdata([]);
        for (let obj in data) {
            setCategoriesdata((prev) => [...prev, obj]);
            setSubcategoriesdata((z) => [...z, data[obj]]);
        }
    }, [data]);

    useEffect(() => {
        setData(null);
        fetch(
            "https://foodorder-749de-default-rtdb.firebaseio.com/Categories.json",
            { method: "GET" }
        )
            .then((response) => response.json())
            .then((y) => setData(y));
    }, []);

    const setdropdownHandler = (e) => {
        let box = document.getElementById("down-" + e.target.value)
        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
        }
        else {
            box.classList.add("hidden");

        }
    }


    // console.log(subcategoriesdata)
    return (
        <div>
            <header className={classes.header}>
                <div className="flex">
                    <h2 className="font-bold text-3xl mt-5 mr-10">ReactMeals</h2>
                    <div className="relative group hidden 2xl:flex">
                        {categoriesdata.map((obj, i) => {
                            return (
                                <>
                                    {console.log(subcategoriesdata)}
                                    <div className="p-5" id={`drop-${i}`}>
                                        <div className="group inline-block relative">
                                            <button
                                                className="font-semibold py-2 px-4 rounded inline-flex items-center"
                                                onClick={setdropdownHandler} value={i} style={{ backgroundColor: '#8a2b06'}}>
                                                {obj}
                                                
                                            </button>
                                            <ul className="absolute hidden text-gray-700"  value={i} id={`down-${i}`}>
                                                {/* <li className="">
                                                    <a
                                                        className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                                        href="#">One</a>
                                                </li> */}
                                                <Navbarsubcategory data={subcategoriesdata[i]}></Navbarsubcategory>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            );
                        })}

                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <HeaderCartButton onClick={props.onShowCart} />
                    <button className={classes.bt} onClick={logoutHandler}>
                        <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
                    </button>
                </div>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </div>
    );
}
