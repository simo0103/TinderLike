import { NextResponse } from "next/server";
import type { Profile } from "../../../types";

let profiles: Profile[] = [
	{
		id: "u1",
		name: "Alice",
		photo: "https://i.pravatar.cc/360?img=43",
		age: 25,
		action: null,
		about: "I love hiking and outdoor adventures",
		distance: "5km away",
	},
	{
		id: "u2",
		name: "Anna",
		photo: "https://i.pravatar.cc/360?img=38",
		age: 30,
		action: null,
		about: "I enjoy trying new recipes",
		distance: "10km away",
	},
	{
		id: "u3",
		name: "Maria",
		photo: "https://i.pravatar.cc/360?img=31",
		age: 28,
		action: "like",
		about: "Passionate about art and painting",
		distance: "8km away",
	},
	{
		id: "u4",
		name: "Lucy",
		photo: "https://i.pravatar.cc/360?img=29",
		age: 29,
		action: null,
		about: "Avid reader and coffee enthusiast",
		distance: "12km away",
	},
	{
		id: "u5",
		name: "Stefania",
		photo: "https://i.pravatar.cc/360?img=47",
		age: 32,
		action: "like",
		about: "Fitness lover and yoga practitioner",
		distance: "3km away",
	},
	{
		id: "u6",
		name: "Angela",
		photo: "https://i.pravatar.cc/360?img=28",
		age: 28,
		action: null,
		about: "Travel lover and photographer",
		distance: "15km away",
	},
];

export async function GET() {
	if (!profiles || profiles.length === 0) {
		return new Response(null, { status: 204 });
	}
	return NextResponse.json(profiles);
}
