import * as React from 'react';
import {InterfaceCategory} from 'src/types/InterfaceCategory';
import {typeOnDelCatById} from "../../../dispatches/dispatchAdminCategories";
import {STATUS_DELETING_CATEGORY_IN_PROCESS} from "../../../reducers/ReducerCategories";
import bem, {InterfaceBEMProps} from "../../bem";
import LinkAddCategory from "../LinkAddCategory";
import LinkDelCategory from "../LinkDelCategory";
import LinkEditCategory from "../LinkEditCategory";
import Message from "../Message/Message";
import PreLoader from "../PreLoader";
import AdminCategoriesList from "./AdminCategoriesList";


interface InterfaceAdminCategoriesListItemProps extends InterfaceBEMProps {
	category: InterfaceCategory;
	onDelCatById: typeOnDelCatById;
	deletingCategoryReport: any;
	deletingCategoryStatus: any;
}

class AdminCategoriesListItem extends React.Component <InterfaceAdminCategoriesListItemProps> {

	public componentDidUpdate() {
		if (this.props.deletingCategoryReport) {
			if (this.props.deletingCategoryReport.categoryId === this.props.category.id) {
				this.forceUpdate();
			}
		}
	}

	public render() {
		let isShowItem =
			(this.props.deletingCategoryReport && this.props.deletingCategoryReport.categoryId !== this.props.category.id) ||
			!this.props.deletingCategoryReport;

		return (
			<div className={this.props.bemBlock()}>
				{this.props.deletingCategoryStatus === STATUS_DELETING_CATEGORY_IN_PROCESS && <div className={this.props.bemElem('wrap')}><PreLoader/></div>}

				{this.props.deletingCategoryReport && this.props.deletingCategoryReport.categoryId === this.props.category.id &&
				<div className={this.props.bemElem('wrap')}><Message children={this.props.deletingCategoryReport.message}/></div>}

				{isShowItem &&
				<div className={this.props.bemElem('wrap')}>
					<div className={this.props.bemElem('name')}>
						{this.props.category.name}
						<LinkEditCategory category={this.props.category}/>
						<LinkAddCategory categoryParent={this.props.category}/>
						<LinkDelCategory onDelCatById={this.props.onDelCatById} category={this.props.category}/>
					</div>

					{this.props.category.child && <div className={this.props.bemElem('child')}>
						<AdminCategoriesList
							deletingCategoryReport={this.props.deletingCategoryReport}
							deletingCategoryStatus={this.props.deletingCategoryStatus}
							onDelCatById={this.props.onDelCatById}
							categoryList={this.props.category.child}/>
					</div>}
				</div>
				}

			</div>
		);
	}
}

export default bem(AdminCategoriesListItem, 'admin-categories-list-item');
