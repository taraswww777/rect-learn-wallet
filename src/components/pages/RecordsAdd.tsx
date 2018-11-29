import * as React from 'react';
import {connect} from "react-redux";
import dispatchRecords, {InterfaceRecordsDispatcher} from "../../dispatches/dispatchRecords";
import {InterfaceRecord} from "../../types/InterfaceRecord";


export interface InterfaceAdminCategoriesAdd extends InterfaceRecordsDispatcher {
	// saveAccount: typeFunctionSaveCategory;
	// addRecord: fnRecordsAdd;
	// savingAccountStatus?: number;
	item?: InterfaceRecord | {};
}

class RecordsAdd extends React.Component<InterfaceAdminCategoriesAdd> {

	public render() {
		return (
			<div>
				<h1>Add new account </h1>
				{/* TODO: implements RecordsAdd */}
			</div>
		);
	}
}

function mapStateAppRecordsAdd(state: any): object {
	return {
		item: state.ReducerRecords.item,
	};
}

export default connect(mapStateAppRecordsAdd, dispatchRecords)(RecordsAdd);
