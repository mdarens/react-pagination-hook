import {useReducer} from 'react';
import {
	firstPage,
	lastPage,
	nextPage,
	previousPage,
	setPerPage,
} from './actions';
import reducer from './reducer';

const extractPage = ({data, perPage}, nextPage) =>
	data.slice(nextPage * perPage, (nextPage + 1) * perPage);

const usePagination = (data = [], opts) => {
	const {perPage, page} = {
		page: 0,
		perPage: 10,
		...opts,
	};
	const [state, dispatch] = useReducer(reducer, {
		data,
		page,
		perPage,
		paginated: extractPage({data, perPage}, page),
	});

	return {
		firstPage: () => dispatch(firstPage()),
		lastPage: () => dispatch(lastPage()),
		nextPage: () => dispatch(nextPage()),
		previousPage: () => dispatch(previousPage()),
		setPerPage: v => dispatch(setPerPage(v)),
		totalPages: Math.ceil(data.length / state.perPage),
		paginated: state.paginated,
		page: state.page + 1,
		perPage: state.perPage,
	};
};

export default usePagination;
