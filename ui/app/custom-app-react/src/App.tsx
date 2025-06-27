import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {InputType, OrMwcInput} from "@openremote/or-mwc-components/or-mwc-input";
import "./App.css";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'or-mwc-input': OrMwcInput
		}
	}
}

function App() {
	const [count, setCount] = useState(0);

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
			</div>
			<p className="read-the-docs">
				Click on the Rspack and React logos to learn more
			</p>
			<or-mwc-input type={InputType.BUTTON} label="This is a button"></or-mwc-input>
		</div>
	);
}

export default App;
