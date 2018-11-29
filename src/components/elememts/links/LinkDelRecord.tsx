import * as React from 'react';
import styled from 'styled-components';
import {fnAccountsDeleteById} from "../../../dispatches/dispatchAdminAccounts";
import {fnRecordsDeleteById} from "../../../dispatches/dispatchRecords";
import {InterfaceRecord} from "../../../types/InterfaceRecord";

const ElemLinkDelRecord = styled.span`
	color:red;
	border: 1px solid red;
	margin: 5px;
	padding: 5px;
	display: inline-block;
	cursor: pointer;
`;

interface InterfaceLinkDelRecordProps {
	children?: any;
	record: InterfaceRecord;
	recordsDelById: fnRecordsDeleteById;
}

function onClickConfirm(deleteAccount: fnAccountsDeleteById, record: InterfaceRecord) {
	return () => {
		if (confirm(`Delete record "${record.name}"?`)) {
			deleteAccount(record.id);
		}
	}
}

function LinkDelRecord(props: InterfaceLinkDelRecordProps) {

	let titleDefault = 'Del';

	return <ElemLinkDelRecord onClick={onClickConfirm(props.recordsDelById, props.record)}>{props.children || titleDefault} </ElemLinkDelRecord>;
}

export default LinkDelRecord;
