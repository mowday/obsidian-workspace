async function getSpecificMeeting(tp, date, eventTitle, calendars = []) {
  if (!date) {
    throw new Error('Missing a required date')
  }

  if (!eventTitle) {
    throw new Error('Missing requried eventTitle')
  }
  
  const options = {
    startDate: date,
    days: 1,
    calendars: calendars.map(cal => cal.replace(/\s/g, '\\ ')).join(' ')
  }

  const data = JSON.parse(await tp.user.getCalenderEvents(options))
  const event = data.events.find(event => cleanupTitle(event.title) == eventTitle)
  event.videoMeetingLink = getVideoMeetingLink(event.notes)
  event.notes = cleanUpNotes(event.notes)

  return event;
}

function cleanupTitle(title) {
  return title
    .replace(/:/g, '')
}

const teamsBanner = /\s\s[\s\S]+\nMicrosoft Teams/g
const from = /From:|Från:/
function cleanUpNotes(notes) {
  return notes
    .split(teamsBanner)[0]
    .split(from)[0]
}

const reTeams = /<(https:\/\/teams.microsoft.com\/l\/meetup-join\/.*?)>/
function getVideoMeetingLink(notes) {
  let match;
  if((match = reTeams.exec(notes))) {
    return `[Teams call](${match[1]})`
  } else {
    return ''
  }
}

module.exports = getSpecificMeeting