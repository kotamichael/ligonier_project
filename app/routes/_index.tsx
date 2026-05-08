import { useTranslation } from "react-i18next"
import type { MetaFunction } from "react-router"
import { useNavigation } from "react-router"

export const meta: MetaFunction = () => {
	return [{ title: "Ligonier Take-Home Challenge" }, { name: "description", content: "Check out these images!" }]
}

export default function Index() {
	const navigation = useNavigation()
	const { t } = useTranslation()
	return (
		<div className={navigation.state === "loading" ? "loading" : ""}>
			<h1>{t("welcome")}</h1>
		</div>
	)
}
