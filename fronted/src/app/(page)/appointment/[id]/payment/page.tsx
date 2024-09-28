import React from 'react';
import Image from 'next/image';

const PaymentPage:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

      <main className="w-full max-w-2xl bg-white p-8 shadow-lg mt-10">
        <div className="flex justify-center mb-10">
          <div className="border-2 border-teal-500 p-4 w-3/4 h-64 flex flex-col justify-center items-center">
            <h2 className="text-xl">You’re paying,</h2>
            <p className="mt-4 text-xl font-bold text-center">450 Rupees</p>
            <hr className="my-4 w-full" />
            <div className="flex justify-between w-full mt-4">
              <span>Tax</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between w-full mt-6">
              <span>Total</span>
              <span>450.00</span>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-10 text-center">Let's Make Payment</h3>

        <div className="flex flex-wrap justify-center mb-6 gap-4">
          {['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Cash', 'Wallet'].map((method) => (
            <button key={method} className="w-20 h-20 border-2 border-gray-300 rounded-lg hover:bg-gray-200 focus:bg-teal-200 flex items-center justify-center">
              <span className="text-center text-sm">{method}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col items-center">
          <label className="block text-gray-700">Cardholder's Name</label>
          <input type="text" className="w-1/2 border-2 border-teal-500 rounded p-2 mb-4 mx-auto" />

          <label className="block text-gray-700">Card Number</label>
          <div className="w-1/2 flex items-center border-2 border-teal-500 rounded p-2 mb-4 mx-auto">
            <Image src="/mastercard.png" alt="MasterCard Logo" width={30} height={20} />
            <input type="text" className="flex-grow outline-none ml-2" />
          </div>

          <div className="flex space-x-4 w-full justify-center">
            <div className="w-40">
              <label className="block text-gray-700">Expiry</label>
              <input type="text" className="w-full border-2 border-teal-500 rounded p-2 mb-4" />
            </div>
            <div className="w-40">
              <label className="block text-gray-700">CVC</label>
              <input type="text" className="w-full border-2 border-teal-500 rounded p-2 mb-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-10">
          <span className="mb-4">OR</span>
          <div className="flex space-x-16">
            <Image src="/google-pay.png" alt="Google Pay Logo" width={30} height={30} />
            <Image src="/phonepe.png" alt="PhonePe Logo" width={30} height={30} />
            <Image src="/paytm.png" alt="Paytm Logo" width={30} height={30} />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="w-52 bg-teal-500 text-white p-3 rounded shadow-lg hover:bg-teal-600">Pay</button>
        </div>
      </main>
    </div>
  );
}

export default PaymentPage