import * as _ from 'lodash';
import * as React from 'react';
import styled from "styled-components";
import {fnAccountsSave} from "../../dispatches/dispatchAdminAccounts";
import {InterfaceAccount} from "../../types/InterfaceAccount";
import Input from "./form/Input";


const StyledAccountEditorForm = styled.form``;
const StyledAccountEditorFormRow = styled.div``;
const StyledAccountEditorFormCeil = styled.div``;
const StyledAccountEditorFormLabel = styled.label``;
const StyledAccountEditorFormTitle = styled.div``;
const StyledAccountEditorFormField = styled.div``;
const StyledAccountEditorFormBtn = styled.button``;

export interface InterfaceCategoryEditorFormProps {
	account: InterfaceAccount | any;
	onSave: fnAccountsSave;
}


class AccountEditorForm extends React.Component <InterfaceCategoryEditorFormProps> {
	public state = {
		account: {
			...this.props.account,
			name: this.props.account.name || '',
			order: this.props.account.order || 0,
		}
	};

	public render() {
		const account = _.get(this.state, 'account');
		return (
			<StyledAccountEditorForm className="StyledAccountEditorForm" onSubmit={this.onSave()}>
				{account &&
				<StyledAccountEditorFormRow>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>name</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<Input
									type="text"
									name="name"
									value={account.name}
									onChange={this.onChange()}/>
							</StyledAccountEditorFormField>

						</StyledAccountEditorFormLabel>
					</StyledAccountEditorFormCeil>

					<StyledAccountEditorFormCeil>
						<StyledAccountEditorFormLabel>
							<StyledAccountEditorFormTitle>order</StyledAccountEditorFormTitle>
							<StyledAccountEditorFormField>
								<Input
									type="text"
									name="order"
									value={account.order}
									onChange={this.onChange()}/>
							</StyledAccountEditorFormField>
						</StyledAccountEditorFormLabel>
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
			this.state.account[event.target.name] = event.target.value;
			this.setState(this.state);
		}
	}

	public onSave() {
		return (event: Event | any): void => {
			event.preventDefault();
			this.props.onSave(this.state.account);
		}
	}

}

export default AccountEditorForm;
