import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import bem, {InterfaceBEMProps} from "../../../hoc/bem";
import "./AdminCategoriesList.css";
import AdminCategoriesListItem from "./AdminCategoriesListItem";


interface InterfaceAdminCategoriesList extends InterfaceBEMProps {
	categoryList: InterfaceCategory[];
}

function AdminCategoriesList(props: InterfaceAdminCategoriesList) {
	return (
		<div className={props.bemBlock()}>
			{props.categoryList.map((category: InterfaceCategory) => (
				<AdminCategoriesListItem key={category.id} category={category}/>
			))}
		</div>
	);
}

export default bem(AdminCategoriesList, 'admin-categories-list');

