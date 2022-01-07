export interface ThumbnailConfig {
    compressionRate: number;
    directory: string;
    name: (name: string, width: number, height: number, extension: string) => string;
    quality: string;
    scalingFactor: number;
}


export const THUMBNAIL: ThumbnailConfig = {
    compressionRate: 50,
    directory: '.thumbnails',
    name: (name, width, height, extension) => `${name}-${width}-${height}.${extension}`,
    quality: 'good',
    scalingFactor: 2
};
