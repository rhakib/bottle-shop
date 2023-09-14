import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localstorage";
import Cart from "../cart/Cart";

const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data));
    }, [])
    // load cart from local storage

    useEffect(() => {
        console.log(bottles.length);
        if (bottles.length > 0) {
            const storedCart = getStoredCart();
            console.log(storedCart);

            const savedCart = []

            for(const id of storedCart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle) {
                    savedCart.push(bottle);
                }
            }
            console.log(savedCart);
            setCart(savedCart)
        }

    }, [bottles])
    const handleBottlePurchase = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart)
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = (id) => {
        //visually remove from cart
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)

        //remove from LS
        removeFromLS(id)

    }

    return (
        <div>
            <h2>Bottles available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottles-container">
                {
                    bottles.map(bottle => <Bottle handleBottlePurchase={handleBottlePurchase} key={bottle.id} bottle={bottle}></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;