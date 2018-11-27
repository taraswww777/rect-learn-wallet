import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {dispatchAdminCategories, typeFunctionSaveCategory} from "../../dispatches/dispatchAdminCategories";
import {InterfaceCategory} from "../../types/InterfaceCategory";

interface InterfaceChangeOrderProps {
	category: InterfaceCategory,
	saveCategory: typeFunctionSaveCategory
}

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

function onPlus(saveCategory: typeFunctionSaveCategory, category: InterfaceCategory) {
	return (event: any) => {
		event.preventDefault();
		let newCategory = category;
		newCategory.order++;
		saveCategory(newCategory);
	}
}


function onMinus(saveCategory: typeFunctionSaveCategory, category: InterfaceCategory) {
	return (event: any) => {
		event.preventDefault();
		let newCategory = category;
		newCategory.order--;
		saveCategory(newCategory);
	}
}

function ChangeOrder(props: InterfaceChangeOrderProps) {
	return (
		<ElChangeOrder>
			<ElChangeOrderPlus onClick={onPlus(props.saveCategory, props.category)}>+</ElChangeOrderPlus>
			<ElChangeOrderCurrent>{props.category.order}</ElChangeOrderCurrent>
			<ElChangeOrderMinus onClick={onMinus(props.saveCategory, props.category)}>-</ElChangeOrderMinus>
		</ElChangeOrder>
	);
}

function mapSPChangeOrder(state: any): object {
	return {
		categoryItem: state.ReducerCategories.categoryItem,
	};
}

export default connect(mapSPChangeOrder, dispatchAdminCategories)(ChangeOrder);
