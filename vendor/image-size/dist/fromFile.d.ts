export interface ImageSize {
  width: number;
  height: number;
  orientation?: number;
  type?: string;
}

export type ImageSizeCalculationResult = ImageSize & {
  images?: ImageSize[];
};

export declare const setConcurrency: (concurrency: number) => void;
export declare const imageSizeFromFile: (
  filePath: string,
) => Promise<ImageSizeCalculationResult>;
