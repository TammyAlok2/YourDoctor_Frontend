"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { createAppointment } from "@/app/GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import FormSelectedButton from "./AppointmentForm components/FormSelectButton";
import FormHead from "./AppointmentForm components/FormHead";
import toast from "react-hot-toast";

const DocForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const slotId = searchParams.get("slotId");
  const todayDate = searchParams.get("todayDate");

  const now = new Date();
  const isoTimeString = now.toISOString().split("T")[1].split(".")[0];

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    age: "",
    gender: "",
    description: "",
    date: todayDate,
    time: isoTimeString,
    bloodPressure: "",
    diabetes: "",
    weight: "",
    slotId: slotId,
  });

  const [errors, setErrors] = useState({});
  const [isDiabetesSelectOpen, setIsDiabetesSelectOpen] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.patientName || /[^a-zA-Z\s]/.test(formData.patientName))
      newErrors.patientName = "Patient name is should be valid";
    if (!/^[6-9]\d{9}$/.test(formData.patientPhone))
      newErrors.patientPhone =
        "Phone number must be 10 digits and start with 6-9";
    if (formData.age < 0 || formData.age > 100)
      newErrors.age = "Age must be between 0 and 100";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (formData.weight <= 0 || formData.weight > 300)
      newErrors.weight = "Weight must be between 0 and 300 kg";
    if (!/^\d{2,3}\/\d{2,3}$/.test(formData.bloodPressure))
      newErrors.bloodPressure = "BP must be in format 120/80";
    if (!formData.diabetes)
      newErrors.diabetes = "Diabetes information is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBPInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) {
      value = value.slice(0, 3) + "/" + value.slice(3);
    }
    setFormData((prev) => ({ ...prev, bloodPressure: value }));
  };

  const handleDiabetesSelect = (value) => {
    setFormData((prev) => ({ ...prev, diabetes: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await dispatch(
          createAppointment([doctorId, formData])
        );
        if (response?.payload?.success) {
          router.push(`/appointmentsubmit/${params.id}`);
        }
      } catch (error) {
        toast.error("Failed to create appointment");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
  <div className="w-full max-w-[60rem] h-[85%] bg-white p-[2rem] border-x-[0.1rem] border-gray-200 mx-auto">
    <FormHead />

    <form
      className="font-bold flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="patientName">Patient Name*</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2"
        />
        {errors.patientName && (
          <div className="text-red-500">{errors.patientName}</div>
        )}
      </div>

      <div className="flex flex-wrap gap-[8rem] xs:gap-[2rem]">
        <div className="flex flex-col gap-2 w-full sm:w-[calc(100%-7rem)] lg:w-[22rem]">
          <label htmlFor="patientPhone">Mobile No.*</label>
          <input
            type="number"
            name="patientPhone"
            id="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2"
          />
          {errors.patientPhone && (
            <div className="text-red-500">{errors.patientPhone}</div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-[6rem] lg:w-[6rem]">
          <label htmlFor="age">Age.*</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2"
          />
          {errors.age && <div className="text-red-500">{errors.age}</div>}
        </div>
        <div className="flex flex-col gap-2 w-[21%] xs:w-[70%]">
          <label htmlFor="weight">Weight.*</label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
            className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2 sm:w-[6rem] lg:w-[6rem] xs:w-[46%]"
          />
          {errors.weight && (
            <div className="text-red-500">{errors.weight}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="gender">Gender*</label>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              id="gender-male"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              className="w-[1.2rem] h-[1.2rem]"
            />
            <label htmlFor="gender-male">Male</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              id="gender-female"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              className="w-[1.2rem] h-[1.2rem]"
            />
            <label htmlFor="gender-female">Female</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              id="gender-other"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
              className="w-[1.2rem] h-[1.2rem]"
            />
            <label htmlFor="gender-other">Other</label>
          </div>
        </div>
        {errors.gender && (
          <div className="text-red-500">{errors.gender}</div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-4 items-start w-full lg:w-[calc(50%-1rem)]">
          <h1>Diabetes</h1>
          <div className="flex flex-col items-start">
            <div
              className="select relative"
              onClick={() =>
                setIsDiabetesSelectOpen(!isDiabetesSelectOpen)
              }
            >
              <FormSelectedButton
                first="Yes"
                second="No"
                onSelect={handleDiabetesSelect}
              />
            </div>
            {errors.diabetes && (
              <div
                className={`text-red-500 transition-all duration-300 ${
                  isDiabetesSelectOpen ? "mt-16" : "mt-2"
                }`}
              >
                {errors.diabetes}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-[30%]">
          <label htmlFor="bloodPressure">BP.*</label>
          <input
            type="text"
            name="bloodPressure"
            id="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleBPInput}
            maxLength={7}
            className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2 sm:w-[6rem] lg:w-[6rem]"
          />
          {errors.bloodPressure && (
            <div className="text-red-500">{errors.bloodPressure}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border-[0.1rem] shadow-md border-black py-3 px-2 placeholder:font-light"
          placeholder="Mention your disease and symptoms...."
        />
        {errors.description && (
          <div className="text-red-500">{errors.description}</div>
        )}
      </div>

      <div className="flex items-center justify-center mt-6">
        <button
          type="submit"
          className="text-[1.2rem] font-bold py-[0.8rem] px-[4rem] bg-[#0A8E8A] font-sans tracking-tighter"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default DocForm;
