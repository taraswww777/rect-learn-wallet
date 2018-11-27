import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceCategory} from "../../../types/InterfaceCategory";

const ElemLinkAddCategory = styled(Link)`
	color:green;
	border: 1px solid green;
	margin: 5px;
	padding: 5px;
	display: inline-block;
`;

interface InterfaceLinkEditCategoryProps {
	categoryParent?: InterfaceCategory;
	children?: string;
}

function LinkAddCategory(props: InterfaceLinkEditCategoryProps) {
	let link = `/admin/categories/add`;
	let titleDefault = 'Add';
	if (props.categoryParent) {
		link += '/' + props.categoryParent.id;
	}

	return <ElemLinkAddCategory to={link}>{props.children || titleDefault} </ElemLinkAddCategory>;
}

export default LinkAddCategory;
