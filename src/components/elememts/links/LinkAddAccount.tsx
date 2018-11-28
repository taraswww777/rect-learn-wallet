import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceCategory} from "../../../types/InterfaceCategory";

const ElemLinkAddAccount = styled(Link)`
	color:green;
	border: 1px solid green;
	margin: 5px;
	padding: 5px;
	display: inline-block;
`;

interface InterfaceLinkAddAccountProps {
	categoryParent?: InterfaceCategory;
	children?: string;
}

function LinkAddAccount(props: InterfaceLinkAddAccountProps) {
	let link = `/admin/accounts/add`;
	let titleDefault = 'Add';

	return <ElemLinkAddAccount to={link}>{props.children || titleDefault} </ElemLinkAddAccount>;
}

export default LinkAddAccount;
