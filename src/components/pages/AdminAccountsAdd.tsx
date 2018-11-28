import * as React from 'react';
import {connect} from "react-redux";
import dispatchAdminAccounts, {typeFunctionAddAccount} from "../../dispatches/dispatchAdminAccounts";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import AccountEditorForm from "../elememts/AccountEditorForm";


export interface InterfaceAdminCategoriesAdd {
	// saveAccount: typeFunctionSaveCategory;
	addAccount: typeFunctionAddAccount;
	savingAccountStatus?: number;
	accountItem?: InterfaceAccount | {};
}

class AdminAccountsAdd extends React.Component<InterfaceAdminCategoriesAdd> {

	public render() {
		return (
			<div>
				<h1>Add new account </h1>

				<AccountEditorForm
					onSave={this.props.addAccount}
					account={{name: '', order: 0}}/>
			</div>
		);
	}
}

function mapStateAppAdminAccountsAdd(state: any): object {
	return {
		accountItem: state.ReducerAccounts.accountItem,
		loadAccountsListStatus: state.ReducerAccounts.savingAccountStatus,
	};
}

export default connect(mapStateAppAdminAccountsAdd, dispatchAdminAccounts)(AdminAccountsAdd);
