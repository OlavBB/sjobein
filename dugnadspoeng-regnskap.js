export function calculateBalances({
  dugnadRegistreringer = [],
  stipendKrediteringer = [],
  bookinger = [],
} = {}) {
  const balances = {};

  const add = (familieGren, amount) => {
    balances[familieGren] = (balances[familieGren] || 0) + amount;
  };

  for (const d of dugnadRegistreringer) add(d.familieGren, d.poeng);
  for (const s of stipendKrediteringer) add(s.familieGren, s.poeng);
  for (const b of bookinger) {
    const brukt = (b.poengBruktLengde || 0) + (b.poengBruktHorisont || 0);
    if (brukt > 0) add(b.familieGren, -brukt);
  }

  return balances;
}

export function balanceFor(familieGren, balances) {
  return balances[familieGren] || 0;
}
