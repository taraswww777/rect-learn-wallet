import * as React from 'react';
import bem, {InterfaceBEMProps} from '../../bem';
import Message from "../../elememts/Message/Message";
import './Dashboard.css';

class Dashboard extends React.Component<InterfaceBEMProps> {
	public render() {
		console.log('Dashboard this:', this);
		// noinspection RequiredAttributes
		return (
			<div className={this.props.bemBlock()}>
				<h1 className={this.props.bemElem('title')}>Dashboard</h1>
				<Message type={'success'} children={'sfw'}/>
			</div>
		);
	}
}

export default bem(Dashboard, 'dashboard');
