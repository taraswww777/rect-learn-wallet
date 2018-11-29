import * as React from 'react';
import styled from "styled-components";
import {fnAccountsSave} from "../../dispatches/dispatchAdminAccounts";
import {typeFunctionSaveCategory} from "../../dispatches/dispatchAdminCategories";
import imgArrowUp from '../../img/arrow-up.svg';
import {InterfaceAccount} from "../../types/InterfaceAccount";
import {InterfaceCategory} from "../../types/InterfaceCategory";

const ElChangeOrder = styled.div`
	text-align: center;
	display: flex;
	align-items: center;
`;
const ElChangeOrderUp = styled.span`
	cursor: pointer;
	padding: 5px;
	border-radius: 50%;
	display: inline-block;
	width: 30px;
	height: 30px;
	opacity: 0.5;
	background: url("${imgArrowUp}") center center/cover no-repeat;
	margin: 0 5px;

	&:hover{
		opacity: 1;
	}
`;
const ElChangeOrderDown = styled(ElChangeOrderUp)`
	transform: rotate(180deg);
`;

function onDown(onSave: typeFunctionSaveCategory, element: InterfaceCategory | InterfaceAccount) {
	return (event: any) => {
		event.preventDefault();
		let newElement = element;
		newElement.order++;
		onSave(newElement);
	}
}


function onUp(onSave: typeFunctionSaveCategory, element: InterfaceCategory | InterfaceAccount) {
	return (event: any) => {
		event.preventDefault();
		let newElement = element;
		newElement.order--;
		onSave(newElement);
	}
}


interface InterfaceChangeOrderProps {
	element: InterfaceCategory | InterfaceAccount;
	onSave: typeFunctionSaveCategory | fnAccountsSave;
}

function ChangeOrder(props: InterfaceChangeOrderProps) {
	return (
		<ElChangeOrder>
			<ElChangeOrderUp onClick={onUp(props.onSave, props.element)}>-</ElChangeOrderUp>
			<ElChangeOrderDown onClick={onDown(props.onSave, props.element)}>+</ElChangeOrderDown>
		</ElChangeOrder>
	);
}

export default ChangeOrder;
