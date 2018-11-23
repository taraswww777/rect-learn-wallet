export interface InterfaceCategory {
	id: string;
	index: number;
	order: number;
	name: string;
	guid: string;
	prentId?: string;
	child?: InterfaceCategory[]
}
