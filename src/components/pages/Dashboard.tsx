import * as React from 'react';
import styled from "styled-components";
import bem, {InterfaceBEMProps} from '../bem';
import Message from "../elememts/Message/Message";

const StyledDashboard = styled.div``;
const StyledDashboardTitle = styled.h1`
	color:red
`;

class Dashboard extends React.Component<InterfaceBEMProps> {
	public render() {
		return (
			<StyledDashboard className="StyledDashboard">
				<StyledDashboardTitle>Dashboard</StyledDashboardTitle>
				<Message type={'success'} children={'sfw'}/>
			</StyledDashboard>
		);
	}
}

export default bem(Dashboard, 'dashboard');
