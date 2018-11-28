import * as React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import {
	dispatchAdminCategories,
	typeFunctionLoadTreeCategories,
	typeFunctionSaveCategory,
	typeOnDelCatById
} from "../../dispatches/dispatchAdminCategories";
import {STATUS_LOADING_CATEGORY_TREE_COMPLETE} from "../../reducers/ReducerCategories";
import {InterfaceCategoryTree} from "../../types/InterfaceCategory";
import AdminCategoriesTree from "../elememts/AdminCategoriesTree";
import LinkAddCategory from "../elememts/links/LinkAddCategory";
import Message from '../elememts/Message/Message';
import PreLoader from "../elememts/PreLoader";

const BlockAdminCategories = styled.div`width: 100%;`;

const ElementAdminCategoriesList = styled.div`width: 100%;`;


export interface InterfaceAdminCategoriesProps {
	loadTreeCategories: typeFunctionLoadTreeCategories;
	saveCategory: typeFunctionSaveCategory;
	loadCategoryTreeStatus?: number;
	deletingCategoryStatus?: number;
	deletingCategoryReport?: any;
	onDelCatById: typeOnDelCatById;
	categoryTree?: InterfaceCategoryTree[];
}

class AdminCategories extends React.Component<InterfaceAdminCategoriesProps> {

	public componentDidMount() {
		this.props.loadTreeCategories();
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
					{this.props.loadCategoryTreeStatus !== STATUS_LOADING_CATEGORY_TREE_COMPLETE ? <PreLoader/>
						: this.props.categoryTree ?
							<AdminCategoriesTree
								deletingCategoryReport={this.props.deletingCategoryReport}
								deletingCategoryStatus={this.props.deletingCategoryStatus}
								onDelCatById={this.props.onDelCatById}
								categoryList={this.props.categoryTree}
								saveCategory={this.props.saveCategory}/>
							: <Message type={'danger'}>Empty categoryList</Message>}
				</ElementAdminCategoriesList>
			</BlockAdminCategories>
		);
	}
}

function mapSPAdminCategories(state: any): object {
	return {
		categoryTree: state.ReducerCategories.categoryTree,
		deletingCategoryReport: state.ReducerCategories.deletingCategoryReport,
		deletingCategoryStatus: state.ReducerCategories.deletingCategoryStatus,
		loadCategoryTreeStatus: state.ReducerCategories.loadCategoryTreeStatus,
	};
}


export default connect(mapSPAdminCategories, dispatchAdminCategories)(AdminCategories);
