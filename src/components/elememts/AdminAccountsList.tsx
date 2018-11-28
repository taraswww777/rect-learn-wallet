import * as React from 'react';
import {InterfaceCategoryTree} from 'src/types/InterfaceCategory';
import styled from "styled-components";
import {typeDeleteAccountById, typeFunctionSaveAccount} from "../../dispatches/dispatchAdminAccounts";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import ChangeOrder from "./ChangeOrder";
import LinkDelAccount from "./links/LinkDelAccount";
import LinkEditAccount from "./links/LinkEditAccount";


const ElAdminAdminAccountsList = styled.div`
width: 100%;
`;
const ElAdminAdminAccountsListItem = styled.div`
	width: 100%;
	padding: 5px;
	background: gold;
	margin: 0 0 10px;
	
	&:last-child {
		margin: 0;
	}
`;
const ElAdminAdminAccountsListItemInfo = styled.div`
	padding: 5px;
	background: skyblue;
	display: flex;
	flex-wrap: wrap;
`;

const ElAdminAdminAccountsListItemName = styled.div`
	flex-grow: 1;
`;

interface InterfaceAdminCategoriesList {
	accountsList: InterfaceAccount[];
	deleteAccountById: typeDeleteAccountById;
	deletingAccountReport?: any;
	deletingAccountStatus?: any;
	saveAccount: typeFunctionSaveAccount;
}

function AdminAccountsList(props: InterfaceAdminCategoriesList) {
	return (
		<ElAdminAdminAccountsList className="ElAdminAdminAccountsList">
			{props.accountsList.map((account: InterfaceCategoryTree) => (

				<ElAdminAdminAccountsListItem className="ElAdminAdminAccountsListItem" key={account.id}>
					<ElAdminAdminAccountsListItemInfo>
						<ElAdminAdminAccountsListItemName>{account.order}: {account.name}</ElAdminAdminAccountsListItemName>
						<ChangeOrder element={account} onSave={props.saveAccount}/>
						<LinkEditAccount account={account}/>
						<LinkDelAccount deleteAccountById={props.deleteAccountById} account={account}/>
					</ElAdminAdminAccountsListItemInfo>


				</ElAdminAdminAccountsListItem>

			))}
		</ElAdminAdminAccountsList>
	);
}

export default AdminAccountsList;

