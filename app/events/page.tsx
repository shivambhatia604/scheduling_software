"use client";
import { useState, useEffect } from "react";
import Calendar from "@/ui/atoms/calendar";
import MeetingsCard from "../components/MeetingsCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { convertDateToStartUTCDateTime } from "@/lib/helpers";
import Loader from "../components/loader";
import { useNotification } from "@/ui/context/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import BookingModal from "../components/BookAndEditModal/BookingModal";

export default function Events() {
  const [date, setDate] = useState(new Date());
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editModalMeetingId, setEditModalMeetingId] = useState<number>(0);
  const [editModalEmail, setEditModalEmail] = useState("");
  const [editModalbody, setEditModalBody] = useState("");
  const [editModalDate, setEditModalDate] = useState(new Date());
  const [editModalfromTime, setEditModalFromTime] = useState("");
  const [editModaltoTime, setEditModalToTime] = useState("");
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["meetingsByDate", convertDateToStartUTCDateTime(date)],
    queryFn: async () => {
      const data = await fetch(
        `/api/getmeetings?date=${convertDateToStartUTCDateTime(date)}`
      );
      return await data.json();
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["meetingsByDate", convertDateToStartUTCDateTime(date)],
    });
  }, [date]);

  const handleDateSelect = (selectedDate: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => {
    setDate(selectedDate.date);
  };
  const mutation = useMutation({
    mutationFn: (payload: { meetingid: number }) => {
      return fetch("/api/cancelmeeting", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
      });
    },
    onSuccess: async (data) => {
      if (data.statusText === "OK") {
        const res = await data.json();
        showNotification(data.statusText, res.message, "success");
        queryClient.invalidateQueries({
          queryKey: ["meetingsByDate", convertDateToStartUTCDateTime(date)],
        });
      } else {
        const errRes = await data.json();
        showNotification(data.statusText, errRes.error, "error");
      }
    },
  });
  const handleCancelClick = (id: number) => {
    mutation.mutate({ meetingid: id });
  };
  const handleEditClick = (meeting: any) => {
    setIsEditModalOpen(true);
    console.log(meeting, "meeting");
    setEditModalMeetingId(meeting.id);
    setEditModalEmail(meeting.email);
    setEditModalBody(meeting.description);
    setEditModalDate(new Date(meeting.startdate));
    setEditModalFromTime(
      new Date(meeting.startdate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setEditModalToTime(
      new Date(meeting.enddate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };
  const handleModalState = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };
  if (isError) {
    showNotification("Error Occured", error.message, "error");
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-y-12 md:grid-cols-2 md:grid-rows-1 md:gap-x-12">
      <MeetingsCard
        isEditable
        meetings={data.data}
        handleCancelClick={handleCancelClick}
        handleEditClick={handleEditClick}
      />

      <Calendar selectedDate={date} handleDateSelect={handleDateSelect} />
      {isEditModalOpen && (
        <BookingModal
          isOpen={isEditModalOpen}
          handleModalState={handleModalState}
          isEditModal
          editModalMeetingId={editModalMeetingId}
          editModalEmail={editModalEmail}
          editModalbody={editModalbody}
          editModalDate={editModalDate}
          editModalfromTime={editModalfromTime}
          editModaltoTime={editModaltoTime}
        />
      )}
    </div>
  );
}
