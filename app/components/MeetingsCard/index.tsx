import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CalendarIcon,
  MapPinIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
function MeetingsCard({
  className,
  isEditable = false,
  meetings,
}: {
  className?: string;
  isEditable?: boolean;
  meetings: [{ id: number; email: string; startdate: string; summary: string }];
}) {
  
  return (
    <div className={className}>
      <h2 className="text-base font-semibold text-gray-900">
        Upcoming meetings
      </h2>

      <ol className="mt-4 divide-y divide-gray-100 text-sm">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="relative flex space-x-6 py-6">
            <img
              src="./Avatar.png"
              alt=""
              className="h-14 w-14 flex-none rounded-full"
            />
            <div className="flex-auto">
              <h3 className="pr-10 font-semibold text-gray-900">
                {meeting.email}
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
                    <time dateTime={meeting.startdate}>
                      {new Date(meeting.startdate).toString()}
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
                  <dd>{meeting.summary}</dd>
                </div>
              </dl>
            </div>
            {isEditable && (
              <Menu
                as="div"
                className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
              >
                <div>
                  <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Edit
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Cancel
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MeetingsCard;
