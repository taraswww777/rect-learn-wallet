import * as React from 'react';
import styled from "styled-components";
import {fnRecordsDeleteById, fnRecordsUpdate} from "../../dispatches/dispatchRecords";
import {InterfaceRecord} from "../../types/InterfaceRecord";
import LinkDelRecord from "./links/LinkDelRecord";


const ElRecordsListList = styled.div`
width: 100%;
`;
const ElRecordsListListItem = styled.div`
	width: 100%;
	padding: 5px;
	background: gold;
	margin: 0 0 10px;
	
	&:last-child {
		margin: 0;
	}
`;
const ElRecordsListListItemInfo = styled.div`
	padding: 5px;
	background: skyblue;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const ElRecordsListListItemName = styled.div`
	flex-grow: 1;
`;

interface InterfaceRecordsListProps {
	recordsList: InterfaceRecord[];
	recordsDelById: fnRecordsDeleteById;
	recordsUpdate: fnRecordsUpdate;
}

function RecordsList(props: InterfaceRecordsListProps) {
	return (
		<ElRecordsListList>
			{props.recordsList.map((record: InterfaceRecord) => (
				<ElRecordsListListItem key={record.id}>
					<ElRecordsListListItemInfo>
						<ElRecordsListListItemName>{record.name}</ElRecordsListListItemName>
						<LinkDelRecord recordsDelById={props.recordsDelById} record={record}/>
					</ElRecordsListListItemInfo>
				</ElRecordsListListItem>
			))}
		</ElRecordsListList>
	);
}

export default RecordsList;
