import { describe, it, expect } from "vitest";
import {
  lengthInDays,
  periodsOverlap,
  findOverlap,
  calculateCost,
  validateBooking,
} from "./booking-motor.js";

const settings = {
  maksLengdeDager: 4,
  maksHorisontUker: 6,
  prisEkstraDag: 5,
  prisFriHorisont: 5,
};

describe("lengthInDays", () => {
  it("samme dag er 1 dag", () => {
    expect(lengthInDays("2026-06-10", "2026-06-10")).toBe(1);
  });

  it("4 dager sammenhengende", () => {
    expect(lengthInDays("2026-06-10", "2026-06-13")).toBe(4);
  });
});

describe("periodsOverlap / findOverlap", () => {
  const existing = [{ start: "2026-06-10", end: "2026-06-13", familieGren: "Olav+Frida" }];

  it("tilstøtende periode rett etter godkjennes (ingen overlapp)", () => {
    const proposed = { start: "2026-06-14", end: "2026-06-16" };
    expect(findOverlap(existing, proposed)).toBe(null);
  });

  it("tilstøtende periode rett før godkjennes (ingen overlapp)", () => {
    const proposed = { start: "2026-06-07", end: "2026-06-09" };
    expect(findOverlap(existing, proposed)).toBe(null);
  });

  it("eksakt overlapp avvises", () => {
    const proposed = { start: "2026-06-10", end: "2026-06-13" };
    expect(findOverlap(existing, proposed)).toEqual(existing[0]);
  });

  it("delvis overlapp avvises", () => {
    const proposed = { start: "2026-06-12", end: "2026-06-15" };
    expect(findOverlap(existing, proposed)).toEqual(existing[0]);
  });
});

describe("calculateCost", () => {
  const today = new Date("2026-06-01T00:00:00");

  it("innenfor standardgrense (lengde og horisont) koster 0", () => {
    const proposed = { start: "2026-06-10", end: "2026-06-13" }; // 4 dager, ~1.3 uker frem
    const cost = calculateCost(proposed, settings, today);
    expect(cost.totalCost).toBe(0);
    expect(cost.needsFriHorisont).toBe(false);
  });

  it("lengde utover standardgrense koster pris_ekstra_dag per ekstra dag", () => {
    const proposed = { start: "2026-06-10", end: "2026-06-17" }; // 8 dager = 4 ekstra
    const cost = calculateCost(proposed, settings, today);
    expect(cost.extraDays).toBe(4);
    expect(cost.lengthCost).toBe(20);
    expect(cost.needsFriHorisont).toBe(false);
    expect(cost.totalCost).toBe(20);
  });

  it("horisont utover 6 uker krever fri horisont (flat kostnad)", () => {
    const proposed = { start: "2026-09-01", end: "2026-09-04" }; // 4 dager, langt frem
    const cost = calculateCost(proposed, settings, today);
    expect(cost.needsFriHorisont).toBe(true);
    expect(cost.horisontCost).toBe(5);
    expect(cost.totalCost).toBe(5);
  });

  it("kombinasjon av utvidet lengde og fri horisont på samme booking", () => {
    const proposed = { start: "2026-09-01", end: "2026-09-08" }; // 8 dager, langt frem
    const cost = calculateCost(proposed, settings, today);
    expect(cost.lengthCost).toBe(20);
    expect(cost.horisontCost).toBe(5);
    expect(cost.totalCost).toBe(25);
  });
});

describe("validateBooking", () => {
  const today = new Date("2026-06-01T00:00:00");
  const existing = [{ start: "2026-06-10", end: "2026-06-13", familieGren: "Olav+Frida" }];

  it("godkjenner gyldig booking innenfor standardgrense uten poeng", () => {
    const result = validateBooking({
      existingBookinger: existing,
      proposed: { start: "2026-06-20", end: "2026-06-22" },
      settings,
      saldo: 0,
      today,
    });
    expect(result.valid).toBe(true);
    expect(result.cost.totalCost).toBe(0);
  });

  it("avviser overlappende booking uansett saldo", () => {
    const result = validateBooking({
      existingBookinger: existing,
      proposed: { start: "2026-06-11", end: "2026-06-12" },
      settings,
      saldo: 1000,
      today,
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("overlap");
  });

  it("avviser booking når saldo ikke dekker beregnet kostnad", () => {
    const result = validateBooking({
      existingBookinger: existing,
      proposed: { start: "2026-06-20", end: "2026-06-27" }, // 8 dager = 20 poeng
      settings,
      saldo: 10,
      today,
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("insufficient-balance");
    expect(result.cost.totalCost).toBe(20);
  });

  it("godkjenner utvidet booking når saldo akkurat dekker kostnaden", () => {
    const result = validateBooking({
      existingBookinger: existing,
      proposed: { start: "2026-06-20", end: "2026-06-27" }, // 20 poeng
      settings,
      saldo: 20,
      today,
    });
    expect(result.valid).toBe(true);
  });
});
