import * as React from 'react';
import {connect} from "react-redux";
import dispatchAdminAccounts, {InterfaceAdminAccountsDispatcher} from "../../dispatches/dispatchAdminAccounts";
import dispatchAdminCategories, {InterfaceAdminCategoriesDispatcher} from "../../dispatches/dispatchAdminCategories";
import dispatchCombine from "../../dispatches/dispatchCombine";
import dispatchRecords, {InterfaceRecordsDispatcher} from "../../dispatches/dispatchRecords";
import {STATUS_LOADING_ACCOUNTS_LIST_COMPLETE} from "../../reducers/ReducerAccounts";
import {STATUS_LOADING_CATEGORY_TREE_COMPLETE} from "../../reducers/ReducerCategories";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import {InterfaceCategoryTree} from "../../types/InterfaceCategory";
import {InterfaceRecord} from "../../types/InterfaceRecord";
import PreLoader from "../elememts/PreLoader";
import RecordsEditorForm from "../elememts/RecordsEditorForm";


export interface InterfaceAdminCategoriesAdd extends InterfaceMapStateAppRecordsAdd {
	dispatchRecords: InterfaceRecordsDispatcher;
	dispatchAdminAccounts: InterfaceAdminAccountsDispatcher;
	dispatchAdminCategories: InterfaceAdminCategoriesDispatcher;
}

class RecordsAdd extends React.Component<InterfaceAdminCategoriesAdd> {

	public render() {
		return (
			<div>
				<h1>Add new record </h1>
				{
					this.props.loadCategoryTreeStatus !== STATUS_LOADING_CATEGORY_TREE_COMPLETE ||
					this.props.loadAccountsListStatus !== STATUS_LOADING_ACCOUNTS_LIST_COMPLETE
						?
						<PreLoader/>
						:
						<RecordsEditorForm
							onSave={this.props.dispatchRecords.recordsAdd}
							record={{id: 0, type: 'inc', name: '', sum: 0, accountId: 0, categoryId: 0}}
							accountsList={this.props.accountsList}
							categoryTree={this.props.categoryTree}/>
				}
			</div>
		);
	}

	public componentDidMount() {
		this.props.dispatchAdminAccounts.loadAccountList();
		this.props.dispatchAdminCategories.loadTreeCategories();
	}
}

interface InterfaceMapStateAppRecordsAdd {
	recordsItem: InterfaceRecord | {};
	accountsList: InterfaceAccount[];
	categoryTree: InterfaceCategoryTree[];
	loadAccountsListStatus?: number;
	loadCategoryTreeStatus?: number;
}

function mapStateAppRecordsAdd(state: any): InterfaceMapStateAppRecordsAdd {
	return {
		accountsList: state.ReducerAccounts.accountsList,
		categoryTree: state.ReducerCategories.categoryTree,
		loadAccountsListStatus: state.ReducerAccounts.loadAccountsListStatus,
		loadCategoryTreeStatus: state.ReducerCategories.loadCategoryTreeStatus,
		recordsItem: state.ReducerRecords.item,
	};
}

export default connect(mapStateAppRecordsAdd,
	dispatchCombine([dispatchAdminAccounts, dispatchRecords, dispatchAdminCategories])
)(RecordsAdd);
