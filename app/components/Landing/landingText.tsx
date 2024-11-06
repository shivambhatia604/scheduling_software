import React from "react";
import {
  ArrowPathIcon,
  ShareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
const features = [
  {
    name: "Share unique link.",
    description:
      "You can share your unique link to your clients and they can book time slot as per their and your availability.",
    icon: ShareIcon,
  },
  {
    name: "Google and Apple Calander Sync.",
    description: "Get your scheduled meetings on your Android or iOS device.",
    icon: ArrowPathIcon,
  },
  {
    name: "Cancel or Re-schedule.",
    description:
      "Got stuck in someting important, you can cancel or re-schedule your meetings as per your need.",
    icon: CalendarDaysIcon,
  },
];
function LandingText() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                Schedule Faster
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Booking a time slot made simpler
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                An easy to use scheduling tool for everyone.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingText;
