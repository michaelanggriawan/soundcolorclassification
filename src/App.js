import React, { useEffect, useState } from 'react';
import * as ml5 from 'ml5';

function App() {
	const model = 'https://teachablemachine.withgoogle.com/models/r0JTdmbDJ/';
	const probation = 0.7;
	const [label, setLabel] = useState('');
	const [confidence, setConfidence] = useState('');
	const [color, setColor] = useState('black');

	useEffect(() => {
		classifySound();
	}, []);

	const classifySound = async () => {
		const options = { probabilityThreshold: 0.7 };
		const classification = await ml5.soundClassifier(model + 'model.json', options);

		classification.classify((error, result) => {
			if (error) {
				console.error(error);
			}

			setLabel(result[0].label);
			setConfidence(result[0].confidence.toFixed(4));
		});
	};

	useEffect(() => {
		if (confidence > probation) {
			if (label === 'Merah') {
				setColor('red');
			} else if (label === 'Kuning') {
				setColor('yellow');
			} else if (label === 'Hijau') {
				setColor('green');
			} else {
				setColor('black');
			}
		}
	}, [confidence]);

	return (
		<div style={{ display: 'flex', flex: 1, height: '100vh', backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
			<h1 style={{ color: 'white' }}>Say Something - (Merah/Kuning/Hijau)</h1>
		</div>
	);
}

export default App;
