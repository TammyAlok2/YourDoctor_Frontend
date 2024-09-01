'use client';

import Signup from './signup/page'
import { useDispatch } from "react-redux";
const SignupData = () => {
    const dispatch = useDispatch();
  return (
    <div>
      <Signup dispatch={dispatch}/>
    </div>
  )
}

export default SignupData
