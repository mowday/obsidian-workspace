async function nextJournalDate(tp, numberOfDays=14, startDate=undefined) {
  date = new Date(startDate);

  for(let i = 0; i < numberOfDays; i++) {
    date.setDate(date.getDate() + 1);
    const filename = date.toLocaleDateString();
    if (await tp.file.exists(filename)) {
      return filename;
    }
  }

  // If a next date wasn't found within the
  // specified amount of number of days back in time
  // we default to the day after the start date
  date = new Date(startDate);
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString()
}

module.exports = nextJournalDate;