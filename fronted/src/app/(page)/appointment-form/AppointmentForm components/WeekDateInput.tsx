"use client";

import { useEffect, useState } from "react";
import React from "react";

interface WeekDateInput {
  value: any;
  onChange: any;
}

const WeekDateInput: React.FC<WeekDateInput> = ({ value, onChange }) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();

    // Calculate the start and end dates of the current week
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    // Format the dates as yyyy-mm-dd
    const formatDate = (date: Date) => {
      const d = new Date(date);
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    };

    setMinDate(formatDate(startOfWeek));
    setMaxDate(formatDate(endOfWeek));
  }, []);

  return (
    <>
      <label htmlFor="date">Date.*</label>
      <input
        type="date"
        name="date"
        id="date"
        min={minDate}
        max={maxDate}
        className="p-[0.2rem] border-[0.1rem] [box-shadow:0rem_0.1rem_.1rem_0rem_gray] border-black py-3 px-2 w-[12rem]"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default WeekDateInput;
