import React from 'react';
import {fake} from 'faker';
import usePagination from '../src/index';

const sampleData = [...Array(78)].map((o, i) =>
	fake(`${i} {{name.lastName}}, {{name.firstName}} {{name.suffix}}`),
);

const Component = () => {
	const {
		nextPage,
		previousPage,
		paginated,
		page,
		totalPages,
		firstPage,
		lastPage,
		setPerPage,
	} = usePagination(sampleData);

	return (
		<div>
			{paginated.map(p => (
				<div key={p}>{p}</div>
			))}

			<div>Current page: {page}</div>
			<div>Total pages: {totalPages}</div>
			<button onClick={firstPage}>First</button>
			<button onClick={previousPage}>Previous</button>
			<button onClick={nextPage}>Next</button>
			<button onClick={lastPage}>Last</button>
			<button onClick={() => setPerPage(10)}>10 per page</button>
			<button onClick={() => setPerPage(20)}>20 per page</button>
		</div>
	);
};

export default Component;
