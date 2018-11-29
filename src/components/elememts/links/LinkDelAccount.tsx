import * as React from 'react';
import styled from 'styled-components';
import {fnAccountsDeleteById} from "../../../dispatches/dispatchAdminAccounts";
import {InterfaceAccount} from "../../../types/InterfaceAccount";

const ElemLinkDelAccount = styled.span`
	color:red;
	border: 1px solid red;
	margin: 5px;
	padding: 5px;
	display: inline-block;
	cursor: pointer;
`;

interface InterfaceLinkDelCategoryProps {
	children?: any;
	account: InterfaceAccount;
	deleteAccountById: fnAccountsDeleteById;
}

function onClickConfirm(deleteAccount: fnAccountsDeleteById, account: InterfaceAccount) {
	return () => {
		if (confirm(`Delete account "${account.name}"?`)) {
			deleteAccount(account.id);
		}
	}
}

function LinkDelAccount(props: InterfaceLinkDelCategoryProps) {

	let titleDefault = 'Del';

	return <ElemLinkDelAccount onClick={onClickConfirm(props.deleteAccountById, props.account)}>{props.children || titleDefault} </ElemLinkDelAccount>;
}

export default LinkDelAccount;
