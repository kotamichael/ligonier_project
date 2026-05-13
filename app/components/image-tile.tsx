import { Box, Card, CardActionArea, CardMedia, Fade, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import fallbackImage from "~/assets/fallback.png"
import type { ImageRow } from "~/models/image"

export interface ImageTileProps {
	imageRow: ImageRow
	showAuthorId: string | null
	toggleAuthorInfo: (id: string | null) => void
}

export function ImageTile({ imageRow, showAuthorId, toggleAuthorInfo }: ImageTileProps) {
	const [loaded, setLoaded] = useState(false)
	const [imgSrc, setImgSrc] = useState(imageRow.download_url)
	useEffect(() => {
		if (loaded) return

		const timeout = setTimeout(() => {
			if (imgSrc !== fallbackImage) {
				setImgSrc(fallbackImage)
			}
		}, 10000)

		return () => clearTimeout(timeout)
	}, [loaded, imgSrc])

	return (
		<Box
			sx={{
				width: "100%",
				aspectRatio: `${imageRow.width} / ${imageRow.height}`,
			}}
		>
			<Card sx={{ height: "100%" }}>
				<CardActionArea
					onClick={() => toggleAuthorInfo(showAuthorId === imageRow.id ? null : imageRow.id)}
					sx={{
						height: "100%",
						width: "100%",
						position: "relative",
					}}
				>
					{!loaded && (
						<Skeleton
							variant="rectangular"
							animation="wave"
							sx={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								zIndex: 1,
							}}
						/>
					)}
					<CardMedia
						component="img"
						src={imgSrc}
						alt={imageRow.author}
						loading="lazy"
						decoding="async"
						width={imageRow.width}
						height={imageRow.height}
						onLoad={() => setLoaded(true)}
						onError={() => {
							if (imgSrc !== fallbackImage) {
								setLoaded(false)
								setImgSrc(fallbackImage)
							} else {
								setLoaded(true)
							}
						}}
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							display: "block",
							opacity: loaded ? 1 : 0,
							transition: "opacity 0.3s ease-in-out",
						}}
					/>
					<Fade appear={false} in={showAuthorId === imageRow.id}>
						<Box
							sx={{
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								bgcolor: "rgba(0, 0, 0, 0.54)",
								color: "white",
								p: "1",
							}}
						>
							<Typography variant="h5" align="center" sx={{ fontFamily: "Crimson Pro Variable, serif" }}>
								{imageRow.author}
							</Typography>
						</Box>
					</Fade>
				</CardActionArea>
			</Card>
		</Box>
	)
}
