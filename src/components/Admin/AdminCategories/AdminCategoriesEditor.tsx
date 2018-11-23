import * as _ from 'lodash';
import * as React from 'react';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {dispatchAdminCategories, typeFunctionLoadCategoryById, typeFunctionLoadListCategories} from "../../../dispatches/dispatchAdminCategories";
import {InterfaceCategory} from "../../../types/InterfaceCategory";
import PreLoader from "../../PreLoader";


export interface InterfaceAdminCategoriesEditorProps extends RouteComponentProps {
	loadListCategories: typeFunctionLoadListCategories;
	loadCategoryById: typeFunctionLoadCategoryById;
	loadCategoryListStatus?: boolean;
	loadCategoryItemStatus?: boolean;
	categoryList?: InterfaceCategory[];
	categoryItem?: InterfaceCategory | any;
}

class AdminCategoriesEditor extends React.Component<InterfaceAdminCategoriesEditorProps> {

	public componentDidMount() {
		const categoryId = _.get(this.props, 'match.params.id');
		this.props.loadListCategories();
		this.props.loadCategoryById(categoryId);
	}

	public render() {
		// console.log('this.props: ', this.props);
		return (
			<div>
				{!this.props.loadCategoryItemStatus ?
					<PreLoader/>
					: this.props.categoryItem && <div>
					{JSON.stringify(this.props.categoryItem)}
				</div>}
			</div>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryItem: state.ReducerFilms.categoryItem,
		categoryList: state.ReducerFilms.categoryList,
		loadCategoryItemStatus: state.ReducerFilms.loadCategoryItemStatus,
		loadCategoryListStatus: state.ReducerFilms.loadCategoryListStatus,
	};
}


export default withRouter(connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategoriesEditor));
