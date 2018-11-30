import * as React from 'react';
import {InterfaceCategoryTree} from 'src/types/InterfaceCategory';
import Select, {genSelectOptionsFromTree, InterfaceSelectOption} from "../form/Select";


interface InterfaceAdminCategoriesList {
	categoryTree: InterfaceCategoryTree[];
	onChange: (event: any) => void;
	name: string
	currentSelectedId: string | number;
}


function SelectCategories(props: InterfaceAdminCategoriesList) {
	let options: InterfaceSelectOption[] = [
		{key: -1, value: '-1', title: '--selected category--'},
	];

	options = [
		...options,
		...genSelectOptionsFromTree(props.categoryTree),
	];

	return (
		<Select
			{...props}
			name={props.name}
			defaultValue={props.currentSelectedId}
			onChange={props.onChange}
			listOptions={options}/>
	);
}

export default SelectCategories;

