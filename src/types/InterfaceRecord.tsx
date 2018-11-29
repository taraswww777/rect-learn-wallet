export interface InterfaceRecord {
	id: number;
	date: string;
	sum: number;
	name: string;
	accountId: number;
	categoryId: number;
	type: 'inc' | 'dec';
}
