import * as Module from "./_index"

const mockImages = [
	{
		id: "0",
		author: "Alejandro Escamilla",
		width: 5000,
		height: 3333,
		url: "https://unsplash.com/photos/yC-Yzbqy7PY",
		download_url: "https://picsum.photos/id/0/5000/3333",
	},
	{
		id: "1",
		author: "Alejandro Escamilla",
		width: 5000,
		height: 3333,
		url: "https://unsplash.com/photos/LNRyGwIJr5c",
		download_url: "https://picsum.photos/id/1/5000/3333",
	},
]

describe("Home route", () => {
	it("should render the home page text properly in english", async ({ renderStub }) => {
		const { getByText } = await renderStub({
			entries: [
				{
					id: "home",
					path: "/",
					Component: Module.default,
					loader: async () => ({
						images: mockImages,
					}),
				},
			],
		})

		expect(
			getByText("React Router is awesome!", {
				exact: false,
			})
		).not.toBeNull()
	})

	it("should render the home page text properly in spanish", async ({ renderStub }) => {
		const { getByText } = await renderStub({
			entries: [
				{
					id: "home",
					path: "/",
					Component: Module.default,
					loader: async () => ({
						images: mockImages,
					}),
				},
			],
			i18n: {
				lng: "es",
			},
		})

		expect(
			getByText("React Router es increíble!", {
				exact: false,
			})
		).not.toBeNull()
	})
})
