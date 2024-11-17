"use client"
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
import { emailRegex } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/ui/context/NotificationContext";
import { useRouter } from "next/navigation";

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

  console.log(email, "email");
  console.log(date, "date");
  console.log(fromTime, "fromTime");
  console.log(toTime, "toTime");
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
  function validateEmail() {
    if (email.value === "") {
      return;
    }
    if (!emailRegex.test(email.value)) {
      setEmail({ ...email, isValid: false });
      return;
    }
    setEmail({ ...email, isValid: true });
  }
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
        console.log(res,"res")
        showNotification(data.statusText, res.message, "success");
        // handleModalState();
      } else {
        const errRes = await data.json();
        console.log(errRes,'errres')
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
  return (
    <>
      <Dialog open={isOpen} size="5xl" onClose={() => {}}>
        <DialogTitle>Schedule a Meeting</DialogTitle>
        <DialogDescription>
          Please fill in all the required details to schedule a meeting.
        </DialogDescription>
        <DialogBody>
          <Calendar
            handleDateSelect={handleDateSelect}
            handleToTimeSelect={handleToTimeSelect}
            handleFromTimeSelect={handleFromTimeSelect}
            fromTime={fromTime}
            toTime={toTime}
            selectedDate={date}
          />
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={email.value}
              placeholder="Type an email address"
              invalid={!email.isValid}
              onBlur={() => validateEmail()}
              onChange={(e) => {
                setEmail({ ...email, isValid: true, value: e.target.value });
              }}
            />
            {!email.isValid && <ErrorMessage>Email is invalid</ErrorMessage>}

            <div className="mt-8">
              <Label>
                Description
                <span className="text-gray-500">(Optional)</span>
              </Label>
              <Textarea
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
