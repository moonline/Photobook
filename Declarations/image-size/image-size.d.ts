declare module "image-size" {
	function size(path: string, callback: (error: any, dimensions: { width: number, height: number }) => void): void;
	export = size;
}
