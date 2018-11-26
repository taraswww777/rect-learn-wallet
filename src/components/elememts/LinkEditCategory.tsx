import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceCategory} from "../../types/InterfaceCategory";

const ElemLinkEditCategory = styled(Link)`
	
`;

interface InterfaceLinkEditCategoryProps {
	category: InterfaceCategory;
	children?: string;
}

function LinkEditCategory(props: InterfaceLinkEditCategoryProps) {
	return <ElemLinkEditCategory to={`/admin/categories/editor/${props.category.id}`}>{props.children || 'Edit'}</ElemLinkEditCategory>;
}

export default LinkEditCategory;
