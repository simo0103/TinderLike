import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../app/page";

const mockProfiles = [
	{
		id: "u1",
		name: "Alice",
		photo: "https://i.pravatar.cc/360?img=43",
		age: 25,
		action: null,
		about: "I love hiking and outdoor adventures",
		distance: "5km away",
	},
];

const mockSuccessResponse = {
	status: 200,
	ok: true,
	json: async () => mockProfiles,
};

const mockNoProfilesResponse = {
	status: 204,
	ok: true,
	json: async () => [],
};

const mockErrorResponse = {
	ok: false,
	status: 500,
	json: async () => ({ message: "Internal Server Error" }),
};

beforeEach(() => {
	global.fetch = jest.fn();
});

afterEach(() => {
	jest.clearAllMocks();
});

describe("API Call Behavior", () => {
	test("should handle a successful API call", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);
		const response = await fetch("/api/profiles");
		const data = await response.json();
		expect(data).toEqual(mockProfiles);
	});

	test("should handle API call errors", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockErrorResponse);
		const response = await fetch("/api/profiles");
		expect(response.ok).toBeFalsy();
	});
});

describe("HomePage Component Rendering", () => {
	test("should show initial loading state", () => {
		render(<HomePage />);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});

	test("should display a profile after successfully loading data", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockSuccessResponse);

		render(<HomePage />);

		await waitFor(() => {
			expect(
				screen.getByText((content, element) => {
					const text = element?.textContent?.replace(/\s/g, "");
					return text === "Alice,25";
				})
			).toBeInTheDocument();
		});

		const profileImage = screen.getByRole("img", { name: /alice/i });
		expect(profileImage).toBeInTheDocument();
		expect(profileImage).toHaveAttribute("src", mockProfiles[0].photo);
	});

	test("should show an error message on fetch failure", async () => {
		(global.fetch as jest.Mock).mockRejectedValueOnce(
			new Error("Network error")
		);

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText(/Error fetching profiles/i)).toBeInTheDocument();
		});
	});

	test("should show a 'no profiles available' message when API returns 204", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce(mockNoProfilesResponse);

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText(/No profiles available/i)).toBeInTheDocument();
		});
	});
});
