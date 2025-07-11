import React from "react";
import { cn } from "../../lib/utils";

export function Header({ className }) {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-20 h-[101px] border-b border-gray-300 bg-cream",
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-9">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-4">
          {/* Indonesian Government Logo */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/03b6822b2085525f1e1a0940ab68661b8364add1?width=72"
            alt="Indonesian Government Logo"
            className="h-10 w-9"
          />

          {/* Brand Title */}
          <h1 className="font-poppins text-2xl font-bold text-dark-gray lg:text-4xl">
            E-DEMOKRASI
          </h1>
        </div>

        {/* Right side - Language Toggle and User Profile */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Language Toggle Switch */}
          <div className="relative">
            <div className="flex h-7 w-[85px] items-center rounded-full bg-toggle-purple p-1">
              <div className="h-5 w-9 rounded-full bg-gray-100 transition-transform duration-200"></div>
            </div>
            {/* Language labels */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <span className="font-inter text-xs font-bold text-toggle-purple">
                ID
              </span>
              <span className="font-inter text-xs font-bold text-gray-100">
                EN
              </span>
            </div>
          </div>

          {/* User Profile Avatar */}
          <div className="relative h-12 w-12">
            {/* Avatar Background Circle */}
            <div className="h-12 w-12 rounded-full bg-user-avatar"></div>

            {/* User Icon */}
            <svg
              className="absolute left-1.5 top-1.5 h-9 w-9"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.3333 10.7917C12.3333 9.15616 12.983 7.58765 14.1395 6.43117C15.296 5.2747 16.8645 4.625 18.5 4.625C20.1355 4.625 21.704 5.2747 22.8605 6.43117C24.017 7.58765 24.6667 9.15616 24.6667 10.7917C24.6667 12.4272 24.017 13.9957 22.8605 15.1522C21.704 16.3086 20.1355 16.9583 18.5 16.9583C16.8645 16.9583 15.296 16.3086 14.1395 15.1522C12.983 13.9957 12.3333 12.4272 12.3333 10.7917ZM12.3333 20.0417C10.289 20.0417 8.32831 20.8538 6.88272 22.2994C5.43713 23.745 4.625 25.7056 4.625 27.75C4.625 28.9766 5.11228 30.153 5.97963 31.0204C6.84699 31.8877 8.02337 32.375 9.25 32.375H27.75C28.9766 32.375 30.153 31.8877 31.0204 31.0204C31.8877 30.153 32.375 28.9766 32.375 27.75C32.375 25.7056 31.5629 23.745 30.1173 22.2994C28.6717 20.8538 26.711 20.0417 24.6667 20.0417H12.3333Z"
                fill="#2DAA9E"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
