import * as React from 'react';
import bem, {InterfaceBEMProps} from "../../hoc/bem";
import LeftBar from "../LeftBar";
import './App.css';

class App extends React.Component <InterfaceBEMProps> {
	public render() {
		return (
			<div className={this.props.bemBlock()}>
				<div className={this.props.bemElem('container')}>
					<div className={this.props.bemElem('header')}>BlockAppHeader</div>

					<div className={this.props.bemElem('middle')}>
						<div className={this.props.bemElem('left-ber')}><LeftBar/></div>
						<div className={this.props.bemElem('main')}>{this.props.children}</div>
					</div>

					<div className={this.props.bemElem('footer')}>BlockAppFooter</div>
				</div>
			</div>
		);
	}
}

export default bem(App, 'app');
