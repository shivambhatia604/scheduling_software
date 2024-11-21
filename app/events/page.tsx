"use client";
import { useState } from "react";
import Calendar from "@/ui/atoms/calendar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import MeetingsCard from "../components/MeetingsCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Events() {
  const [date, setDate] = useState(new Date());
  const handleDateSelect = (date: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => {
    setDate(date.date);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-start md:gap-x-16">
      <MeetingsCard className="grow" isEditable />
      <div className="grow">
        <Calendar selectedDate={date} handleDateSelect={handleDateSelect} />
      </div>
    </div>
  );
}
