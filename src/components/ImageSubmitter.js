import React, { useEffect, useCallback } from 'react';

import './ImageSubmitter.css';

const ImageSubmitter = props => {
	useEffect(() => {
		const dragover = e => e.preventDefault();
		const drop = e => {
			e.preventDefault();
			props.process(e.dataTransfer.files);
		};

		document.addEventListener('dragover', dragover);
		document.addEventListener('drop', drop);
		return () => {
			document.removeEventListener('dragover', dragover);
			document.removeEventListener('drop', drop);
		};
	}, []);

	const handleSubmit = useCallback(e => {
		e.preventDefault();
		props.process(e.target.elements['images'].files);
	}, []);

	const handlePaste = useCallback(e => {
		props.process(e.clipboardData.files);
	}, []);

	return (
		<div className="image-submitter" tabIndex="0" onPaste={handlePaste}>
			<h2>Select images</h2>
			<ul className="t--info">
				<li>submit images from your computer using the form below; or</li>
				<li>drag & drop images on this page; or</li>
				<li>
					paste images from the clipboard <span className="focus-note"></span>
				</li>
			</ul>
			<form onSubmit={handleSubmit}>
				<p>
					<input type="file" name="images" multiple />
				</p>
				<button type="submit">Process files</button>
			</form>
		</div>
	);
};

export default ImageSubmitter;
