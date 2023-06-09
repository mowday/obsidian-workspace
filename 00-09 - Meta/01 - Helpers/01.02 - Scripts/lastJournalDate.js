async function lastJournalDate(tp, numberOfDays=14, startDate=undefined) {
  let date = moment(startDate, tp.user.config().dailyFormat)

  for(let i = 0; i < numberOfDays; i++) {
    date.subtract(1, 'd')
    const filename = tp.user.config().folder + '/' + date.format(tp.user.config().dailyFormat) + '.md'
    if (await tp.file.exists(filename)) {
      return filename
    }
  }

  // If a last date wasn't found within the
  // specified amount of number of days back in time
  // we default to the day before the start date
  date = new moment(startDate, tp.user.config().dailyFormat)
  date.subtract(1, 'd')

  if (tp.user.config().skipWeekends) {
    while(date.day() === 0 || date.day() === 6) {
      // If it's a Saturday or Sunday we move to the previous day until Friday
      date.subtract(1, 'd')
      console.log('going back one day weekend', date)
    }
  }

  return date.format(tp.user.config().dailyFormat)
}

module.exports = lastJournalDate;