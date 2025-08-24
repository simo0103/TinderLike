import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileCard from "../components/ProfileCard";

const mockProfile = {
	id: "u1",
	name: "Alice",
	photo: "https://i.pravatar.cc/360?img=43",
	age: 25,
	action: null,
	about: "I love hiking and outdoor adventures",
	distance: "5km away",
};

describe("ProfileCard", () => {
	it("dovrebbe renderizzare il componente con i dati del profilo", () => {
		render(<ProfileCard profile={mockProfile} />);

		const nameAndAge = screen.getByText("Alice, 25");
		expect(nameAndAge).toBeInTheDocument();

		const distance = screen.getByText("5km away");
		expect(distance).toBeInTheDocument();

		const profileImage = screen.getByRole("img", { name: "Alice" });
		expect(profileImage).toBeInTheDocument();
		expect(profileImage).toHaveAttribute(
			"src",
			"https://i.pravatar.cc/360?img=43"
		);

		const cardElement = screen.getByTestId(`profile-card-${mockProfile.id}`);
		expect(cardElement).toBeInTheDocument();
	});
});
