import React from 'react'
import Cart from './Cart'

const CartData = () => {
    return (
        <div>
        <Cart/>
        </div>
    )
}


export function generateMetadata() {
    return {
        title: "Cart - YourLab",
        description: "View the details of your medical appointments, including doctor information and appointment times.",
        keywords: "appointment details, medical appointments, healthcare appointments, doctor appointments, schedule appointments",
        robots: "index, follow",
        openGraph: {
            title: "Cart - YourLab",
            description: "View the details of your medical appointments, including doctor information and appointment times.",
            type: "website",
            siteName: "YourLab",
        },
    }
}

export default CartData
