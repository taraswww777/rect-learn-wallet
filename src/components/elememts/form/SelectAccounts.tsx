import * as React from 'react';
import {InterfaceAccount} from "../../../types/InterfaceAccount";
import Select, {genSelectOptionsFromList, InterfaceSelectOption} from "../form/Select";


interface InterfaceSelectAccountsList {
	accountsList: InterfaceAccount[];
	onChange: (event: any) => void;
	name: string;
	currentSelectedId: string | number;
}


function SelectAccounts(props: InterfaceSelectAccountsList) {
	let options: InterfaceSelectOption[] = [
		{key: -1, value: '-1', title: '--selected account--'},
	];

	options = [
		...options,
		...genSelectOptionsFromList(props.accountsList),
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

export default SelectAccounts;

