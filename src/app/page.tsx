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
import { motion, AnimatePresence } from "framer-motion";
import type { Profile } from "../types";
import styles from "./page.module.css";
import ProfileCard from "@/components/ProfileCard";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const swipePower = (offset: number, velocity: number) =>
	Math.abs(offset) * velocity;

export default function HomePage() {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [matched, setMatched] = useState(false);
	const [swipeDirection, setSwipeDirection] = useState<number>(0);
	const [disabled, setDisabled] = useState(true);

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

	const handleSwipe = async (action: "like" | "dislike") => {
		const currentProfile = profiles[index];
		if (!currentProfile) return;

		const isMatched = currentProfile.action === "like" && action === "like";
		if (isMatched) {
			setMatched(true);
			setDisabled(true);
			setTimeout(() => {
				setMatched(false);
				setDisabled(false);
				setIndex((i) => i + 1);
			}, 2000);
		} else {
			setMatched(false);
			setIndex((i) => i + 1);
		}
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

	const motionVariants = {
		center: {
			zIndex: 1,
			x: 0,
			rotate: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction > 0 ? 1000 : -1000,
			rotate: direction > 0 ? 10 : -10,
			opacity: 0,
			transition: { duration: 0.2 },
		}),
	};

	return (
		<Box
			p={2}
			minHeight="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			className={styles.glassEffect}
			sx={{ position: "relative", width: "100%" }}
		>
			<Stack spacing={2} padding={4} alignItems="center">
				<Typography
					variant="h5"
					fontWeight={"bold"}
					color="white"
					textTransform={"uppercase"}
				>
					Matchy
				</Typography>
				<Box
					p={2}
					sx={{
						position: "relative",
						width: 360,
						height: 460,
					}}
				>
					<AnimatePresence>
						{!profilesEnded ? (
							<motion.div
								className={"swipable-div"}
								key={profile.id}
								custom={swipeDirection}
								animate="center"
								exit="exit"
								drag="x"
								variants={motionVariants}
								dragConstraints={{ left: 0, right: 0 }}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = swipePower(offset.x, velocity.x);
									if (swipe > 100) {
										setSwipeDirection(1);
										handleSwipe("like");
									} else if (swipe < -100) {
										setSwipeDirection(-1);
										handleSwipe("dislike");
									}
								}}
								whileDrag={{ scale: 1.05 }}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
								}}
							>
								<ProfileCard profile={profile} />
								{matched && profile && (
									<div
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "rgba(0,0,0,0.5)",
											color: "white",
											fontSize: 24,
											fontWeight: "bold",
											borderRadius: 8,
											zIndex: 20,
										}}
									>
										It&#39;s a match with {profile.name}!
									</div>
								)}
							</motion.div>
						) : (
							<div
								className={styles.glassEffect}
								style={{
									height: "100%",
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Typography variant="h6" color="white">
									No more profiles
								</Typography>
							</div>
						)}
					</AnimatePresence>
				</Box>
				{!profilesEnded && (
					<Stack className={"buttonsWrapper"} direction="row" spacing={2}>
						<IconButton
							sx={{
								":hover": {
									backgroundColor: "#ffffff87",
								},
								backgroundColor: "#ffffffff",
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
							sx={{
								":hover": {
									backgroundColor: "#ffffff87",
								},
								backgroundColor: "#ffffffff",
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
		</Box>
	);
}
