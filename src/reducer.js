import {createReducer, when} from '@mariosant/imm';

const {max, min, ceil} = Math;

const getTotalPages = ({data, perPage}) => ceil(data.length / perPage) - 1;

const getNextPage = ({data, page, perPage}) =>
	min(Math.ceil(data.length / perPage) - 1, page + 1);

const getPreviousPage = ({page}) => max(0, page - 1);

const extractPage = ({data, perPage}, page) => {
	const from = page * perPage;
	const to = (page + 1) * perPage;

	return data.slice(from, to);
};

const reducer = createReducer(
	when('FIRST_PAGE', state => ({
		...state,
		page: 0,
		paginated: extractPage(state, 0),
	})),
	when('LAST_PAGE', state => ({
		...state,
		page: getTotalPages(state),
		paginated: extractPage(state, getTotalPages(state)),
	})),
	when('NEXT_PAGE', state => ({
		...state,
		page: getNextPage(state),
		paginated: extractPage(state, getNextPage(state)),
	})),
	when('PREVIOUS_PAGE', state => ({
		...state,
		page: getPreviousPage(state),
		paginated: extractPage(state, getPreviousPage(state)),
	})),
	when('PER_PAGE', (state, {payload}) => ({
		...state,
		perPage: payload,
		page: min(state.page, getTotalPages({data: state.data, perPage: payload})),
		paginated: extractPage(
			{...state, perPage: payload},
			min(state.page, getTotalPages({data: state.data, perPage: payload})),
		),
	})),
);

export default reducer;
