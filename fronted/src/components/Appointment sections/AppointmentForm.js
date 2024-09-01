"use client";

import FormSelectedButton from "./AppointmentForm components/FormSelectButton";
import FormHead from "./AppointmentForm components/FormHead";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { createAppointment } from "@/app/GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import WeekDateInput from "./AppointmentForm components/WeekDateInput";

const DocForm = () => {
  // const formik = useFormik({
  //   initialValues: { name: "", phone: "+91", age: "", message: '' },
  //   validationSchema: ValidationSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     console.log('Form submitted:', values);
  //     setSubmitting(false)
  //   },
  // });

  // const isFormValid = Object.values(formik).every((field)=>field !== '')

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  // console.log(params.id)

  const [appointmentData, setAppointmentData] = useState({
    patientName: "",
    patientPhone: "",
    age: "",
    gender: "",
    description: "",
    date: "",
    time: "",
    bloodPressure: "",
    diabetes: "",
    weight: ""
  });

  const handleAppointment = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };

  const handleDiabetesSelect = (value) => {
    setAppointmentData((prev) => ({
      ...prev,
      diabetes: value,
    }));
  };

  const handleBPSelect = (value) => {
    setAppointmentData((prev) => ({
      ...prev,
      bloodPressure: value,
    }));
  };
  
  // console.log(appointmentData);

  const onFormSubmit = async (e) => {
    e.preventDefault();
      const response = await dispatch(createAppointment([params.id, appointmentData]))
      if (response?.payload?.success) {
        router.push(`/appointmentsubmit/${params.id}`);
      }
      // console.log(response)
  }

  return (
    <div className="">
      <div className="w-[75%] mx-auto h-[85%] bg-white p-[2rem] border-x-[0.1rem] border-gray-200 xl:w-[60rem]">
        <FormHead />

        <form className="font-bold flex flex-col gap-[1rem]" onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-[0.3rem]">
            <label htmlFor="patientName">patient Name*</label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2"
              value={appointmentData.patientName}
              onChange={handleAppointment}
            />
          </div>

          <div className="flex md:flex-col lg:flex-row sm:flex-col xs:flex-col">
            <div className="flex flex-col gap-[0.3rem]">
              <label htmlFor="patientPhone">Mobile No.*</label>
              <input
                type="tel"
                name="patientPhone"
                id="patientPhone"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black w-[22rem] py-3 px-2 xs:w-[90%]"
                value={appointmentData.patientPhone}
                onChange={handleAppointment}
              />
            </div>
            <div className="flex flex-col gap-[0.3rem] ml-[11rem] w-[4rem] md:ml-0 md:mt-3 sm:ml-0 sm:mt-3 xs:ml-0 xs:mt-3 lg:ml-[11rem] lg:relative lg:bottom-3">
              <label htmlFor="age">Age.*</label>
              <input
                type="number"
                name="age"
                id="age"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[6rem]"
                value={appointmentData.age}
                onChange={handleAppointment}
              />
            </div>

            <div className="flex flex-col gap-[0.3rem] ml-[11rem] w-[4rem] md:ml-0 md:mt-3 sm:ml-0 sm:mt-3 xs:ml-0 xs:mt-3 lg:ml-[11rem] lg:relative lg:bottom-3">
              <label htmlFor="weight">Weight.*</label>
              <input
                type="number"
                name="weight"
                id="weight"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[6rem]"
                value={appointmentData.weight}
                onChange={handleAppointment}
              />
            </div>


          </div>

          <div className="flex md:flex-col lg:flex-row sm:flex-col xs:flex-col">

            <div className="flex flex-col gap-[0.3rem] w-[4rem] md:ml-0 md:mt-3 sm:ml-0 sm:mt-3 xs:ml-0 xs:mt-3 lg:relative lg:bottom-3">
              {/* <label htmlFor="date">Date.*</label>
              <input
                type="date"
                name="date"
                id="date"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[12rem]"
                value={appointmentData.date}
                onChange={handleAppointment}
              /> */}
              <WeekDateInput value={appointmentData.date} onChange={handleAppointment}/>
            </div>

            <div className="flex flex-col gap-[0.3rem] ml-[11rem] w-[4rem] md:ml-0 md:mt-3 sm:ml-0 sm:mt-3 xs:ml-0 xs:mt-3 lg:ml-[11rem] lg:relative lg:bottom-3">
              <label htmlFor="time">Time.*</label>
              <input
                type="time"
                name="time"
                id="time"
                className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[12rem]"
                value={appointmentData.time}
                onChange={handleAppointment}
              />
            </div>

          </div>

          <div className="flex flex-col gap-[0.3rem] mb-[2rem] space-y-3">
            <label htmlFor="gender">Gender*</label>
            <div className="flex gap-[3rem] xs:flex-col">
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  className="w-[2rem]"
                  value={"male"}
                  onChange={handleAppointment}
                />
                <label htmlFor="gender">Male</label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  className="w-[2rem]"
                  value={"female"}
                  onChange={handleAppointment}
                />
                <label htmlFor="gender">Female</label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  className="w-[2rem]"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="flex mb-[2.5rem] sm:flex-col xs:flex-col sm:space-x-0 xs:space-x-0 lg:flex-row lg:space-x-[7rem]">
            <div className="flex gap-[0.5rem] space-x-[3rem] md:space-x-[2rem] xs:space-x-[1rem]">
              <h1>Diabetes</h1>
              <div className="select">
                <FormSelectedButton
                  first="Yes"
                  second="No"
                  onSelect={handleDiabetesSelect}
                />
              </div>
            </div>
            <div className="flex gap-[0.5rem] space-x-[3rem] sm:mt-[5rem] xs:mt-[5rem] xs:space-x-[1rem] mt-[-3rem] lg:mt-0">
              <h1>BP</h1>
              <div className="select">
                <FormSelectedButton
                  first="Yes"
                  second="No"
                  onSelect={handleBPSelect}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[0.3rem] mt-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 placeholder:font-light"
              placeholder="Mention your disease and symptoms...."
              value={appointmentData.description}
              onChange={handleAppointment}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-[1.2rem] font-bold py-[0.5rem] px-[3rem] bg-[aqua] font-sans tracking-tighter"
            >
                SUMMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocForm;
