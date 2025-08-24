"use client";
import React, { useEffect, useState } from "react";
import {
	Box,
	Stack,
	CircularProgress,
	Alert,
	Typography,
	IconButton,
} from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import type { Profile } from "../types";
import styles from "./page.module.css";

export default function HomePage() {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [disabled, setDisabled] = useState(true);
	const [matched, setMatched] = useState(false);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await fetch("/api/profiles");
				if (res.status === 204) {
					if (mounted) setProfiles([]);
				} else if (!res.ok) {
					throw new Error("Network error");
				} else {
					const data = (await res.json()) as Profile[];
					if (mounted) setProfiles(data);
					setDisabled(false);
				}
			} catch (e) {
				if (mounted) setError("Error fetching profiles");
				console.error(e);
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const goNext = () => setIndex((i) => i + 1);

	const handleOkay = () => {
		goNext();
	};

	useEffect(() => {
		if (matched) {
			const timer = setTimeout(() => {
				setDisabled(false);
				setMatched(false);
				goNext();
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [matched]);

	const handleSwipe = async (_action: "like" | "dislike") => {
		setDisabled(true);
		const current = profiles[index];
		if (!current) return;
		if (current.action === "like") {
			setMatched(true);
			return;
		}
		goNext();
		setDisabled(false);
		setMatched(false);
	};

	if (loading) {
		return (
			<Box
				minHeight="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				p={2}
				minHeight="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Alert severity="error">{error}</Alert>
			</Box>
		);
	}

	if (profiles.length === 0) {
		return (
			<Box
				p={2}
				minHeight="100vh"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography>No profiles available</Typography>
			</Box>
		);
	}

	const profile = profiles[index];
	const profilesEnded = index >= profiles.length;

	return (
		<Box
			p={2}
			minHeight="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Stack
				spacing={2}
				padding={4}
				alignItems="center"
				className={styles.glassEffect}
			>
				<Typography
					variant="h5"
					fontWeight={"bold"}
					color="white"
					textTransform={"uppercase"}
				>
					Matchy
				</Typography>
				<Box p={2}>
					{profilesEnded ? (
						<Typography>No more profiles</Typography>
					) : (
						<ProfileCard profile={profile} />
					)}
				</Box>
				{!profilesEnded && (
					<Stack direction="row" spacing={2}>
						<IconButton
							sx={{
								backgroundColor: "#ffffff87",
								border: "1px solid",
								borderColor: "grey.300",
								borderRadius: 100,
								boxShadow: 3,
							}}
							onClick={() => handleSwipe("dislike")}
							disabled={disabled}
							className="dislike-button"
						>
							<CloseRoundedIcon color="info" />
						</IconButton>
						<IconButton
							data-testid="skip-button"
							sx={{
								backgroundColor: "#ffffff87",
								border: "1px solid",
								borderColor: "grey.300",
								borderRadius: 100,
								boxShadow: 3,
							}}
							onClick={handleOkay}
							disabled={disabled}
						>
							<SkipNextRoundedIcon />
						</IconButton>
						<IconButton
							sx={{
								backgroundColor: "#ffffff87",
								border: "1px solid",
								borderColor: "grey.300",
								borderRadius: 100,
								boxShadow: 3,
							}}
							onClick={() => handleSwipe("like")}
							disabled={disabled}
							data-testid="like-button"
						>
							{matched ? (
								<FavoriteRoundedIcon color="error" />
							) : (
								<FavoriteBorderRoundedIcon color="error" />
							)}
						</IconButton>
					</Stack>
				)}
			</Stack>
			{matched && (
				<Alert severity="success" sx={{ position: "absolute", bottom: 16 }}>
					It&#39;s a match with {profile.name}!
				</Alert>
			)}
		</Box>
	);
}
