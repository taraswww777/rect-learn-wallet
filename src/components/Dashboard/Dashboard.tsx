import * as React from 'react';
import bem, {InterfaceBEMProps} from '../../hoc/bem';
import './Dashboard.scss';
// import './Dashboard.css';


interface InterfaceDashboardProps extends InterfaceBEMProps {
	cont?: any
}

class Dashboard extends React.Component<InterfaceDashboardProps> {
	public render() {
		console.log('render Dashboard', this);
		return (
			<div className={this.props.bemBlock()}>
				<h1 className={this.props.bemElem('title')}>Dashboard</h1>
			</div>
		);
	}
}

export default bem(Dashboard, 'dashboard');
