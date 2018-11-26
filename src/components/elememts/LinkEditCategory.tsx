import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceCategory} from "../../types/InterfaceCategory";

const ElemLinkEditCategory = styled(Link)`
	color: blue;
	border: 1px solid blue;
	margin: 5px;
	padding: 5px;
	display: inline-block;
`;

interface InterfaceLinkEditCategoryProps {
	category: InterfaceCategory;
	children?: string;
}
// TODO: CREATE
function LinkEditCategory(props: InterfaceLinkEditCategoryProps) {
	return <ElemLinkEditCategory to={`/admin/categories/editor/${props.category.id}`}>{props.children || 'Edit'}</ElemLinkEditCategory>;
}

export default LinkEditCategory;
