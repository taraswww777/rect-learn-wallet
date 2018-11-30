import * as _ from 'lodash';
import * as React from 'react';
import styled from "styled-components";

const ElementSelect = styled.select`
	width: 100%;
	display: inline-block;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #000;
`;


export interface InterfaceSelectOption {
	value: string
	title: string,
	key: string | number,
	disabled?: boolean,
}

export interface InterfaceSelectProps {
	name: string,
	defaultValue: string | number | 0 | any,
	onChange: (event: any) => void;
	listOptions: InterfaceSelectOption[]
}


export function genSelectOptionsFromTree(list: any[], level: number = 0, currentId?: number, skipCurrent?: boolean): any {
	let resultOptions: InterfaceSelectOption[] = [];
	let prefix = ' - ';

	currentId = _.get(currentId, '', 0);
	level = _.get(level, '', 0);
	skipCurrent = _.get(skipCurrent, '', false);

	_.map(list, (item: any): boolean | void => {
		if (skipCurrent) {
			if (currentId === item.id) {
				return false;
			}
		}

		resultOptions.push({
			key: item.id,
			title: prefix.repeat(level) + item.name,
			value: String(item.id),
		});

		if (item.child) {
			level++;
			resultOptions.push(...genSelectOptionsFromTree(item.child, level, currentId, skipCurrent));
			level--;
		}
	});

	return resultOptions;
}

export function genSelectOptionsFromList(list: any[]): any {
	let resultOptions: InterfaceSelectOption[] = [];


	_.map(list, (item: any): boolean | void => {
		resultOptions.push({
			key: item.id,
			title: item.name,
			value: String(item.id),
		});
	});

	return resultOptions;
}

export default function Select(props: InterfaceSelectProps) {
	return (
		<ElementSelect
			name={props.name}
			defaultValue={String(props.defaultValue)}
			onChange={props.onChange}>

			{props.listOptions && props.listOptions.map((option) => (
				<option
					disabled={option.disabled || false}
					key={option.key} value={option.value}>{option.title}</option>
			))}
		</ElementSelect>
	);
}
