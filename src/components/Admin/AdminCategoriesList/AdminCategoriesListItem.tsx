import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import styled from "styled-components";
import AdminCategoriesList from "./AdminCategoriesList";


const BlockAdminCategoriesListItem = styled.div`
	width: 100%; 
	padding: 5px;
	background:gold;
	margin: 0 0 10px;
	
	&:last-child{
		margin: 0;
	}
`;

const ElemAdminCategoriesListItemName = styled.div`
	padding: 5px;
	background: skyblue;
`;

const ElemAdminCategoriesListItemChild = styled.div`
	padding-left: 10px;
	
	.ElemAdminCategoriesListItemName{
		margin: 0;
	}
`;

interface InterfaceAdminCategoriesListItemProps {
	category: InterfaceCategory;
}

function AdminCategoriesListItem(props: InterfaceAdminCategoriesListItemProps) {
	return (
		<BlockAdminCategoriesListItem>
			<ElemAdminCategoriesListItemName>{props.category.name}</ElemAdminCategoriesListItemName>

			{props.category.child && <ElemAdminCategoriesListItemChild>
				<AdminCategoriesList categoryList={props.category.child}/>
			</ElemAdminCategoriesListItemChild>}

		</BlockAdminCategoriesListItem>
	);
}

export default AdminCategoriesListItem;
