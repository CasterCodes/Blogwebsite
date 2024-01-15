const getFormattedDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(date)
  );
};

export default getFormattedDate;
