import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export interface Image {
	id: string
	author: string
	width: number
	height: number
	url: string
	download_url: string
}

export interface ImageResponse {
	data: Image[]
}

export interface LoaderData {
	imagesData: ImageResponse
}

export async function loader() {
	const res = await fetch("https://picsum.photos/v2/list")

	const imageData = await res.json()

	// const sortedImages = imageData.sort((a: Image, b: Image) => Number(a.id) - Number(b.id))
	return { imagesData: { data: imageData } }
}

export default function Index({ loaderData }: { loaderData: LoaderData }) {
	const { t } = useTranslation()
	if (!loaderData) return <p>No data found</p>

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-6 font-bold text-3xl">{t("welcome")}</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{loaderData.imagesData.data.map((imageRow) => (
					<div key={imageRow.id} className="border p-4">
						<img src={imageRow.download_url} key={imageRow.id} alt={imageRow.author} className="mb-2 h-auto w-full" />
						<h2 className="font-semibold text-xl">{imageRow.author}</h2>
					</div>
				))}
			</div>
		</div>
	)
}
