import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {dispatchAdminCategories} from "../../../dispatches/dispatchAdminCategories";
import {typeFunction} from "../../../types/Interfaces";
import Message from '../../Message/Message';
import PreLoader from "../../PreLoader";
import AdminCategoriesList from "./AdminCategoriesList/AdminCategoriesList";

const BlockAdminCategories = styled.div`width: 100%;`;

const ElementAdminCategoriesList = styled.div`width: 100%;`;


export interface InterfaceAdminCategoriesProps {
	loadListCategories: typeFunction;
	loadCategoryListStatus?: boolean;
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
					{!this.props.loadCategoryListStatus ? <PreLoader/>
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
