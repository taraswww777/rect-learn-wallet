import * as React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {InterfaceCategory} from "../../../types/InterfaceCategory";

const ElemLinkAddRecord = styled(Link)`
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

function LinkAddRecord(props: InterfaceLinkAddAccountProps) {

	let link = `/records/add`;
	let titleDefault = 'Add';

	return <ElemLinkAddRecord to={link}>{props.children || titleDefault} </ElemLinkAddRecord>;
}

export default LinkAddRecord;
