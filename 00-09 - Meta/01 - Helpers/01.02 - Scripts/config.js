const config = {
  // Filters out to only pull events from specific calendars
  // Leave this empty ([]) to pull from all calendars
  whitelistedCalendars: ['Exchange'],

  // If you want to override and set the daily format manually
  // set it here. If this is set to "undefined" it will try to
  // pull the value from the periodic-note plugin settings
  // plugin if it's available, or default to `yyyy-MM-DD`
  dailyFormat: undefined,

  // If you want to override and set the weekly format manually
  // set it here. If this is set to "undefined" it will try to
  // pull the value from the periodic-note plugin settings
  // plugin if it's available, or default to `yyyy-[W]ww`
  weeklyFormat: undefined,

  // If you want to override and set the quarterly format manually
  // set it here. If this is set to "undefined" it will try to
  // pull the value from the periodic-note plugin settings
  // plugin if it's available, or default to `yyyy-[Q]Q`
  quarterlyFormat: undefined,
    
  // This will force the previous and next links in the daily
  // notes to skip over weekends
  skipWeekends: true,

  // The folder to look for all the files.  If this is set to "undefined" it will try to
  // pull the value from the periodic-note plugin settings
  // plugin if it's available, or default to `Journal`
  folder: undefined,
}



/***
 * Do not modify pass this point unless you know what you are doing!
 ***/
if (!config.dailyFormat) {
  if(app.plugins.plugins['periodic-notes']) {
    config.dailyFormat = app.plugins.plugins['periodic-notes'].settings.daily.format || 'yyyy-MM-DD'
  } else {
    config.dailyFormat = 'yyyy-MM-DD'
  }
}

if (!config.weeklyFormat) {
  if(app.plugins.plugins['periodic-notes']) {
    config.weeklyFormat = app.plugins.plugins['periodic-notes'].settings.weekly.format || 'yyyy-[W]W'
  } else {
    config.weeklyFormat = 'yyyy-[W]W'
  }
}

if (!config.quarterlyFormat) {
  if(app.plugins.plugins['periodic-notes']) {
    config.quarterlyFormat = app.plugins.plugins['periodic-notes'].settings.quarterly.format || 'yyyy-[Q]Q'
  } else {
    config.quarterlyFormat = 'yyyy-[Q]Q'
  }
}

if (!config.folder) {
  if(app.plugins.plugins['periodic-notes']) {
    config.folder = app.plugins.plugins['periodic-notes'].settings.daily.folder || '/Journal'
  } else {
    config.folder = '/Journal'
  }
}

module.exports = () => config