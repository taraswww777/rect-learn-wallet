import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import dispatchAdminAccounts, {
	typeFunctionLoadAccountById,
	typeFunctionSaveAccount
} from "../../dispatches/dispatchAdminAccounts";
import {STATUS_LOADING_ACCOUNT_ITEM_COMPLETE, STATUS_SAVING_ACCOUNT_COMPLETE, STATUS_SAVING_ACCOUNT_IN_PROCESS} from "../../reducers/ReducerAccounts";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import AccountEditorForm from "../elememts/AccountEditorForm";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";


export interface InterfaceAdminCategoriesEditorProps extends RouteComponentProps {
	accountItem?: InterfaceAccount | any;
	saveAccount: typeFunctionSaveAccount;
	loadAccountById: typeFunctionLoadAccountById;
	loadAccountItemStatus?: number;
	savingAccountStatus?: number;
}

class AdminAccountsEdit extends React.Component<InterfaceAdminCategoriesEditorProps> {

	public render() {
		console.log('this.props', this.props);

		return (
			<div>
				AdminAccountsEdit

				{this.props.loadAccountItemStatus !== STATUS_LOADING_ACCOUNT_ITEM_COMPLETE ?
					<PreLoader/>
					: this.props.accountItem && <div>
					<h1>Edit account "{this.props.accountItem.name}"</h1>
					{this.props.savingAccountStatus === STATUS_SAVING_ACCOUNT_IN_PROCESS ?
						<PreLoader/>
						:
						this.props.savingAccountStatus === STATUS_SAVING_ACCOUNT_COMPLETE &&
						<Message>Category "{this.props.accountItem.name}" saving finished success</Message>
					}

					<AccountEditorForm account={this.props.accountItem} onSave={this.props.saveAccount}/>

				</div>
				}
			</div>
		);
	}

	public componentDidMount() {
		const accountId = _.get(this.props, 'match.params.id');
		this.props.loadAccountById(accountId);
	}
}

function mapStateAppAdminAccountsEdit(state: any): object {
	return {
		accountItem: state.ReducerAccounts.accountItem,
		loadAccountItemStatus: state.ReducerAccounts.loadAccountItemStatus,
		savingAccountStatus: state.ReducerAccounts.savingAccountStatus,
	};
}


export default withRouter(connect(mapStateAppAdminAccountsEdit, dispatchAdminAccounts)(AdminAccountsEdit));
