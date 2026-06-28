import { endOfWeek, salaryCycle, startOfWeek } from "@/lib/dates";

describe("dates", () => {
  it("uses Monday as week start", () => {
    expect(startOfWeek(new Date(2026, 5, 28)).toISOString().slice(0, 10)).toBe("2026-06-22");
    expect(endOfWeek(new Date(2026, 5, 28)).toISOString().slice(0, 10)).toBe("2026-06-28");
  });

  it("calculates salary cycle around received day", () => {
    const cycle = salaryCycle(new Date(2026, 5, 10), 28);
    expect(cycle.start.toISOString().slice(0, 10)).toBe("2026-05-27");
  });
});
