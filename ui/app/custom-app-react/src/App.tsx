import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import {InputType, OrMwcInput} from "@openremote/or-mwc-components/or-mwc-input";
import "./App.css";

/**
 * In React, for web components to be recognized, it's common to add each HTML tag in the JSX IntrinsicElements interface.
 * Be aware; your IDE might still not understand these web components correctly.
 */
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"or-mwc-input": OrMwcInput
		}
	}
}

function App() {
	const [count, setCount] = useState(0);
	const buttonRef = useRef(null);
	const handleButtonClick = () => setCount(count => count + 1);

	useEffect(() => {
		(buttonRef.current as any)?.addEventListener("or-mwc-input-changed", handleButtonClick);
		return () => {
			(buttonRef.current as any)?.removeEventListener("or-mwc-input-changed", handleButtonClick);
		};
	}, []);

	return (
		<div className="App">
			<div>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Rspack + React + TypeScript</h1>
			<div className="card">
				<button type="button" onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<or-mwc-input ref={buttonRef} type={InputType.BUTTON} outlined label="An OpenRemote button"></or-mwc-input>
			</div>
			<p className="read-the-docs">
				Click on the React logo to learn more
			</p>
		</div>
	);
}

export default App;
