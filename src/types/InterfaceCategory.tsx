export interface InterfaceCategory {
	id: number;
	order: number;
	name: string;
	parentId?: number | 0;
}


export interface InterfaceCategoryTree extends InterfaceCategory {
	child?: InterfaceCategoryTree[]
}
