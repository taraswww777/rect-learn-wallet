import axios from "axios";
import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";

import {BASE_URL_API} from '../../config';
import {ADMIN_CATEGORIES_SET_LIST, ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS} from "../../reducers/ReducerCategories";
import {TypeDispatch} from "../../types/InterfaceAction";
import {typeFunction} from "../../types/Interfaces";
import Message from '../Message';
import PreLoader from "../PreLoader";
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
		// store: state,
		categoryList: state.ReducerFilms.categoryList,
		loadCategoryListStatus: state.ReducerFilms.loadCategoryListStatus,
	};
}

function dispatchAdminCategories(dispatch: TypeDispatch) {
	return {
		loadListCategories: (): void => {
			const url = encodeURI(`${BASE_URL_API}/api/categories`);

			dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: true});

			axios.get(url)
				.then(response => response.data)
				.then(data => dispatch({type: ADMIN_CATEGORIES_SET_LIST, payload: data}))
				.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: true}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		},

	};
}


export default connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategories);
