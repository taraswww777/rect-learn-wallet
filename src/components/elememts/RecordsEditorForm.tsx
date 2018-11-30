import * as _ from 'lodash';
import * as React from 'react';
import styled from "styled-components";
import {fnRecordsAdd, fnRecordsUpdate} from "../../dispatches/dispatchRecords";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import {InterfaceCategoryTree} from "../../types/InterfaceCategory";
import {InterfaceRecord} from "../../types/InterfaceRecord";
import Input from "./form/Input";
import SelectAccounts from "./form/SelectAccounts";
import SelectCategories from "./form/SelectCategories";


const StyledAccountEditorForm = styled.form``;
const StyledAccountEditorFormRow = styled.div``;
const StyledAccountEditorFormCeil = styled.div``;
const StyledAccountEditorFormLabel = styled.label``;
const StyledAccountEditorFormTitle = styled.div``;
const StyledAccountEditorFormField = styled.div``;
const StyledAccountEditorFormBtn = styled.button``;

export interface InterfaceRecordsEditorFormProps {
	record: InterfaceRecord | any;
	onSave: fnRecordsAdd | fnRecordsUpdate;
	accountsList: InterfaceAccount[];
	categoryTree: InterfaceCategoryTree[];
}

class RecordsEditorForm extends React.Component <InterfaceRecordsEditorFormProps> {
	public state = {
		record: {...this.props.record}
	};

	public render() {
		const record: InterfaceRecord = _.get(this.state, 'record');
		return (
			<StyledAccountEditorForm className="StyledAccountEditorForm" onSubmit={this.onSave()}>
				{record &&
				<StyledAccountEditorFormRow>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>name</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<Input
									name="name"
									value={record.name}
									onChange={this.onChange()}/>
							</StyledAccountEditorFormField>
						</StyledAccountEditorFormLabel>
					</StyledAccountEditorFormCeil>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>sum</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<Input
									name="sum"
									value={record.sum}
									onChange={this.onChange()}/>
							</StyledAccountEditorFormField>
						</StyledAccountEditorFormLabel>
					</StyledAccountEditorFormCeil>


					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>account</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<SelectAccounts
									name={'accountId'}
									onChange={this.onChange()}
									accountsList={this.props.accountsList}
									currentSelectedId={record.accountId || 0}/>
							</StyledAccountEditorFormField>
						</StyledAccountEditorFormLabel>
					</StyledAccountEditorFormCeil>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>category</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<SelectCategories
									name={'categoryId'}
									onChange={this.onChange()}
									currentSelectedId={record.categoryId || 0}
									categoryTree={this.props.categoryTree}/>
							</StyledAccountEditorFormField>
						</StyledAccountEditorFormLabel>
					</StyledAccountEditorFormCeil>

					<StyledAccountEditorFormCeil>
						<div>
							<StyledAccountEditorFormTitle>type</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<label><input type="radio" name="type" onChange={this.onChange()} checked={record.type === 'inc'} value={'inc'}/>inc</label>
								<label><input type="radio" name="type" onChange={this.onChange()} checked={record.type === 'dec'} value={'dec'}/>dec</label>
							</StyledAccountEditorFormField>
						</div>
					</StyledAccountEditorFormCeil>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormBtn>save</StyledAccountEditorFormBtn>
					</StyledAccountEditorFormCeil>
				</StyledAccountEditorFormRow>
				}
			</StyledAccountEditorForm>
		);
	}

	public onChange() {
		return (event: Event | any): void => {
			this.state.record[event.target.name] = event.target.value;
			this.setState(this.state);
		}
	}

	public onSave() {
		return (event: Event | any): void => {
			event.preventDefault();
			console.log('this.state.record', this.state.record);
			this.props.onSave(this.state.record);
		}
	}

}

export default RecordsEditorForm;
