import { Masonry } from "@mui/lab"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { isRouteErrorResponse, type MetaFunction, useLoaderData, useRouteError } from "react-router"
import { ImageTile } from "~/components/image-tile"
import { imageListSchema } from "~/models/image"
import type { Route } from "./+types/_index"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	const response = await fetch("https://picsum.photos/v2/list", { signal: request.signal })

	if (!response.ok) {
		throw new Response("Failed to fetch images", {
			status: response.status,
			statusText: response.statusText,
		})
	}
	const raw = await response.json()
	const images = imageListSchema.parse(raw)

	return { images }
}

export default function Index() {
	const { images } = useLoaderData<typeof loader>()
	const { t } = useTranslation()
	const [showAuthorId, toggleAuthorInfo] = useState<string | null>(null)

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
				<Masonry columns={{ xs: 1, sm: 2, lg: 4 }} spacing={2}>
					{images.map((imageRow) => (
						<ImageTile
							key={imageRow.id}
							imageRow={imageRow}
							showAuthorId={showAuthorId}
							toggleAuthorInfo={toggleAuthorInfo}
						/>
					))}
				</Masonry>
			</Container>
		</Box>
	)
}

export function ErrorBoundary() {
	const error = useRouteError()

	const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unexpected Error"

	const message = isRouteErrorResponse(error)
		? error.data || "Something went wrong while loading images."
		: "An unexpected error occurred."

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(to bottom, #5c1f1f, #c51e1e)",
				p: 2,
			}}
		>
			<Card
				elevation={8}
				sx={{
					maxWidth: 500,
					width: "100%",
					borderRadius: 3,
					backgroundColor: "#fff5f5",
					border: "1px solid #d32f2f",
				}}
			>
				<CardContent sx={{ textAlign: "center", p: 5 }}>
					<Typography
						variant="h3"
						gutterBottom
						sx={{
							color: "#b71c1c",
							fontFamily: "Crimson Pro Variable, serif",
							fontStyle: "italic",
						}}
					>
						{title}
					</Typography>

					<Typography
						variant="body1"
						sx={{
							color: "#5f2120",
							mb: 4,
						}}
					>
						{message}
					</Typography>

					<Button variant="contained" color="info" onClick={() => window.location.reload()}>
						Try Again
					</Button>
				</CardContent>
			</Card>
		</Box>
	)
}
