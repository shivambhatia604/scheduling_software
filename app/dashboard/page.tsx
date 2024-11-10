"use client";
import { useState } from "react";
import { Button } from "@/ui/atoms/button";
import BookingModal from "./BookingModal";
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="mt-8">
        <Button
          className="w-full md:w-1/3 before:bg-indigo-600"
          onClick={() => handleModalState()}
        >
          Schedule a meeting
        </Button>
        <BookingModal
          isOpen={isModalOpen}
          handleModalState={() => handleModalState()}
        />
      </div>
    </div>
  );
}

export default Dashboard;
