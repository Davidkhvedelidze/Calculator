"use client";

import { useState, useEffect } from "react";

export function Calendar({ onDateSelect, selectedDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(firstDayOfMonth);
    date.setDate(date.getDate() - i - 1);
    calendarDays.push({
      date: date.getDate(),
      fullDate: new Date(date),
      isCurrentMonth: false,
      isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
    });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    calendarDays.push({
      date: day,
      fullDate: date,
      isCurrentMonth: true,
      isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
    });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      day
    );
    calendarDays.push({
      date: day,
      fullDate: date,
      isCurrentMonth: false,
      isPast: date < new Date(new Date().setHours(0, 0, 0, 0)),
    });
  }

  const handleDateClick = (dayData) => {
    if (dayData.isPast || !dayData.isCurrentMonth) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      setSelectedStartDate(dayData.fullDate);
      setSelectedEndDate(null);
      setIsSelecting(true);
    } else if (selectedStartDate && !selectedEndDate) {
      // Complete selection
      if (dayData.fullDate < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(dayData.fullDate);
      } else {
        setSelectedEndDate(dayData.fullDate);
      }
      setIsSelecting(false);

      // Call parent callback
      if (onDateSelect) {
        const start =
          selectedStartDate < dayData.fullDate
            ? selectedStartDate
            : dayData.fullDate;
        const end =
          selectedStartDate < dayData.fullDate
            ? dayData.fullDate
            : selectedStartDate;
        onDateSelect([start, end]);
      }
    }
  };

  const isDateInRange = (dayData) => {
    if (!selectedStartDate) return false;
    if (selectedEndDate) {
      return (
        dayData.fullDate >= selectedStartDate &&
        dayData.fullDate <= selectedEndDate
      );
    }
    return dayData.fullDate.getTime() === selectedStartDate.getTime();
  };

  const isDateSelected = (dayData) => {
    if (!selectedStartDate) return false;
    if (selectedEndDate) {
      return (
        dayData.fullDate.getTime() === selectedStartDate.getTime() ||
        dayData.fullDate.getTime() === selectedEndDate.getTime()
      );
    }
    return dayData.fullDate.getTime() === selectedStartDate.getTime();
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDateRange = () => {
    if (!selectedStartDate) return "Select your travel dates";
    if (!selectedEndDate)
      return `Start: ${selectedStartDate.toLocaleDateString()}`;

    const start = selectedStartDate.toLocaleDateString();
    const end = selectedEndDate.toLocaleDateString();
    const nights = Math.ceil(
      (selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24)
    );

    return `${start} - ${end} (${nights} nights)`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold   dark:text-slate-100">
          Choose Your Dates
        </h3>
        <p className="text-sm   dark:text-slate-300">
          Select your travel dates to see availability and pricing
        </p>
      </div>

      {/* Date Range Display */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {formatDateRange()}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white   hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light"
        >
          ←
        </button>
        <h4 className="text-lg font-semibold   dark:text-slate-100">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button
          onClick={() => navigateMonth(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white   hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayData, index) => {
            const isInRange = isDateInRange(dayData);
            const isSelected = isDateSelected(dayData);
            const isToday =
              dayData.fullDate.toDateString() === new Date().toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(dayData)}
                disabled={dayData.isPast || !dayData.isCurrentMonth}
                className={`
                  relative h-10 w-10 rounded-lg text-sm font-medium transition-colors
                  ${
                    !dayData.isCurrentMonth
                      ? "text-slate-300 dark: "
                      : dayData.isPast
                      ? "text-slate-300 dark:  cursor-not-allowed"
                      : "text-slate-700 hover:bg-brand/10 dark:text-slate-300 dark:hover:bg-brand/20"
                  }
                  ${
                    isInRange && !isSelected
                      ? "bg-brand/20 dark:bg-brand/30"
                      : ""
                  }
                  ${
                    isSelected
                      ? "bg-brand text-white dark:bg-brand-light dark:text-brand-dark"
                      : ""
                  }
                  ${
                    isToday && !isSelected
                      ? "ring-2 ring-brand/50 dark:ring-brand-light/50"
                      : ""
                  }
                `}
              >
                {dayData.date}
                {isToday && !isSelected && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand dark:bg-brand-light"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Date Options */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Quick Select
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "This Month", months: 0 },
            { label: "Next Month", months: 1 },
            { label: "In 3 Months", months: 3 },
            { label: "In 6 Months", months: 6 },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => {
                const date = new Date();
                date.setMonth(date.getMonth() + option.months);
                setCurrentDate(date);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand hover:text-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-light"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
