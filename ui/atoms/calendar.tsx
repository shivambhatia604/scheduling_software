import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";


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
}: {
  handleDateSelect: (day: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }) => void;
  selectedDate: Date;
}) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const days = getDaysInMonth(currentYear, currentMonth);
  

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
    <div className="lg:grid lg:grid-cols-7 lg:gap-x-8">
      <div className="text-center lg:col-start-1 lg:col-end-8 lg:row-start-1 lg:mt-9 xl:col-start-1">
        <div className="p-2 m-2">
          Current timezone:{" "}
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
                day.isToday ? "text-indigo-600 font-semibold" : "text-gray-900"
              } hover:bg-gray-100 focus:z-10`}
            >
              <time
                dateTime={day.date ? day.date.toISOString().split("T")[0] : ""}
              >
                {day.date ? day.date.getDate() : ""}
              </time>
            </button>
          ))}
        </div>

        
      </div>
    </div>
  );
}
