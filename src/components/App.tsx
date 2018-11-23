import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import styled from "styled-components";
import LeftBar from "./LeftBar";

const BlockApp = styled.div``;
const BlockAppContainer = styled.div`
	width: 100vw;
	overflow: hidden;
	height: 100vh;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
`;
const BlockAppHeader = styled.div`
	width: 100%;
	padding: 5px;
	background:green;
`;
const BlockAppFooter = styled.div`
	width: 100%;
	padding: 5px;
	background:green;
`;

const BlockAppMiddle = styled.div`
	flex-grow: 1;
	display: flex;
`;
const BlockAppLeftBar = styled.div`
	width: 15%;
	padding: 10px;
`;
const BlockAppMain = styled.div`
	width: 85%;
	padding: 10px;
	background:gray;
`;

class App extends React.Component <RouteComponentProps> {
	public render() {
		return (
			<BlockApp>
				<BlockAppContainer>
					<BlockAppHeader>BlockAppHeader</BlockAppHeader>

					<BlockAppMiddle>
						<BlockAppLeftBar><LeftBar/></BlockAppLeftBar>
						<BlockAppMain>{this.props.children}</BlockAppMain>
					</BlockAppMiddle>

					<BlockAppFooter>BlockAppFooter</BlockAppFooter>
				</BlockAppContainer>
			</BlockApp>
		);
	}
}

export default withRouter(App);
