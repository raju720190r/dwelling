import useClickOutside from "@/hooks/useClickOutside";
import { userAppStore } from "@/store/store";
import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import SearchCookie from "./searchcookie";

export default function SearchAddress() {
  const { selectionType, setSelectionType, searchLocation, setSearchLocation } =
    userAppStore();
  const [searchText, setSearchText] = useState("");
  const searchAddresses = async (query) => {
    const result = await SearchCookie(query);
    setSearchedAddresss(result);
  };
  const [searchedAddresss, setSearchedAddresss] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [containerRef] = useClickOutside();
  return (
    <>
      <label htmlFor="" className="text-xs font-semibold">
        Where
      </label>
      <input
        name="destinations"
        type="text"
        placeholder="Search Destinations"
        className="bg-transparent focus:outline-none hidden lg:block w-16 lg:text-base lg:w-max"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchAddresses(e.target.value);
        }}
      />
      <input
        name="destinations"
        type="text"
        placeholder="Desti.."
        className="bg-transparent focus:outline-none lg:hidden w-16 lg:text-base lg:w-max"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchAddresses(e.target.value);
        }}
      />
      {selectionType === "where" && searchedAddresss.length > 0 && (
        <div
          className="absolute w-96 left-0 top-24 shadow-lg rounded-3xl bg-white py-10 z-50"
          ref={containerRef}
        >
          <ul className="flex gap-0 flex-col">
            {searchedAddresss?.map((address, index) => (
              <li
                key={index}
                className="hover:bg-gray-300 transition-all duration-300 py-2"
                onClick={() => {
                  setSelectedAddress(address);
                  setSearchText(address.address);
                  setSearchedAddresss([]);
                  setSelectionType(undefined);
                  setSearchLocation(address);
                }}
              >
                <div
                  className="px-10 grid gap-10 items-center justify-start"
                  style={{ gridTemplateColumns: "10fr 90fr" }}
                >
                  <span className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-2xl">
                    <MdLocationPin />
                  </span>
                  <span className="truncate">{address.address}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
