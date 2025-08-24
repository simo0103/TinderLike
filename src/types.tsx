export type SwipeAction = "like" | "dislike";

export interface Profile {
	id: string;
	name: string;
	photo: string;
	age: number;
	action?: SwipeAction | null;
	about?: string;
	distance: string;
}
