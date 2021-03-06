import * as _ from 'lodash';
import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {typeFunctionSaveCategory} from "../../../dispatches/dispatchAdminCategories";
import {InterfaceCategory, InterfaceCategoryTree} from "../../../types/InterfaceCategory";
import bem, {InterfaceBEMProps} from "../../bem";
import Input from '../form/Input';
import CategoriesSelect from "./CategoriesSelect";
import './CategoryEditorForm.css';

export interface InterfaceCategoryEditorFormProps extends InterfaceBEMProps, RouteComponentProps {
	category: InterfaceCategory
	saveCategory: typeFunctionSaveCategory,
	categoryTree: InterfaceCategoryTree[] | []
}


class CategoryEditorForm extends React.Component <InterfaceCategoryEditorFormProps> {
	public state = {
		category: {
			...this.props.category,
			name: this.props.category.name || '',
			order: this.props.category.order || 0,
			parentId: this.props.category.parentId || 0,
		}
	};

	public render() {
		const category = _.get(this.state, 'category');
		return (
			<form className={this.props.bemBlock()} onSubmit={this.onSave()}>
				{category &&
				<div className={this.props.bemElem('row')}>

					<div className={this.props.bemElem('ceil')}>
						<label className={this.props.bemElem('label')}>
							<div className={this.props.bemElem('title')}>name</div>
							<div className={this.props.bemElem('field')}>
								<Input
									name="name"
									value={category.name}
									onChange={this.onChange()}/>
							</div>

						</label>
					</div>

					<div className={this.props.bemElem('ceil')}>
						<label className={this.props.bemElem('label')}>
							<div className={this.props.bemElem('title')}>order</div>
							<div className={this.props.bemElem('field')}>
								<Input
									name="order"
									value={category.order}
									onChange={this.onChange()}/>
							</div>
						</label>
					</div>

					{this.props.categoryTree &&
					<div className={this.props.bemElem('ceil')}>
						<label className={this.props.bemElem('label')}>
							<div className={this.props.bemElem('title')}>parent category</div>
							<div className={this.props.bemElem('field')}>
								<CategoriesSelect
									name="parentId"
									categoryCurrent={category}
									categoryTree={this.props.categoryTree}
									onChange={this.onChange()}/>
							</div>
						</label>
					</div>}

					<div className={this.props.bemElem('ceil')}>
						<button className={this.props.bemElem('btn-save')}>save</button>
						<button onClick={this.onSaveBack()} className={this.props.bemElem('btn-save')}>save and back</button>
					</div>
				</div>
				}
			</form>
		);
	}

	public onChange() {
		return (event: Event | any): void => {
			this.state.category[event.target.name] = event.target.value;
			this.setState(this.state);
		}
	}

	public onSave() {
		return (event: Event | any): void => {
			event.preventDefault();
			this.props.saveCategory(this.state.category);
		}
	}

	public onSaveBack() {
		return (event: Event | any): void => {
			event.preventDefault();
			this.props.saveCategory(this.state.category);
			this.props.history.goBack();
		}
	}
}

export default bem(withRouter(CategoryEditorForm), 'category-editor-form');
