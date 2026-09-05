const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
};

const clockOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
};

const getUtcOffset = (date, timeZone) => {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        timeZoneName: 'shortOffset'
    }).formatToParts(date);
    const offset = parts.find(part => part.type === 'timeZoneName')?.value;

    return offset?.replace('GMT', 'UTC') ?? 'UTC';
};

const formatTime = (date, timeZone) => {
    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        ...dateOptions,
        timeZone
    });
    const clockFormatter = new Intl.DateTimeFormat('en-GB', {
        ...clockOptions,
        timeZone
    });

    return {
        clock: clockFormatter.format(date),
        date: dateFormatter.format(date)
    };
};

const updateTime = (container, date, timeZone, timezoneLabel) => {
    const formatted = formatTime(date, timeZone);
    const clock = container.querySelector('.time-clock');
    const dateElement = container.querySelector('.time-date');
    const zone = container.querySelector('.time-zone');
    const isoDate = date.toISOString();

    clock.textContent = formatted.clock;
    clock.dateTime = isoDate;
    dateElement.textContent = formatted.date;
    dateElement.dateTime = isoDate;
    zone.textContent = `${getUtcOffset(date, timeZone)} (${timezoneLabel})`;
};

const updateTimes = () => {
    const now = new Date();
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const myTime = document.querySelector('.my-time');
    const localTime = document.querySelector('.local-time');

    if (myTime) {
        updateTime(myTime, now, 'UTC', 'UTC');
    }

    if (localTime) {
        updateTime(localTime, now, localTimezone, localTimezone);
    }
};

if (document.querySelector('.my-time, .local-time')) {
    updateTimes();
    setInterval(updateTimes, 1000);
}