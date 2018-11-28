import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import dispatchAdminAccounts, {
	typeDeleteAccountById,
	typeFunctionLoadAccountsList,
	typeFunctionSaveAccount
} from "../../dispatches/dispatchAdminAccounts";
import {STATUS_LOADING_ACCOUNTS_LIST_COMPLETE} from "../../reducers/ReducerAccounts";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import AdminAccountsList from "../elememts/AdminAccountsList";
import LinkAddAccount from "../elememts/links/LinkAddAccount";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";

const StyledAdminAccounts = styled.div``;
const StyledAdminAccountsTitle = styled.div`color:red;`;
const StyledAdminAccountsBar = styled.div`display: flex;`;
const StyledAdminAccountsList = styled.div`display: flex; width: 100%;`;


interface InterfaceAdminAccountsProps {
	accountsList?: InterfaceAccount[];
	loadAccountsListStatus?: number;
	loadAccountList: typeFunctionLoadAccountsList;
	saveAccount: typeFunctionSaveAccount;
	deleteAccountById: typeDeleteAccountById;
}


class AdminAccounts extends React.Component <InterfaceAdminAccountsProps> {

	constructor(props: any) {
		super(props);

		this.props.saveAccount.bind(this);
	}

	public render() {
		return (
			<StyledAdminAccounts>
				<StyledAdminAccountsTitle>AdminAccounts</StyledAdminAccountsTitle>
				<StyledAdminAccountsBar><LinkAddAccount/></StyledAdminAccountsBar>
				<StyledAdminAccountsList>
					{this.props.loadAccountsListStatus !== STATUS_LOADING_ACCOUNTS_LIST_COMPLETE ?
						<PreLoader/>
						: this.props.accountsList && this.props.accountsList.length > 0 ?
							<AdminAccountsList
								accountsList={this.props.accountsList}
								deleteAccountById={this.props.deleteAccountById}
								saveAccount={this.props.saveAccount}/>
							: <Message type={'danger'}>Empty list accounts</Message>}
				</StyledAdminAccountsList>

			</StyledAdminAccounts>
		);
	}

	public componentDidMount() {
		this.props.loadAccountList();
	}

}

function mapStateAdminAccounts(state: any): object {
	console.log('state:', state);
	return {
		accountsList: state.ReducerAccounts.accountsList,
		loadAccountsListStatus: state.ReducerAccounts.loadAccountsListStatus,
	};
}

export default connect(mapStateAdminAccounts, dispatchAdminAccounts)(AdminAccounts);
