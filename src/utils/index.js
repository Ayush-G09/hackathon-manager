export const getStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return "Upcoming";
  } else if (now >= start && now <= end) {
    return "Active";
  } else if (now > end) {
    return "Past";
  }
};

export const convertDateFormat = (isoDateString) => {
  const date = new Date(isoDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const generateId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};

export const truncateString = (str) => {
  if (str.length > 50) {
    return str.substring(0, 50) + "...";
  }
  return str;
};

export const convertDateTimeToReadableFormat = (dateTimeStr) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateTimeStr);

  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const time = date.toLocaleTimeString("en-US", options);

  const day = date.getUTCDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const formattedDate = `${day}${daySuffix} ${
    months[date.getUTCMonth()]
  } ${String(date.getUTCFullYear()).slice(2)} ${time}`;

  return formattedDate;
};
