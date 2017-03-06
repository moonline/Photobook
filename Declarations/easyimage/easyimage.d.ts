declare module "easyimage" {
	export function resize(
		options: { src: string, dst: string, width?: number, height?: number }
	): { then: (callback: (error: any, stdout: any, stderr: any) => void) => void };
}
