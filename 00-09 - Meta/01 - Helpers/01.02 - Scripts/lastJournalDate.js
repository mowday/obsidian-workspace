async function lastJournalDate(tp, numberOfDays=14, startDate=undefined) {
  let date = new Date(startDate)

  for(let i = 0; i < numberOfDays; i++) {
    date.setDate(date.getDate() - 1)
    const filename = date.toLocaleDateString()
    if (await tp.file.exists(filename)) {
      return filename;
    }
  }

  // If a previous date wasn't found within the
  // specified amount of number of days back in time
  // we default to the day before
  date = new Date(startDate);
  date.setDate(date.getDate() - 1)
  return date.toLocaleDateString()
}

module.exports = lastJournalDate;