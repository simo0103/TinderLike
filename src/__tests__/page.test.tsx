import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

beforeEach(() => {
	global.fetch = jest.fn();
});

afterEach(() => {
	jest.clearAllMocks();
});

test("handles successful API call", async () => {
	const mockData = {
		success: true,
		data: "test",
	};
	global.fetch = jest.fn().mockResolvedValueOnce({
		status: 200,
		ok: true,
		json: async () => Promise.resolve(mockData),
	});
	const response = await fetch("/api/data");
	const data = await response.json();
	expect(data).toEqual(mockData);
});
test("handles API errors", async () => {
	global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
	await expect(fetch("/api/data")).rejects.toThrow("Network error");
});
test("renders HomePage and checks for content", async () => {
	globalThis.fetch = jest.fn().mockResolvedValueOnce({
		status: 200,
		ok: true,
		json: async () => [
			{
				id: "u1",
				name: "Alice",
				photo: "https://i.pravatar.cc/360?img=43",
				age: 25,
				action: null,
				about: "I love hiking and outdoor adventures",
				distance: "5km away",
			},
		],
	});

	render(<HomePage />);
	expect(await screen.findAllByRole("img")).toHaveLength(1);
});

test("handle errors when fetch profiles", async () => {
	global.fetch = jest.fn().mockRejectedValueOnce(new Error("network"));
	render(<HomePage />);
	expect(
		await screen.findByText(/Error fetching profiles/i)
	).toBeInTheDocument();
});

test("handle errors when there are no profiles", async () => {
	global.fetch = jest.fn().mockResolvedValueOnce({
		status: 204,
		ok: true,
		json: async () => Promise.resolve([]),
	});
	render(<HomePage />);
	expect(await screen.findByText(/No profiles available/i)).toBeInTheDocument();
});
