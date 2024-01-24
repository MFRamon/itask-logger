const getTodaysDate = () => {
  const f = new Intl.DateTimeFormat("us-US", {
    dateStyle: "full",
  });
  const formattedDate = f.format(new Date());
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default getTodaysDate;
