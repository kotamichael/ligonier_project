export interface ImageProps {
	id: string
	author: string
	width: number
	height: number
	url: string
	download_url: string
}

export function ImageCard({ id, author, download_url }: ImageProps) {
	return (
		<div key={id} className="border p-4">
			<img src={download_url} key={id} alt={author} className="mb-2 h-auto w-full" />
			<h2 className="font-semibold text-xl">{author}</h2>
		</div>
	)
}
