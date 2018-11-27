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
	disabledOptionValue: string[],
	onChange: (event: any) => void;
	listOptions: InterfaceSelectOption[]
}


function Select(props: InterfaceSelectProps) {
	return (
		<ElementSelect
			name={props.name}
			defaultValue={String(props.defaultValue)}
			onChange={props.onChange}>

			{props.listOptions && props.listOptions.map((option) => (
				<option
					disabled={option.disabled || false}
					// disabled={props.disabledOptionValue.indexOf(option.value) > -1}
					key={option.key} value={option.value}>{option.title}</option>
			))}
		</ElementSelect>
	);
}

export default Select;
