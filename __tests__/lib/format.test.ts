import { formatNumber, formatRollout, truncate } from "@/lib/format";

describe("formatNumber", () => {
  it("returns raw number below 1000", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(850)).toBe("850");
    expect(formatNumber(999)).toBe("999");
  });

  it("formats thousands with K suffix", () => {
    expect(formatNumber(1_000)).toBe("1.0K");
    expect(formatNumber(1_200)).toBe("1.2K");
    expect(formatNumber(48_200)).toBe("48.2K");
    expect(formatNumber(999_999)).toBe("1000.0K");
  });

  it("formats millions with M suffix", () => {
    expect(formatNumber(1_000_000)).toBe("1.0M");
    expect(formatNumber(4_300_000)).toBe("4.3M");
    expect(formatNumber(203_000_000)).toBe("203.0M");
  });
});

describe("formatRollout", () => {
  it('returns "Off" for 0', () => {
    expect(formatRollout(0)).toBe("Off");
  });

  it('returns "Full" for 100', () => {
    expect(formatRollout(100)).toBe("Full");
  });

  it("returns percentage string for partial rollout", () => {
    expect(formatRollout(25)).toBe("25%");
    expect(formatRollout(10)).toBe("10%");
    expect(formatRollout(99)).toBe("99%");
  });
});

describe("truncate", () => {
  it("returns string unchanged if within limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("truncates and appends ellipsis", () => {
    expect(truncate("hello world", 8)).toBe("hello w…");
  });

  it("handles empty string", () => {
    expect(truncate("", 5)).toBe("");
  });
});
