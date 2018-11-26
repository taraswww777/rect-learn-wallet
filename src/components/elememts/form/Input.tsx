import * as React from 'react';
import styled from "styled-components";

const ElementInput = styled.input`
	width: 100%;
	display: inline-block;
	padding: 5px 10px;
	border-radius: 5px;
	border: none;
`;

interface InterfaceInputProps {
	type: string,
	name: string,
	value: string | number,
	onChange: (event: any) => void;
}


function Input(props: InterfaceInputProps) {
	return (
		<ElementInput
			type={props.type}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
		/>
	);
}

export default Input;

