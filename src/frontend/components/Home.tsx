import { useState, useEffect } from "react"
import TrackGrid from "./TrackGrid"
import { COLUMNS } from "./columns"
import { useMemo } from "react"
import { Track } from "./Types"


export default function Home({ contract }: any) {
    const [marketItems, setMarketItems] = useState<Track[]>()
    const loadMarketplaceItems = async () => {
        // Get all unsold items/tokens
        const results = await contract.getAllTracks()
        const marketItems = await Promise.all(
            results.map(async (i: any) => {
                const uri = await contract.tokenURI(i.tokenId)
                const httpUrl = uri
                    .replace("ipfs://", "https://")
                    .replace("/metadata.json", ".ipfs.dweb.link/metadata.json")
                const response = await fetch(httpUrl)
                const metadata = await response.json()
                let item: Track = {
                    id: i.tokenId.toString(),
                    name: metadata.name,
                    image: await createHttpUrl(metadata.image),
                    description: metadata.description,
                    audio: await createHttpUrl(metadata.properties.audio),
                    title: metadata.properties.title,
                    albumTitle: metadata.properties.albumTitle,
                    artist: metadata.properties.artist,
                    bpm: metadata.properties.bpm,
                    key: metadata.properties.key,
                    releaseDate: metadata.properties.releaseDate,
                    previewTimeStamp: metadata.properties.previewTimeStamp,
                    explicit: metadata.properties.explicit,
                    genre: metadata.properties.genre,
                    duration: metadata.properties.duration,
                }
                // console.log(item)
                return item
            })
        )
        setMarketItems(marketItems)
    }

    const createHttpUrl = async (ipfsUrl: string) => {
        const httpUrl = new URL(ipfsUrl.replace("ipfs://", "https://"))
        return `${httpUrl.protocol}//${httpUrl.hostname}.ipfs.dweb.link${httpUrl.pathname}`
    }

    useEffect(() => {
        !marketItems && loadMarketplaceItems()
    })

    const columns = useMemo(() => COLUMNS, [COLUMNS])
    const data = useMemo(() => marketItems, [marketItems])

    return (
        <div>
            {data ? (
                <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1, paddingTop: 340 }}>
                        {TrackGrid(data, columns)}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export function playTrack(trackUrl: string) {
    console.log(trackUrl)
}
