import * as React from 'react';
import styled from "styled-components";
import bem, {InterfaceBEMProps} from '../bem';

const StyledDashboardAdmin = styled.div``;
const StyledDashboardAdminTitle = styled.h1`
	color:red
`;

class DashboardAdmin extends React.Component<InterfaceBEMProps> {
	public render() {
		return (
			<StyledDashboardAdmin className="StyledDashboardAdmin">
				<StyledDashboardAdminTitle>Dashboard Admin</StyledDashboardAdminTitle>
			</StyledDashboardAdmin>
		);
	}
}

export default bem(DashboardAdmin, 'dashboard-admin');
