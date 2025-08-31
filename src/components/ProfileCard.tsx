import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import type { Profile } from "../types";

const ProfileCard = ({ profile }: { profile: Profile }) => {
	return (
		<Card
			data-testid={`profile-card-${profile.id}`}
			sx={{
				maxWidth: 360,
				margin: "auto",
				borderRadius: 8,
				boxShadow: 3,
				position: "relative",
				pointerEvents: "none",
			}}
		>
			<CardMedia
				component="img"
				height="460"
				image={profile.photo}
				alt={profile.name}
			/>
			<CardContent
				sx={{
					cursor: "pointer",
					position: "absolute",
					pointerEvents: "auto",
					zIndex: 1,
					paddingX: 2,
					paddingY: 0,
					bottom: 16,
					right: 0,
					background: "rgba(255, 255, 255, 0.9)",
					color: "white",
					width: "90%",
					borderTopLeftRadius: 20,
					borderBottomLeftRadius: 20,
				}}
			>
				<Typography paddingTop={1} variant="h5" color="black" component="div">
					{profile.name}, {profile.age}
				</Typography>
				<Typography fontSize={16} variant="h6" color="black" component="div">
					{profile.distance}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ProfileCard;
