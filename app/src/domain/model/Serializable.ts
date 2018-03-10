export interface Serializable {
	createFromDto: (dto: { [name: string]: any }) => any;
}
