'use client';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";
import { createAppointment } from "@/app/GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import FormSelectedButton from "./FormSelectButton";
import FormHead from "./FormHead";
import toast from "react-hot-toast";
import { AppDispatch } from "@/app/GlobalRedux/store";
import AOS from "aos";

interface FormData {
  patientName: string;
  patientPhone: string;
  age: string;
  gender: string;
  description: string;
  date: string | null;
  time: string;
  bloodPressure: string;
  diabetes: string;
  weight: string;
  slotId: string | null;
}

const DocForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId: string | null = searchParams.get("doctorId");
  const slotId = searchParams.get("slotId");
  const todayDate = searchParams.get("todayDate");

  const time = new Date();

  const isoTimeString = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [formData, setFormData] = useState<FormData>({
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


  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDiabetesSelectOpen, setIsDiabetesSelectOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      // Global settings:
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.patientName || /[^a-zA-Z\s]/.test(formData.patientName))
      newErrors.patientName = "Patient name should be valid";
    if (!/^[6-9]\d{9}$/.test(formData.patientPhone))
      newErrors.patientPhone =
        "Phone number must be 10 digits and start with 6-9";
    if (+formData.age < 0 || +formData.age > 100)
      newErrors.age = "Age must be between 0 and 100";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (+formData.weight <= 0 || +formData.weight > 300)
      newErrors.weight = "Weight must be between 0 and 300 kg";

    // Updated blood pressure validation
    if (formData.bloodPressure) {
      const [systolic, diastolic] = formData.bloodPressure.split('/').map(Number);
      if (isNaN(systolic) || isNaN(diastolic)) {
        newErrors.bloodPressure = "BP must be in format 120/80";
      } else {
        if (systolic < 70 || systolic > 250) {
          newErrors.bloodPressure = "Systolic BP should be between 70 and 250";
        }
        if (diastolic < 40 || diastolic > 150) {
          newErrors.bloodPressure = "Diastolic BP should be between 40 and 150";
        }
        if (systolic <= diastolic) {
          newErrors.bloodPressure = "Systolic BP should be higher than diastolic BP";
        }
      }
    }

    if (formData.description && formData.description.length > 500)
      newErrors.description = "Description should not exceed 500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d/]/g, "");
    if (value.length > 3 && !value.includes('/')) {
      value = value.slice(0, 3) + "/" + value.slice(3);
    }
    setFormData((prev) => ({ ...prev, bloodPressure: value }));
  };

  const handleDiabetesSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, diabetes: value }));
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (doctorId) {
      if (validateForm()) {
        try {
          const response = await dispatch(
            createAppointment([doctorId, formData])
          );
          if (response?.payload?.success) {
            const appointmentId = response?.payload?.appointment?._id;
            console.log(appointmentId);
            if (appointmentId) {
              router.push(`/doctorpayment/${doctorId}?appointmentId=${appointmentId}`);
            }
          }
        } catch (error) {
          toast.error("Failed to create appointment");
        }
      }
    } else {
      toast.error("Doctor ID is not available");
    }
  };

  return (
    <div className="flex justify-center items-center h-full my-[2rem] xs:w-[99%] xs:mx-auto mt-[6rem]" data-aos="fade-up">
      <div className="w-full max-w-[63rem] h-[85%] bg-white py-[0.8rem] xs:px-[2rem] px-[4rem] border-[0.1rem] border-gray-700 mx-auto">
        <FormHead />

        <form className="font-bold flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="p-2 border-[0.1rem] shadow-md w-[90%] border-black py-2 px-2"
            />
            {errors.patientName && (
              <div className="text-red-500">{errors.patientName}</div>
            )}
          </div>

          <div className="flex flex-wrap gap-[9rem] xs:gap-[2rem] sm:gap-[1rem] md:gap-[2rem] lg:gap-[6rem] xl:gap-[6rem] 2xl:gap-[7rem]">
            <div className="flex flex-col gap-2 w-full sm:w-[20rem] lg:w-[22rem]">
              <label htmlFor="patientPhone">Contact No</label>
              <input
                type="tel"
                name="patientPhone"
                id="patientPhone"
                value={formData.patientPhone}
                onChange={handleChange}
                className="p-2 border-[0.1rem] shadow-md border-black py-2 px-2 xs:w-[90%]"
              />
              {errors.patientPhone && (
                <div className="text-red-500">{errors.patientPhone}</div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full xs:w-[6rem] sm:w-[6rem] lg:w-[6rem]">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleChange}
                className="p-2 border-[0.1rem] shadow-md border-black py-2 px-2"
              />
              {errors.age && <div className="text-red-500">{errors.age}</div>}
            </div>
            <div className="flex flex-col gap-2 xs:w-[70%] relative">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                className="p-2 border-[0.1rem] shadow-md border-black py-2 px-2 xs:w-[6rem] sm:w-[6rem] lg:w-[6rem]"
              />
              {errors.weight && (
                <div className="text-red-500 absolute xs:relative sm:relative bottom-0 w-[12rem]">{errors.weight}</div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center xs:flex-col xs:items-start sm:flex-col sm:items-start md:flex-row">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="gender">Gender</label>
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
            <div className="flex flex-col relative right-[3rem] xs:right-0 sm:right-0 md:right-[7rem]">
              <label htmlFor="bloodPressure">BP (Optional)</label>
              <input
                type="text"
                name="bloodPressure"
                id="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleBPInput}
                maxLength={7}
                className="p-2 border-[0.1rem] shadow-md border-black py-2 px-2 sm:w-[6rem] lg:w-[6rem]"
              />
              {errors.bloodPressure && (
                <div className="text-red-500">{errors.bloodPressure}</div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-4 items-start w-full lg:w-[calc(50%-1rem)]">
              <h1>Diabetes (Optional)</h1>
              <div className="flex flex-col items-start">
                <div
                  className="select relative"
                  onClick={() => setIsDiabetesSelectOpen(!isDiabetesSelectOpen)}
                >
                  <FormSelectedButton
                    first="Yes"
                    second="No"
                    onSelect={handleDiabetesSelect}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3 relative">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="border-[0.1rem] shadow-md border-black py-3 px-2 placeholder:font-light"
              placeholder="Mention your disease and symptoms (optional)...."
            />
            {errors.description && (
              <div className="text-red-500 absolute xs:relative xs:bottom-0 -bottom-8">{errors.description}</div>
            )}
          </div>

          <div className="flex items-center justify-center mt-2">
            <button
              type="submit"
              className="text-[1.2rem] text-white font-bold py-[0.5rem] px-[4rem] bg-[#0A8E8A] font-sans tracking-tighter"
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