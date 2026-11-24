import { describe, it, expect, vi, beforeEach } from "vitest";
import { findCity } from "./city";
import { getWeather } from "../services/weather";
import type { Weather } from "../types";

vi.mock("../services/weather", () => ({
    getWeather: vi.fn()
}))

beforeEach(() => {
    vi.clearAllMocks()
})

describe("findCity", () => {
    it("returns null for an empty string", async () => {
        expect(await findCity(" ")).toBeNull()
        expect(getWeather).not.toHaveBeenCalled()
    })

    it("returns null for a name over 100 characters", async () => {
        expect(await findCity("a".repeat(101))).toBeNull()
    })

    it("returns name and country when the city is found", async () => {
        vi.mocked(getWeather).mockResolvedValue({
            name:"Rome",
            sys: { country: "IT" },
        } as Weather)

        expect(await findCity("Rome,IT")).toBe("Rome,IT")
    })

    it("return null when the city is not found", async () => {
        vi.mocked(getWeather).mockResolvedValue(null)

        expect(await findCity("Nowherreville")).toBeNull()
    })
})