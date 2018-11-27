import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {
	dispatchAdminCategories, typeFunctionAddCategory,
	typeFunctionLoadCategoryById,
	typeFunctionLoadListCategories,
	typeFunctionSaveCategory
} from "../../dispatches/dispatchAdminCategories";
import {
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS
} from "../../reducers/ReducerCategories";
import {InterfaceCategory} from "../../types/InterfaceCategory";
import CategoryEditorForm from "../elememts/CategoryEditorForm/CategoryEditorForm";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";


export interface InterfaceAdminCategoriesAdd extends RouteComponentProps {
	loadListCategories: typeFunctionLoadListCategories;
	loadCategoryById: typeFunctionLoadCategoryById;
	saveCategory: typeFunctionSaveCategory;
	addCategory: typeFunctionAddCategory;
	loadCategoryListStatus?: number;
	loadCategoryItemStatus?: number;
	savingCategoryStatus?: number;
	categoryList?: InterfaceCategory[];
	categoryItem?: InterfaceCategory | any;
}

class AdminCategoriesAdd extends React.Component<InterfaceAdminCategoriesAdd> {

	public componentDidMount() {
		this.props.loadListCategories();
	}

	public render() {
		const parentCategoryId = _.get(this.props, 'match.params.id');

		console.log('this.props.savingCategoryStatus', this.props.savingCategoryStatus);

		return (
			<div>
				AdminCategoriesAdd
				<h1>Add category</h1>
				{this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_IN_PROCESS ?
					<PreLoader/>
					:
					this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_COMPLETE &&
					<Message>Category add finished success</Message>
				}

				<CategoryEditorForm
					loadListCategories={this.props.loadListCategories}
					saveCategory={this.props.addCategory}
					category={{name: '', order: '', parentId: parentCategoryId}}
					categoryList={this.props.categoryList}/>

			</div>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryItem: state.ReducerCategories.categoryItem,
		categoryList: state.ReducerCategories.categoryList,
		loadCategoryItemStatus: state.ReducerCategories.loadCategoryItemStatus,
		loadCategoryListStatus: state.ReducerCategories.loadCategoryListStatus,
		savingCategoryStatus: state.ReducerCategories.savingCategoryStatus,
	};
}


export default withRouter(connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategoriesAdd));
