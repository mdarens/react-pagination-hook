import {useCallback, useReducer} from 'react';
import {
	firstPage,
	lastPage,
	nextPage,
	previousPage,
	gotoPage,
	setPerPage,
	setData,
} from './actions';
import reducer from './reducer';
import {extractPage} from './helpers';

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
		paginated: extractPage(page, perPage, data),
	});

	return {
		firstPage: useCallback(() => {
			dispatch(firstPage());
		}, [dispatch, firstPage]),
		lastPage: () =>
			useCallback(() => {
				dispatch(lastPage());
			}, [dispatch, lastPage]),
		nextPage: () =>
			useCallback(() => {
				dispatch(nextPage());
			}, [dispatch, nextPage]),
		previousPage: useCallback(() => {
			dispatch(previousPage());
		}, [dispatch, previousPage]),
		gotoPage: useCallback(
			v => {
				dispatch(gotoPage(v));
			},
			[dispatch, gotoPage],
		),
		setPerPage: useCallback(
			v => {
				dispatch(setPerPage(v));
			},
			[dispatch, setPerPage],
		),
		setData: useCallback(
			v => {
				dispatch(setData(v));
			},
			[dispatch, setData],
		),
		totalPages: Math.ceil(data.length / state.perPage),
		paginated: state.paginated,
		page: state.page + 1,
		perPage: state.perPage,
	};
};

export default usePagination;
