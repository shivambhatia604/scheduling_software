"use client";
import { useState } from "react";
import { Button } from "@/ui/atoms/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/ui/atoms/dialog";
import { Field, Label, ErrorMessage } from "@/ui/atoms/fieldset";
import { Input } from "@/ui/atoms/input";
import { Textarea } from "@/ui/atoms/textarea";
import Calendar from "@/ui/atoms/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNotification } from "@/ui/context/NotificationContext";
import { useRouter } from "next/navigation";
import MeetingsCard from "../components/MeetingsCard";
import Time from "@/ui/atoms/time";
import { convertDateToStartUTCDateTime, isEmailValid } from "@/lib/helpers";

export default function BookingModal({
  isOpen,
  handleModalState,
}: {
  isOpen: boolean;
  handleModalState: () => void;
}) {
  const [email, setEmail] = useState({ value: "", isValid: true });
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const { showNotification } = useNotification();
  const router = useRouter();

  // console.log(email, "email");
  // console.log(date, "date");
  // console.log(fromTime, "fromTime");
  // console.log(toTime, "toTime");
  const isTimeSelectionValid = () => {
    const replaceFromTime = fromTime.replace(":", "");
    const replaceToTime = toTime.replace(":", "");

    const convertedFromTime = parseInt(replaceFromTime);
    const convertedToTime = parseInt(replaceToTime);
    return !(
      convertedFromTime === convertedToTime ||
      convertedFromTime > convertedToTime
    );
  };
  const handleButtonDisable = () => {
    return (
      !email.isValid ||
      email.value === "" ||
      !date ||
      !fromTime ||
      !toTime ||
      !isTimeSelectionValid()
    );
  };

  const handleEmailValidation = (emailObj: {
    value: string;
    isValid: boolean;
  }) => {
    if (!isEmailValid(emailObj.value)) {
      setEmail({ ...email, isValid: false });
      return;
    }
    setEmail({ ...email, isValid: true });
  };
  const handleDateSelect = (date: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => {
    setDate(date.date);
  };
  const handleToTimeSelect = (time: string) => {
    setToTime(time);
  };
  const handleFromTimeSelect = (time: string) => {
    setFromTime(time);
  };
  const mutation = useMutation({
    mutationFn: (payload: {
      startdate: Date;
      enddate: Date;
      summary: string;
      description?: string;
      location?: string;
      email: string;
    }) => {
      return fetch("/api/createmeeting", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
      });
    },
    onSuccess: async (data, variables) => {
      if (data.statusText === "OK") {
        const res = await data.json();
        console.log(res, "res");
        showNotification(data.statusText, res.message, "success");
        handleModalState();
      } else {
        const errRes = await data.json();
        console.log(errRes, "errres");
        showNotification(data.statusText, errRes.error, "error");
      }
    },
  });
  const constructDateFromDateAndTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    date.setHours(hours);
    date.setMinutes(minutes);
    const utcDate = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes()
      )
    );
    // console.log(utcDate); This will format back to local timezone as it internally calls date.toString
    return utcDate;
  };
  const handleScheduleMeeting = () => {
    //payload
    const startDate = constructDateFromDateAndTime(date, fromTime);
    const endDate = constructDateFromDateAndTime(date, toTime);
    const summary = "Meeting";
    // const description = body;
    mutation.mutate({
      startdate: startDate,
      enddate: endDate,
      summary,
      description: body,
      email: email.value,
    });

    //api call
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["meetingsByDate"],
    queryFn: async () => {
      const data = await fetch(
        `/api/getmeetings?date=${convertDateToStartUTCDateTime(new Date())}`
      );
      return await data.json();
    },
  });
  return (
    <>
      <Dialog open={isOpen} size="5xl" onClose={() => {}}>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogDescription>
          Please fill in all the required details to schedule a meeting.
        </DialogDescription>
        <DialogBody>
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-8">
            <MeetingsCard meetings={data?.data} className="grow" />
            <div className="grow">
              <Calendar
                handleDateSelect={handleDateSelect}
                selectedDate={date}
              />
              <Time
                handleToTimeSelect={handleToTimeSelect}
                handleFromTimeSelect={handleFromTimeSelect}
                fromTime={fromTime}
                toTime={toTime}
              />
            </div>
          </div>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email.value}
              autoComplete="on"
              placeholder="Type an email address"
              invalid={!email.isValid}
              onBlur={() => handleEmailValidation(email)}
              onChange={(e) => {
                setEmail({ ...email, isValid: true, value: e.target.value });
              }}
            />
            {!email.isValid && <ErrorMessage>Email is invalid</ErrorMessage>}

            <div className="mt-8">
              <Label htmlFor="description">
                Description
                <span className="text-gray-500">(Optional)</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                resizable={false}
                rows={5}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                value={body}
              />
            </div>
          </Field>
        </DialogBody>
        <DialogActions>
          <Button
            className=" before:bg-indigo-600"
            disabled={handleButtonDisable()}
            onClick={() => handleScheduleMeeting()}
          >
            Schedule
          </Button>
          <Button plain onClick={() => handleModalState()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
