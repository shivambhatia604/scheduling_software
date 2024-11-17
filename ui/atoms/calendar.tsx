import { useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  // More meetings...
];
function generateTimeSlots() {
  const slots = [];
  let startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Start at midnight

  while (startTime.getDate() === new Date().getDate()) {
    const timeLabel = startTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(timeLabel);
    startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
  }
  slots.push("23:59");
   

  return slots;
}
function getDaysInMonth(year: any, month: any) {
  const date = new Date(year, month, 1);
  const days = [];
  const firstDayOfWeek = date.getDay();

  // Add empty days to align the first day of the month correctly
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: null });
  }

  // Add each day of the month
  while (date.getMonth() === month) {
    days.push({
      date: new Date(date),
      isCurrentMonth: true,
      isToday: isToday(date),
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
}

function isToday(date: any) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function Calendar({
  handleDateSelect,
  selectedDate,
  handleToTimeSelect,
  handleFromTimeSelect,
  fromTime,
  toTime,
}: {
  handleDateSelect: (day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => void;
  selectedDate: Date;
  handleToTimeSelect: (time: string) => void;
  handleFromTimeSelect: (time: string) => void;
  fromTime: string;
  toTime: string;
}) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const days = getDaysInMonth(currentYear, currentMonth);
  const timeSlots = generateTimeSlots();

  function previousMonth() {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  }

  function nextMonth() {
    setCurrentMonth((nextMonth) => (nextMonth === 11 ? 0 : nextMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((nextYear) => nextYear + 1);
    }
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">
        Upcoming meetings
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="p-2 m-2">Current timezone:{" "}
          <span className="font-bold">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
            </div>
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              onClick={previousMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={dayIdx}
                onClick={() => {
                  if (day.date) {
                    handleDateSelect(day);
                  }
                }}
                type="button"
                className={`py-1.5 ${
                  selectedDate.getDate() === day?.date?.getDate() &&
                  "bg-indigo-300"
                } ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"} ${
                  day.isToday
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-900"
                } hover:bg-gray-100 focus:z-10`}
              >
                <time
                  dateTime={
                    day.date ? day.date.toISOString().split("T")[0] : ""
                  }
                >
                  {day.date ? day.date.getDate() : ""}
                </time>
              </button>
            ))}
          </div>

          <div className="mt-4 max-w-fit">
            <label
              htmlFor="fromTime"
              className="block text-sm font-medium text-gray-700"
            >
              From Time
            </label>
            <select
              id="fromTime"
              value={fromTime}
              onChange={(e) => handleFromTimeSelect(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 max-w-fit">
            <label
              htmlFor="toTime"
              className="block text-sm font-medium text-gray-700"
            >
              To Time
            </label>
            <select
              id="toTime"
              value={toTime}
              onChange={(e) => handleToTimeSelect(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm lg:col-span-6 xl:col-span-8">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="relative flex space-x-6 py-6">
              <img
                src={meeting.imageUrl}
                alt=""
                className="h-14 w-14 flex-none rounded-full"
              />
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900">
                  {meeting.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500">
                  <div className="flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={meeting.datetime}>
                        {meeting.date} at {meeting.time}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start space-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
