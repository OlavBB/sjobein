const DAY_MS = 86400000;

function toDate(d) {
  return d instanceof Date ? d : new Date(`${d}T00:00:00`);
}

export function lengthInDays(start, end) {
  return Math.round((toDate(end) - toDate(start)) / DAY_MS) + 1;
}

export function periodsOverlap(aStart, aEnd, bStart, bEnd) {
  return toDate(aStart) <= toDate(bEnd) && toDate(bStart) <= toDate(aEnd);
}

export function findOverlap(existingBookinger, proposed) {
  return (
    existingBookinger.find((b) =>
      periodsOverlap(proposed.start, proposed.end, b.start, b.end)
    ) || null
  );
}

export function calculateCost(proposed, settings, today = new Date()) {
  const days = lengthInDays(proposed.start, proposed.end);
  const extraDays = Math.max(0, days - settings.maksLengdeDager);
  const lengthCost = extraDays * settings.prisEkstraDag;

  const weeksAhead = Math.floor(
    (toDate(proposed.start) - toDate(today)) / DAY_MS / 7
  );
  const needsFriHorisont = weeksAhead > settings.maksHorisontUker;
  const horisontCost = needsFriHorisont ? settings.prisFriHorisont : 0;

  return {
    days,
    extraDays,
    lengthCost,
    needsFriHorisont,
    horisontCost,
    totalCost: lengthCost + horisontCost,
  };
}

export function validateBooking({
  existingBookinger,
  proposed,
  settings,
  saldo,
  today = new Date(),
}) {
  const conflict = findOverlap(existingBookinger, proposed);
  if (conflict) {
    return { valid: false, reason: "overlap", conflict };
  }

  const cost = calculateCost(proposed, settings, today);
  if (cost.totalCost > saldo) {
    return { valid: false, reason: "insufficient-balance", cost };
  }

  return { valid: true, cost };
}
