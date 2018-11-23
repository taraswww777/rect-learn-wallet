import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import styled from "styled-components";
import AdminCategoriesListItem from "./AdminCategoriesListItem";

const BlockAdminCategoriesList = styled.div`
	width: 100%;
`;

interface InterfaceAdminCategoriesList {
	categoryList: InterfaceCategory[];
}

function AdminCategoriesList(props: InterfaceAdminCategoriesList) {
	return (
		<BlockAdminCategoriesList>
			{props.categoryList.map((category: InterfaceCategory) => (
				<AdminCategoriesListItem key={category.id} category={category}/>
			))}
		</BlockAdminCategoriesList>
	);
}

export default AdminCategoriesList;
