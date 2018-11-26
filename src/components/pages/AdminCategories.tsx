import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {dispatchAdminCategories} from "../../dispatches/dispatchAdminCategories";
import {STATUS_LOADING_CATEGORY_LIST_COMPLETE} from "../../reducers/ReducerCategories";
import {typeFunction} from "../../types/Interfaces";
import AdminCategoriesList from "../elememts/AdminCategoriesList/AdminCategoriesList";
import Message from '../elememts/Message/Message';
import PreLoader from "../elememts/PreLoader";

const BlockAdminCategories = styled.div`width: 100%;`;

const ElementAdminCategoriesList = styled.div`width: 100%;`;


export interface InterfaceAdminCategoriesProps {
	loadListCategories: typeFunction;
	loadCategoryListStatus?: number;
	categoryList?: [];
}

class AdminCategories extends React.Component<InterfaceAdminCategoriesProps> {

	public componentDidMount() {
		this.props.loadListCategories();
	}

	public render() {
		return (
			<BlockAdminCategories>
				<ElementAdminCategoriesList>
					{this.props.loadCategoryListStatus !== STATUS_LOADING_CATEGORY_LIST_COMPLETE ? <PreLoader/>
						: this.props.categoryList ? <AdminCategoriesList categoryList={this.props.categoryList}/>
							: <Message type={'danger'}>empty categoryList</Message>}
				</ElementAdminCategoriesList>
			</BlockAdminCategories>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryList: state.ReducerFilms.categoryList,
		loadCategoryListStatus: state.ReducerFilms.loadCategoryListStatus,
	};
}


export default connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategories);
