import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"
import { useLoaderData } from "react-router"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

type ImageData = {
	id: string
	author: string
	width: number
	height: number
	url: string
	download_url: string
}

export type LoaderData = ImageData[]

export async function loader(): Promise<LoaderData> {
	const res = await fetch("https://picsum.photos/v2/list")

	if (!res.ok) {
		throw new Response("Failed to fetch images", { status: res.status })
	}

	const data: ImageData[] = await res.json()

	return data
}

export default function Index() {
	const { t } = useTranslation()
	const data = useLoaderData<LoaderData>()

	return (
		<div>
			<h1>{t("welcome")}</h1>
			<ul>
				{data.map((item) => (
					<li key={item.id}>{item.author}</li>
				))}
			</ul>
		</div>
	)
}
