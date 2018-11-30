import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import dispatchRecords, {InterfaceRecordsDispatcher} from "../../dispatches/dispatchRecords";
import {RECORDS_STATUS_LOADING_LIST_COMPLETE} from "../../reducers/ReducerRecords";
import {InterfaceRecord} from "../../types/InterfaceRecord";
import LinkAddRecord from "../elememts/links/LinkAddRecord";
import Message from "../elememts/Message/Message";
import PreLoader from "../elememts/PreLoader";
import RecordsList from "../elememts/RecordsList";

const StyledRecords = styled.div``;
const StyledRecordsTitle = styled.div`color:red;`;
const StyledRecordsBar = styled.div`display: flex;`;
const StyledRecordsList = styled.div`display: flex; width: 100%;`;


interface InterfaceRecordsProps extends InterfaceRecordsDispatcher, InterfaceMapStateRecords {

}


class Records extends React.Component <InterfaceRecordsProps> {
	public render() {
		console.log('this.props:', this.props);
		return (
			<StyledRecords>
				<StyledRecordsTitle>Records</StyledRecordsTitle>
				<StyledRecordsBar><LinkAddRecord/></StyledRecordsBar>
				<StyledRecordsList>
					{this.props.loadListStatus !== RECORDS_STATUS_LOADING_LIST_COMPLETE ?
						<PreLoader/>
						: this.props.list && this.props.list.length > 0 ?
							<RecordsList
								recordsList={this.props.list}
								recordsDelById={this.props.recordsDelById}
								recordsUpdate={this.props.recordsUpdate}/>
							: <Message type={'danger'}>Empty list accounts</Message>}
				</StyledRecordsList>
			</StyledRecords>
		);
	}

	public componentDidMount() {
		this.props.recordsLoadList();
	}
}

interface InterfaceMapStateRecords {
	list: InterfaceRecord[] | [],
	loadListStatus: number
}

function mapStateRecords(state: any): InterfaceMapStateRecords {
	return {
		list: state.ReducerRecords.list,
		loadListStatus: state.ReducerRecords.loadListStatus,
	};
}

export default connect(mapStateRecords, dispatchRecords)(Records);
