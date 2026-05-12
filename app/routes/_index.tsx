import { Masonry } from "@mui/lab"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"

// import { ImageCard } from "~/components/image-card"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export interface ImageRow {
	id: string
	author: string
	width: number
	height: number
	url: string
	download_url: string
}

export interface ImageResponse {
	data: ImageRow[]
}

export interface LoaderData {
	imagesData: ImageResponse
}

export async function loader() {
	const res = await fetch("https://picsum.photos/v2/list")

	const imageData = await res.json()
	return { imagesData: { data: imageData } }
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
	const { t } = useTranslation()
	const [expandedId, setExpandedId] = useState<string | null>(null)

	if (!loaderData) return <p>No data found</p>

	return (
		<Box
			sx={{
				backgroundImage: "linear-gradient(to bottom, #9ab4a3, #84aa9d 28%, #86a89d 36%, #79a49b 50%, #548d91)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Container sx={{ py: 4 }}>
				<Typography
					variant="h1"
					gutterBottom
					sx={{
						color: "#fbf0e6",
						fontFamily: "Crimson Pro Variable, serif",
						letterSpacing: {
							md: "0.2em",
						},
						textShadow: "2px 2px #548d91",
						fontStyle: "italic",
					}}
				>
					{t("heading")}
					<Divider variant="inset" sx={{ borderColor: "#fbf0e6" }} />
				</Typography>
				<Masonry sequential columns={{ xs: 1, sm: 2, lg: 4 }} spacing={2}>
					{loaderData.imagesData.data.map((imageRow) => (
						<Card key={imageRow.id}>
							<CardActionArea onClick={() => setExpandedId(expandedId === imageRow.id ? null : imageRow.id)}>
								<CardMedia
									component="img"
									loading="lazy"
									key={imageRow.id}
									alt={imageRow.author}
									src={imageRow.download_url}
								/>
								<Fade appear={false} in={expandedId === imageRow.id}>
									<Box
										sx={{
											position: "absolute",
											bottom: 0,
											left: 0,
											width: "100%",
											bgcolor: "rgba(0, 0, 0, 0.54)",
											color: "white",
											padding: "10px",
										}}
									>
										<Typography variant="h5" align="center" sx={{ fontFamily: "Crimson Pro Variable, serif" }}>
											{imageRow.author}
										</Typography>
									</Box>
								</Fade>
							</CardActionArea>
						</Card>
					))}
				</Masonry>
			</Container>
		</Box>
	)
}
