import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {dispatchAdminCategories, typeOnDelCatById} from "../../dispatches/dispatchAdminCategories";
import {
	STATUS_LOADING_CATEGORY_LIST_COMPLETE
} from "../../reducers/ReducerCategories";
import {typeFunction} from "../../types/Interfaces";
import AdminCategoriesList from "../elememts/AdminCategoriesList/AdminCategoriesList";
import LinkAddCategory from "../elememts/LinkAddCategory";
import Message from '../elememts/Message/Message';
import PreLoader from "../elememts/PreLoader";

const BlockAdminCategories = styled.div`width: 100%;`;

const ElementAdminCategoriesList = styled.div`width: 100%;`;


export interface InterfaceAdminCategoriesProps {
	loadListCategories: typeFunction;
	loadCategoryListStatus?: number;
	deletingCategoryStatus?: number;
	deletingCategoryReport?: any;
	onDelCatById: typeOnDelCatById;
	categoryList?: [];
}

class AdminCategories extends React.Component<InterfaceAdminCategoriesProps> {

	public componentDidMount() {
		this.props.loadListCategories();
	}

	public render() {
		return (
			<BlockAdminCategories>
				<ol>
					<li>
						<LinkAddCategory/>
					</li>
				</ol>

				<ElementAdminCategoriesList>
					{this.props.loadCategoryListStatus !== STATUS_LOADING_CATEGORY_LIST_COMPLETE ? <PreLoader/>
						: this.props.categoryList ? <AdminCategoriesList
								deletingCategoryReport={this.props.deletingCategoryReport}
								deletingCategoryStatus={this.props.deletingCategoryStatus}
								onDelCatById={this.props.onDelCatById} categoryList={this.props.categoryList}/>
							: <Message type={'danger'}>Empty categoryList</Message>}
				</ElementAdminCategoriesList>
			</BlockAdminCategories>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryList: state.ReducerCategories.categoryList,
		deletingCategoryReport: state.ReducerCategories.deletingCategoryReport,
		deletingCategoryStatus: state.ReducerCategories.deletingCategoryStatus,
		loadCategoryListStatus: state.ReducerCategories.loadCategoryListStatus,
	};
}


export default connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategories);
