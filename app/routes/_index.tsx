import Masonry from "@mui/lab/Masonry"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Collapse from "@mui/material/Collapse"
import Container from "@mui/material/Container"
import Fade from "@mui/material/Fade"
import Paper from "@mui/material/Paper"
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

	const sortedImages = [...imageData].sort((a, b) => {
		const lastNameA = (a.author ?? "").split(/\s+/).at(-1) ?? ""
		const lastNameB = (b.author ?? "").split(/\s+/).at(-1) ?? ""
		return lastNameA.localeCompare(lastNameB, undefined, { sensitivity: "base" })
	})
	return { imagesData: { data: sortedImages } }
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
	const { t } = useTranslation()
	const [expandedId, setExpandedId] = useState<string | null>(null)

	const handleExpandClick = (id: string) => {
		setExpandedId(expandedId === id ? null : id)
	}

	if (!loaderData) return <p>No data found</p>

	return (
		<Container>
			<div className="container mx-auto px-4 py-8">
				<Masonry sequential columns={3} spacing={2}>
					<Paper elevation={1} className="mb-3">
						<Typography variant="h3" component="h1" align="center" gutterBottom>
							{t("welcome")}
						</Typography>
					</Paper>
					{loaderData.imagesData.data.map((imageRow) => (
						<Card key={imageRow.id} className="relative">
							<CardActionArea onClick={() => handleExpandClick(imageRow.id)}>
								<CardMedia component="img" key={imageRow.id} alt={imageRow.author} src={imageRow.download_url} />
								<Fade appear={false} in={expandedId === imageRow.id}>
									<Collapse in={expandedId === imageRow.id} timeout="auto" unmountOnExit>
										<CardContent>
											<Typography align="center">{imageRow.author}</Typography>
										</CardContent>
									</Collapse>
								</Fade>
							</CardActionArea>
						</Card>
					))}
				</Masonry>
			</div>
		</Container>
	)
}
