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
  const event = data.events.find(event => cleanupTitle(event.title) == cleanupTitle(eventTitle))

  if (!event) {
    return {
      title: cleanupTitle(eventTitle),
      notes: 'Unable to find event',
      startTime: '00:00',
      endTime: '00:00',
    }
  }

  event.notes = event.notes || ''
  event.videoMeetingLink = getVideoMeetingLink(event.notes)
  event.notes = cleanUpNotes(event.notes)


  event.startTime = moment(event.start_date).format('HH:mm')
  event.endTime = moment(event.end_date).format('HH:mm')

  return event;
}

function cleanupTitle(title) {
  return title
    .replace(/:/g, '')
    .replace(/\//g, '-')
}

const teamsBanner = /________________________________________________________________________________/
const from = /From:|Från:/g
function cleanUpNotes(notes) {
  try {
    const withoutTeamsBanner = notes.split(teamsBanner)[0]
    const skippingFrom = withoutTeamsBanner.split(from)[0]
    if(skippingFrom.replace(/[\n\r]/g, '') === '') {
      const rawText = withoutTeamsBanner.split(from)[1]
      const splitOnNewlines = rawText.split(/[\r\n]{4}/)
      splitOnNewlines.shift()
  
      return splitOnNewlines.join('\n\n').trim()
    } else {
      return skippingFrom.trim();
    }
  } catch {
    return 'No meeting description'
  }
}

const reTeams = /<(https:\/\/teams.microsoft.com\/l\/meetup-join\/.*?)>/
const secureOutlookLinks = /<(https:\/\/\w+.safelinks.protection.outlook.com\/.*?)[&?]url=(.*?)[&>]/
function getVideoMeetingLink(notes) {
  let match;
  if ((match = secureOutlookLinks.exec(notes))) {
    // Secure links, use the decoded URI from there instead
    notes = '<' + decodeURIComponent(match[2]) + '>'
  }

if((match = reTeams.exec(notes))) {
    return `[Teams call](${match[1]})`
  }
  
  return ''
}

module.exports = getSpecificMeeting