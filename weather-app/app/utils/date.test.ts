import { describe, it, expect } from "vitest";
import { getDayKey, formatTime, formatDay } from "./date";

//1700000000 = 14.11.2023 klo 22:13:20 UTC
const dt = 1700000000
//1700000000 = 14.11.2023 klo 02:13 UTC
const earlyMorningDt = dt - 20  * 3600

describe("date utils", () => {
    it("getDayKey uses the city's timezone", () => {
        expect(getDayKey(dt, 0)).toBe("2023-11-14")
        expect(getDayKey(dt, 7200)).toBe("2023-11-15")
    })

    it("formatTime shows local time", () => {
        expect(formatTime(dt, 0)).toBe("22:13")
        expect(formatTime(dt, 7200)).toBe("00:13")
    })

    it("formatDay formats with and without weekday", () => {
        expect(formatDay("2026-11-23", false)).toBe("23.11.2026")
        expect(formatDay("2026-11-23")).toBe("Mon 23.11.2026")
    })
    it("getDayKey returns the previous day for a negative timezone", () => {
        expect(getDayKey(earlyMorningDt, 0)).toBe("2023-11-14")
        expect(getDayKey(earlyMorningDt, -18000)).toBe("2023-11-13")
    })
})