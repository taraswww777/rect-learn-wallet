import * as React from 'react';
import styled from "styled-components";
import {typeFunctionSaveAccount} from "../../dispatches/dispatchAdminAccounts";
import {typeFunctionSaveCategory} from "../../dispatches/dispatchAdminCategories";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import {InterfaceCategory} from "../../types/InterfaceCategory";

const ElChangeOrder = styled.div`
	text-align: center;
	display: flex;
	align-items: center;
	border:1px solid #000;
`;
const ElChangeOrderPlus = styled.div`
	cursor: pointer;
	padding: 5px;
  border:1px solid #000;
  border-radius: 50%;
  display: inline-block;
  width: 30px;
  height: 30px;
	    
	&:hover{
		font-weight: bold;
		background:rgba(255,255,255,0.5);
	}
`;
const ElChangeOrderMinus = styled(ElChangeOrderPlus)``;
const ElChangeOrderCurrent = styled.div`
	padding: 5px;
`;

function onPlus(onSave: typeFunctionSaveCategory, element: InterfaceCategory | InterfaceAccount) {
	return (event: any) => {
		event.preventDefault();
		let newElement = element;
		newElement.order++;
		onSave(newElement);
	}
}


function onMinus(onSave: typeFunctionSaveCategory, element: InterfaceCategory | InterfaceAccount) {
	return (event: any) => {
		event.preventDefault();
		let newElement = element;
		newElement.order--;
		onSave(newElement);
	}
}


interface InterfaceChangeOrderProps {
	element: InterfaceCategory | InterfaceAccount;
	onSave: typeFunctionSaveCategory | typeFunctionSaveAccount;
}

function ChangeOrder(props: InterfaceChangeOrderProps) {
	return (
		<ElChangeOrder>
			<ElChangeOrderPlus onClick={onPlus(props.onSave, props.element)}>+</ElChangeOrderPlus>
			<ElChangeOrderCurrent>{props.element.order}</ElChangeOrderCurrent>
			<ElChangeOrderMinus onClick={onMinus(props.onSave, props.element)}>-</ElChangeOrderMinus>
		</ElChangeOrder>
	);
}

export default ChangeOrder;
