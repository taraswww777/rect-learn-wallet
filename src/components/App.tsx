import * as React from 'react';
import styled from "styled-components";
import LeftBar from "./elememts/LeftBar";

const ElApp = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	overflow: hidden;
	height: 100vh;
	min-height: 100vh;
	flex-direction: column;
`;

const ElAppHeader = styled.div`
	width: calc(100% - 100px);
	height: 80px;
	align-items: center;
	display: flex;
	background:#fff;
	border-bottom: 1px solid rgba(0,0,0,0.5);
`;

const ElAppLeftBar = styled.div`
	width: 100px;
	height: 100vh;
	overflow: hidden;
	background: rgba(0,128,0,0.5);
`;

const ElAppContent = styled.div`
	width: calc(100% - 100px);
	height: calc(100vh - 80px);
	overflow-y: auto;
	padding: 10px;
`;

interface InterfaceAppProps {
	children?: any;
}


function App(props: InterfaceAppProps) {
	return (
		<ElApp className="ElApp">
			<ElAppLeftBar className="ElAppLeftBar"><LeftBar/></ElAppLeftBar>
			<ElAppHeader className="ElAppHeader">ElAppHeader</ElAppHeader>
			<ElAppContent className="ElAppContent">{props.children}
			</ElAppContent>
		</ElApp>
	);
}

export default App;
