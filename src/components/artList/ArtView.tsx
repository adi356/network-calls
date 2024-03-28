interface ArtProps {
    id: string
    title: string
    base64: string
    artist: string
    description: string
}

export const ArtView = ({
    title,
    base64,
    artist,
    description,
}: ArtProps) => {
    //NO LOGIC

    return (
        <div style={{ border: 1, borderStyle: 'solid'}}>
            <div>
                {title}
            </div>
            <div>
                <img height={50} width={50} src={base64} alt=' ' />
            </div>
            <div>
                {artist}
            </div>
            <div>
                {description}
            </div>
        </div>
    )
}