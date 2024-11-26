"use client";
import { useState, useEffect } from "react";
import Calendar from "@/ui/atoms/calendar";
import MeetingsCard from "../components/MeetingsCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { convertDateToStartUTCDateTime } from "@/lib/helpers";
import Loader from "../components/loader";
import { useNotification } from "@/ui/context/NotificationContext";

export default function Events() {
  const [date, setDate] = useState(new Date());
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["meetingsByDate"],
    queryFn: async () => {
      const data = await fetch(
        `/api/getmeetings?date=${convertDateToStartUTCDateTime(date)}`
      );
      return await data.json();
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["meetingsByDate"] });
  }, [date]);
  const handleDateSelect = (selectedDate: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => {
    setDate(selectedDate.date);
  };

  if (isError) {
    showNotification("Error Occured", error.message, "error");
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-y-12 md:grid-cols-2 md:grid-rows-1 md:gap-x-12">
      <MeetingsCard isEditable meetings={data.data} />

      <Calendar selectedDate={date} handleDateSelect={handleDateSelect} />
    </div>
  );
}
