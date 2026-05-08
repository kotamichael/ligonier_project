import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export default function Index() {
	const { t } = useTranslation()
	return (
		<div>
			<h1>{t("Images")}</h1>
		</div>
	)
}
