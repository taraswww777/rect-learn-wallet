import * as React from 'react';
import styled from "styled-components";

const ElementInput = styled.input`
	width: 100%;
	display: inline-block;
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid #000;
`;

interface InterfaceInputProps {
	disabled?: boolean,
	name: string,
	value: string | number,
	onChange: (event: any) => void;
}


function Input(props: InterfaceInputProps) {
	return (
		<ElementInput
			disabled={props.disabled}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}

export default Input;

