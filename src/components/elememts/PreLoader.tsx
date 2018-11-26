import * as React from 'react';
import styled from 'styled-components';
import logo from '../../logo.svg';

const ElemPreLoader = styled.div`
	text-decoration: none;
	color: #000;
	background: url(${logo}) no-repeat center center;
	transition: infiniti;
	width: 200px;
	height: 200px;
	min-width: 200px;
	min-height: 200px;
	max-width: 100%;
	margin: 0 auto;
	animation: main-rotate 5s infinite linear;
	
	@keyframes main-rotate {
		from{
			transform: rotate(0deg);
		}

	  to {
	    transform: rotate(360deg);
	  }
	}
`;

function PreLoader() {
	return <ElemPreLoader/>;
}


export default PreLoader;
