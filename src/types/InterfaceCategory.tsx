export interface InterfaceCategory {
	id: number;
	order: number;
	name: string;
	parentId?: number;
}


export interface InterfaceCategoryTree extends InterfaceCategory {
	child?: InterfaceCategoryTree[]
}
