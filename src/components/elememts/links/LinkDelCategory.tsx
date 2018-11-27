import * as React from 'react';
import styled from 'styled-components';
import {typeOnDelCatById} from "../../../dispatches/dispatchAdminCategories";
import {InterfaceCategory} from "../../../types/InterfaceCategory";

const ElemLinkDelCategory = styled.span`
	color:red;
	border: 1px solid red;
	margin: 5px;
	padding: 5px;
	display: inline-block;
	cursor: pointer;
`;

interface InterfaceLinkDelCategoryProps {
	category: InterfaceCategory;
	children?: string;
	onDelCatById: typeOnDelCatById
}

function onClickConfirm(onDelCatById: typeOnDelCatById, category: InterfaceCategory) {
	return () => {
		if (confirm(`Delete category "${category.name}"?`)) {
			onDelCatById(category);
		}
	}
}

function LinkDelCategory(props: InterfaceLinkDelCategoryProps) {

	let titleDefault = 'Del';

	return <ElemLinkDelCategory onClick={onClickConfirm(props.onDelCatById, props.category)}>{props.children || titleDefault} </ElemLinkDelCategory>;
}

export default LinkDelCategory;
