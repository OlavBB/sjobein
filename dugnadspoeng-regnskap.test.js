import { describe, it, expect } from "vitest";
import { calculateBalances, balanceFor } from "./dugnadspoeng-regnskap.js";

describe("calculateBalances", () => {
  it("saldo fra en blanding av dugnad, sesongstipend og poeng brukt på bookinger", () => {
    const balances = calculateBalances({
      dugnadRegistreringer: [
        { familieGren: "Betina+Steinar", poeng: 15 },
        { familieGren: "Betina+Steinar", poeng: 10 },
      ],
      stipendKrediteringer: [{ familieGren: "MamPapp", poeng: 30 }],
      bookinger: [
        {
          familieGren: "Betina+Steinar",
          poengBruktLengde: 5,
          poengBruktHorisont: 5,
        },
      ],
    });

    expect(balances["Betina+Steinar"]).toBe(15);
    expect(balances["MamPapp"]).toBe(30);
  });

  it("familiegren uten registreringer gir saldo 0 via balanceFor, ikke feil", () => {
    const balances = calculateBalances({});
    expect(balanceFor("Benedicte+Stian", balances)).toBe(0);
  });

  it("sesongstipend legges til uavhengig av dugnad-registreringer", () => {
    const balances = calculateBalances({
      dugnadRegistreringer: [{ familieGren: "MamPapp", poeng: 5 }],
      stipendKrediteringer: [{ familieGren: "MamPapp", poeng: 30 }],
    });
    expect(balances["MamPapp"]).toBe(35);
  });

  it("poeng brukt på bookinger uten forutgående opptjening gir negativ saldo (feilsituasjon synlig, ikke skjult)", () => {
    const balances = calculateBalances({
      bookinger: [
        { familieGren: "Olav+Frida", poengBruktLengde: 10, poengBruktHorisont: 0 },
      ],
    });
    expect(balances["Olav+Frida"]).toBe(-10);
  });
});

describe("balanceFor", () => {
  it("returnerer 0 for ukjent familiegren i stedet for undefined", () => {
    expect(balanceFor("MamPapp", {})).toBe(0);
  });
});
