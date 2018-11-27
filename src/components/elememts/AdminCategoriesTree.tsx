import * as React from 'react';
import {InterfaceCategoryTree} from 'src/types/InterfaceCategory';
import styled from "styled-components";
import {typeOnDelCatById} from "../../dispatches/dispatchAdminCategories";
import LinkAddCategory from "./links/LinkAddCategory";
import LinkDelCategory from "./links/LinkDelCategory";
import LinkEditCategory from "./links/LinkEditCategory";


interface InterfaceAdminCategoriesList {
	categoryList: InterfaceCategoryTree[];
	onDelCatById: typeOnDelCatById;
	deletingCategoryReport: any;
	deletingCategoryStatus: any;
}


const ElAdminCategoriesTree = styled.div`
width: 100%;
`;
const ElAdminCategoriesTreeItem = styled.div`
	width: 100%;
	padding: 5px;
	background: gold;
	margin: 0 0 10px;
	
	&:last-child {
		margin: 0;
	}
`;
const ElAdminCategoriesTreeItemInfo = styled.div`
	padding: 5px;
	background: skyblue;
	display: flex;
	flex-wrap: wrap;
`;

const ElAdminCategoriesTreeItemName = styled.div`
	flex-grow: 1;
`;
const ElAdminCategoriesTreeItemChild = styled.div`
	padding-left: 10px;
	padding-top: 5px;
	
	${ElAdminCategoriesTree}{
		margin: 0;
		padding-right: 0;
	}
`;

function AdminCategoriesTree(props: InterfaceAdminCategoriesList) {
	return (
		<ElAdminCategoriesTree className="ElAdminCategoriesTree">
			{props.categoryList.map((category: InterfaceCategoryTree) => (

				<ElAdminCategoriesTreeItem className="ElAdminCategoriesTreeItem" key={category.id}>
					<ElAdminCategoriesTreeItemInfo>
						<ElAdminCategoriesTreeItemName>{category.order}: {category.name}</ElAdminCategoriesTreeItemName>
						<LinkEditCategory category={category}/>
						<LinkAddCategory categoryParent={category}/>
						<LinkDelCategory onDelCatById={props.onDelCatById} category={category}/>
					</ElAdminCategoriesTreeItemInfo>

					{category.child && <ElAdminCategoriesTreeItemChild className="ElAdminCategoriesTreeItemChild">
						<AdminCategoriesTree
							deletingCategoryReport={props.deletingCategoryReport}
							deletingCategoryStatus={props.deletingCategoryStatus}
							onDelCatById={props.onDelCatById}
							categoryList={category.child}/>
					</ElAdminCategoriesTreeItemChild>}

				</ElAdminCategoriesTreeItem>

			))}
		</ElAdminCategoriesTree>
	);
}

export default AdminCategoriesTree;

