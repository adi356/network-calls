import { useState, createContext, useContext,  useCallback, useEffect } from 'react'
import axios from 'axios'

interface ArtworkFromApi {
    id: number
    title: string
    thumbnail: {
        lqip: string
        alt_text: string
    }
    artist_display: string
}

interface Artwork {
    id: string
    title: string
    base64: string
    artist: string
    description: string
}

interface ArtworkContextType {
    artwork: Artwork[]
    fetchArtwork: () => void
}

const ArtworkListContextInitial: ArtworkContextType = {
    artwork: [],
    fetchArtwork: () => {}
}

const ArtworkListContext = createContext<ArtworkContextType>(ArtworkListContextInitial)


//create custom hook
export const useArtworkList = () => useContext(ArtworkListContext)

//create provider
export const ArtworkListProvider = ({
    children
}: { children: any }) => {
    const [ artwork, setArtwork ] = useState<Artwork[]>([])

    const fetchArtwork = useCallback( async () => {
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

        setArtwork(artwork)
    } catch (e) {
        setArtwork([])
    }
    }, [])

    useEffect(() => {
        console.log('RUNNING USE EFFECT')
        fetchArtwork()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ArtworkListContext.Provider value={{artwork, fetchArtwork}}>
            {children}
        </ArtworkListContext.Provider>
    )
}