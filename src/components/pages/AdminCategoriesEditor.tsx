import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import dispatchAdminCategories, {
	typeFunctionLoadCategoryById,
	typeFunctionLoadTreeCategories,
	typeFunctionSaveCategory
} from "../../dispatches/dispatchAdminCategories";
import {
	STATUS_LOADING_CATEGORY_ITEM_COMPLETE,
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS
} from "../../reducers/ReducerCategories";
import {InterfaceCategory, InterfaceCategoryTree} from "../../types/InterfaceCategory";
import CategoryEditorForm from "../elememts/CategoryEditorForm/CategoryEditorForm";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";


export interface InterfaceAdminCategoriesEditorProps extends RouteComponentProps {
	loadTreeCategories: typeFunctionLoadTreeCategories;
	loadCategoryById: typeFunctionLoadCategoryById;
	saveCategory: typeFunctionSaveCategory;
	loadCategoryTreeStatus?: number;
	loadCategoryItemStatus?: number;
	savingCategoryStatus?: number;
	categoryTree?: InterfaceCategoryTree[];
	categoryItem?: InterfaceCategory;
}

class AdminCategoriesEditor extends React.Component<InterfaceAdminCategoriesEditorProps> {

	public componentDidMount() {
		const categoryId = _.get(this.props, 'match.params.id');
		this.props.loadTreeCategories();
		this.props.loadCategoryById(categoryId);
	}

	public render() {

		return (
			<div>
				{this.props.loadCategoryItemStatus !== STATUS_LOADING_CATEGORY_ITEM_COMPLETE ?
					<PreLoader/>
					: this.props.categoryItem && <div>
					<h1>Edit category "{this.props.categoryItem.name}"</h1>
					{this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_IN_PROCESS ?
						<PreLoader/>
						:
						this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_COMPLETE &&
						<Message>Category "{this.props.categoryItem.name}" saving finished success</Message>
					}

					<CategoryEditorForm
						saveCategory={this.props.saveCategory}
						category={this.props.categoryItem}
						categoryTree={this.props.categoryTree}/>

				</div>
				}
			</div>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryItem: state.ReducerCategories.categoryItem,
		categoryTree: state.ReducerCategories.categoryTree,
		loadCategoryItemStatus: state.ReducerCategories.loadCategoryItemStatus,
		loadCategoryTreeStatus: state.ReducerCategories.loadCategoryTreeStatus,
		savingCategoryStatus: state.ReducerCategories.savingCategoryStatus,
	};
}


export default withRouter(connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategoriesEditor));
