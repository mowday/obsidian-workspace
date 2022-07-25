async function getMeetingEvents(tp, startDate, days = 1, calendars = []) {
  if (!startDate) {
    startDate = moment().format('yyyy-MM-DD')
  }
  
  const options = { startDate, days, calendars: calendars.map(cal => cal.replace(/\s/g, '\\ ')).join(' ') }
  const data = JSON.parse(await tp.user.getCalenderEvents(options))

  return data.events
    .map(event => {
      const start = moment(event.start_date).format('HH:mm')
      const end = moment(event.end_date).format('HH:mm')
      const date = moment(event.end_date).format('yyyy-MM-DD')
      const link = `${date} - ${event.title}`

      const endDate = new Date(event.end_date)
      let checkmark = ' '
      if (endDate < new Date()) {
        checkmark = 'm'
      }

      return `- [${checkmark}] ${start}-${end} - [[${cleanupTitle(link)}|${event.title}]] ${getVideoMeetingLink(event.notes)}`
    })
    .join('\n')
}

function cleanupTitle(title) {
  return title
    .replace(/:/g, '')
}

const reTeams = /<(https:\/\/teams.microsoft.com\/l\/meetup-join\/.*?)>/
function getVideoMeetingLink(notes) {
  let match;
  if((match = reTeams.exec(notes))) {
    return `([Teams call](${match[1]}))`
  } else {
    return ''
  }
}

module.exports = getMeetingEvents