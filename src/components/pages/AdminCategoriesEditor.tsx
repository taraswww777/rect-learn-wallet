import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {
	dispatchAdminCategories,
	typeFunctionLoadCategoryById,
	typeFunctionLoadListCategories,
	typeFunctionSaveCategory
} from "../../dispatches/dispatchAdminCategories";
import {
	STATUS_LOADING_CATEGORY_ITEM_COMPLETE,
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS
} from "../../reducers/ReducerCategories";
import {InterfaceCategory} from "../../types/InterfaceCategory";
import CategoryEditorForm from "../elememts/CategoryEditorForm/CategoryEditorForm";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";


export interface InterfaceAdminCategoriesEditorProps extends RouteComponentProps {
	loadListCategories: typeFunctionLoadListCategories;
	loadCategoryById: typeFunctionLoadCategoryById;
	saveCategory: typeFunctionSaveCategory;
	loadCategoryListStatus?: number;
	loadCategoryItemStatus?: number;
	savingCategoryStatus?: number;
	categoryList?: InterfaceCategory[];
	categoryItem?: InterfaceCategory | any;
}

class AdminCategoriesEditor extends React.Component<InterfaceAdminCategoriesEditorProps> {

	public componentDidMount() {
		const categoryId = _.get(this.props, 'match.params.id');
		this.props.loadListCategories();
		this.props.loadCategoryById(categoryId);
	}

	public render() {
		console.log('this.props.savingCategoryStatus', this.props.savingCategoryStatus);

		return (
			<div>
				{this.props.loadCategoryItemStatus !== STATUS_LOADING_CATEGORY_ITEM_COMPLETE ?
					<PreLoader/>
					: this.props.categoryItem && <div>
					<h1>Edit category "{this.props.categoryItem.name}"</h1>
					{this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_IN_PROCESS ?
						<PreLoader/>
						:
						this.props.savingCategoryStatus === STATUS_SAVING_CATEGORY_COMPLETE ?
							<Message>Category "{this.props.categoryItem.name}" saving finished success</Message>
							:
							<CategoryEditorForm
								saveCategory={this.props.saveCategory}
								category={this.props.categoryItem}
								categoryList={this.props.categoryList}/>
					}
				</div>
				}
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


export default withRouter(connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategoriesEditor));
