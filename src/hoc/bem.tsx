import * as React from "react";

type TypeBlockFunction = (mod?: string, modValue?: string) => string;
type TypeElemFunction = (nameElement: string, mod?: string, modValue?: string) => string;

export interface InterfaceBEMProps {
	blockName: string,
	bemBlock: TypeBlockFunction,
	bemElem: TypeElemFunction,
}

function bem(ChildComponentClass: any, blockName: string) {
	return class Container extends React.Component <InterfaceBEMProps> {

		public bemBlock(mod?: string, modValue?: string) {
			let className = blockName;

			if (mod) {
				className += ' ' + blockName + '--' + mod;
				if (modValue) {
					className += '_' + modValue;
				}
			}

			return className;
		}

		public bemElem(nameElement: string, mod?: string, modValue?: string) {
			let className = blockName + '__' + nameElement;

			if (mod) {
				className += ' ' + blockName + '__' + nameElement + '--' + mod;
				if (modValue) {
					className += '_' + modValue;
				}
			}
			return className;
		}

		public render() {
			const props = {
				bemBlock: this.bemBlock,
				bemElem: this.bemElem,
				blockName,
			};


			return <ChildComponentClass {...this.props} {...props} />;
		}
	}
}

export default bem;
