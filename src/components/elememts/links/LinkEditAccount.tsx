import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceAccount} from "../../../types/InterfaceAccount";

const ElemLinkEditAccount = styled(Link)`
	color: blue;
	border: 1px solid blue;
	margin: 5px;
	padding: 5px;
	display: inline-block;
`;

interface InterfaceLinkEditAccountProps {
	account: InterfaceAccount;
	children?: string;
}

function LinkEditAccount(props: InterfaceLinkEditAccountProps) {
	let link = `/admin/accounts/edit/${props.account.id}`;
	let titleDefault = 'Edit';

	return <ElemLinkEditAccount to={link}>{props.children || titleDefault}</ElemLinkEditAccount>;
}

export default LinkEditAccount;
