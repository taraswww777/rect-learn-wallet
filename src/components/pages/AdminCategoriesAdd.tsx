import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import dispatchAdminCategories, {
	typeFunctionAddCategory,
	typeFunctionLoadCategoryById,
	typeFunctionLoadTreeCategories,
	typeFunctionSaveCategory
} from "../../dispatches/dispatchAdminCategories";
import {
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS
} from "../../reducers/ReducerCategories";
import {InterfaceCategory, InterfaceCategoryTree} from "../../types/InterfaceCategory";
import CategoryEditorForm from "../elememts/CategoryEditorForm/CategoryEditorForm";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";


export interface InterfaceAdminCategoriesAdd extends RouteComponentProps {
	loadTreeCategories: typeFunctionLoadTreeCategories;
	loadCategoryById: typeFunctionLoadCategoryById;
	saveCategory: typeFunctionSaveCategory;
	addCategory: typeFunctionAddCategory;
	loadCategoryListStatus?: number;
	loadCategoryItemStatus?: number;
	savingCategoryStatus?: number;
	categoryTree?: InterfaceCategoryTree[];
	categoryItem?: InterfaceCategory | {};
}

class AdminCategoriesAdd extends React.Component<InterfaceAdminCategoriesAdd> {

	public componentDidMount() {
		this.props.loadTreeCategories();
	}

	public render() {
		const parentCategoryId = _.get(this.props, 'match.params.id') || 0;

		return (
			<div>
				<h1>Add new category</h1>
				{this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_IN_PROCESS ?
					<PreLoader/>
					:
					this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_COMPLETE &&
					<Message>Category add finished success</Message>
				}

				<CategoryEditorForm
					categoryTree={this.props.categoryTree}
					saveCategory={this.props.addCategory}
					category={{name: '', order: '', parentId: parentCategoryId}}
				/>

			</div>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryItem: state.ReducerCategories.categoryItem,
		categoryTree: state.ReducerCategories.categoryTree,
		loadCategoryItemStatus: state.ReducerCategories.loadCategoryItemStatus,
		loadCategoryListStatus: state.ReducerCategories.loadCategoryListStatus,
		savingCategoryStatus: state.ReducerCategories.savingCategoryStatus,
	};
}


export default withRouter(connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategoriesAdd));
