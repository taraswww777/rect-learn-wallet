import * as React from 'react';
import bem, {InterfaceBEMProps} from '../../bem';
import './DashboardAdmin.css';

class DashboardAdmin extends React.Component<InterfaceBEMProps> {
	public render() {
		return (
			<div className={this.props.bemBlock()}>
				<h1 className={this.props.bemElem('title')}>Dashboard Admin</h1>
			</div>
		);
	}
}

export default bem(DashboardAdmin, 'dashboard-admin');
