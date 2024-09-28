import React from 'react'
import Cart from './Cart'

const CartData = () => {
    return (
        <div>
            <Cart />
        </div>
    )
}


export function generateMetadata() {
    return {
        title: "YourLab - Cart",
        description: "View your medical appointment details"
    }
}


export default CartData
