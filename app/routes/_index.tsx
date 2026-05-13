import { Masonry } from "@mui/lab"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"
import { useLoaderData } from "react-router"
import { ImageTile } from "~/components/image-tile"
import { imageListSchema } from "~/models/image"
import type { Route } from "./+types/_index"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export async function loader({ request }: Route.LoaderArgs) {
	const response = await fetch("https://picsum.photos/v2/list", { signal: request.signal })
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
