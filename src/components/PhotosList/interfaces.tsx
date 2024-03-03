export interface Photo {
    id: string
    alt_description: string
    likes: number | undefined
    downloads: number | undefined
    views: number | undefined
    urls: {
        full: string,
        small: string
    }
}

export interface PhotoCardProps {
    photoData: Photo
    reference?: (node: HTMLImageElement) => void
}
export interface PhotoListProps {
    data: Photo[]
    reference: (node: HTMLImageElement) => void
}