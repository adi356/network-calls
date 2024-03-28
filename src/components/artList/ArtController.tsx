import { ArtView } from "./ArtView"
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

//CONTAINS LOGIC FOR ARTVIEW

//type for what returns from Chicao Art API
interface ArtworkFromApi {
    id: number
    title: string
    thumbnail: {
        lqip: string
        alt_text: string
    }
    artist_display: string
}
//adding reducer function to this type to convert what we get from api request into our type fields
interface Artwork {
    id: string
    title: string
    base64: string
    artist: string
    description: string
}

export const ArtController = () => {
    const [ artworks, setArtworks ] = useState<Artwork[]>([])
    const [ offlineMessage, setOfflineMessage ] = useState<boolean>(false)

    //actual call to the Chicago Art API
    const fetchArtwork = useCallback( async () => {
        setOfflineMessage(false)
        try {
        const result = await axios.get('https://api.artic.edu/api/v1/artworks?fields=id,title,thumbnail,artist_display')
        const { data } = result
        const artList: ArtworkFromApi[] = data.data

        //converting from ArtworkFromApi to Artwork type
        const artwork: Artwork[] = artList.map(art => {
            const convertedArtwork: Artwork = {
                id: `${art.id}`,
                title: art.title,
                base64: art.thumbnail.lqip,
                artist: art.artist_display.split('\n')[0],
                description: art.thumbnail.alt_text
            }

            return convertedArtwork
        })

        console.log(artwork)

        setArtworks(artwork)
    } catch (e) {
        setOfflineMessage(true)
        setArtworks([])
    }
    }, [])
    
    useEffect(() => {
        //console.log('RUNNING USE EFFECT')
        fetchArtwork()
    }, [ fetchArtwork ])

    return (
        <div>
            This is where art goes
            <button onClick={fetchArtwork}>Reload</button>
            {
                offlineMessage ? (<div>You are offline</div>) : null
            }

            {
                artworks.map(art => {
                    return (
                        <ArtView 
                        key={art.id}    
                        {...art}
                        />
                    )
                })
            }
        </div>
    )

}