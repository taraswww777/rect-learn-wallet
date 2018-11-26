import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import Select, {InterfaceSelectOption} from "../form/Select";


interface InterfaceAdminCategoriesList {
	categoryCurrent: InterfaceCategory;
	categoryList: InterfaceCategory[];
	onChange: (event: any) => void;
	name: string
}


function genCategoriesSelectOptions(categoryList: InterfaceCategory[], level: number = 0): any {
	let resultOptions: InterfaceSelectOption[] = [];
	let prefix = ' - ';

	categoryList.map((category: InterfaceCategory) => {
		resultOptions.push({
			key: category.id,
			title: prefix.repeat(level) + category.name,
			value: String(category.id),
		});

		if (category.child) {
			level++;
			resultOptions.push(...genCategoriesSelectOptions(category.child, level));
			level--;
		}

	});
	return resultOptions;
}

function CategoriesSelect(props: InterfaceAdminCategoriesList) {
	let options: InterfaceSelectOption[] = [
		{key: -1, value: '-1', title: '--selected category--'},
		{key: 0, value: '0', title: 'Root category'}
	];

	options = [
		...options,
		...genCategoriesSelectOptions(props.categoryList),
	];

	return (
		<Select
			{...props}
			name={props.name}
			defaultValue={props.categoryCurrent.parentId}
			onChange={props.onChange}
			disabledOptionValue={[String(props.categoryCurrent.id)]}
			listOptions={options}/>
	);
}

export default CategoriesSelect;

