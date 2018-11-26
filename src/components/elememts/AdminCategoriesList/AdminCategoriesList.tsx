import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import {typeOnDelCatById} from "../../../dispatches/dispatchAdminCategories";
import bem, {InterfaceBEMProps} from "../../bem";
import "./AdminCategoriesList.css";
import AdminCategoriesListItem from "./AdminCategoriesListItem";


interface InterfaceAdminCategoriesList extends InterfaceBEMProps {
	categoryList: InterfaceCategory[];
	onDelCatById: typeOnDelCatById;
	deletingCategoryReport:any;
	deletingCategoryStatus:any;
}

function AdminCategoriesList(props: InterfaceAdminCategoriesList) {
	return (
		<div className={props.bemBlock()}>
			{props.categoryList.map((category: InterfaceCategory) => (
				<AdminCategoriesListItem
					deletingCategoryReport={props.deletingCategoryReport}
					deletingCategoryStatus={props.deletingCategoryStatus}
					onDelCatById={props.onDelCatById} key={category.id} category={category}/>
			))}
		</div>
	);
}

export default bem(AdminCategoriesList, 'admin-categories-list');

