import React from "react";
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
function Time({
  handleToTimeSelect,
  handleFromTimeSelect,
  fromTime,
  toTime,
}: {
  handleToTimeSelect: (time: string) => void;
  handleFromTimeSelect: (time: string) => void;
  fromTime: string;
  toTime: string;
}) {

    const timeSlots = generateTimeSlots();
  return (
    <div>
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
  );
}

export default Time;
