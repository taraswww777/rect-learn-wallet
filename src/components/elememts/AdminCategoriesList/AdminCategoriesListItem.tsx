import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import bem, {InterfaceBEMProps} from "../../bem";
import LinkEditCategory from "../LinkEditCategory";
import AdminCategoriesList from "./AdminCategoriesList";


interface InterfaceAdminCategoriesListItemProps extends InterfaceBEMProps {
	category: InterfaceCategory;
}

function AdminCategoriesListItem(props: InterfaceAdminCategoriesListItemProps) {
	// noinspection RequiredAttributes
	return (
		<div className={props.bemBlock()}>
			<div className={props.bemElem('name')}>
				{props.category.name}
				<LinkEditCategory category={props.category}/>
			</div>

			{props.category.child && <div className={props.bemElem('child')}>
				<AdminCategoriesList categoryList={props.category.child}/>
			</div>}

		</div>
	);
}

export default bem(AdminCategoriesListItem, 'admin-categories-list-item');
