import {
	firstPage,
	lastPage,
	nextPage,
	previousPage,
	setPerPage,
} from './actions';

describe('actions', () => {
	test('firstPage', () => {
		expect(firstPage).toEqual(expect.any(Function));
	});

	test('lastPage', () => {
		expect(lastPage).toEqual(expect.any(Function));
	});

	test('nextPage', () => {
		expect(nextPage).toEqual(expect.any(Function));
	});

	test('previousPage', () => {
		expect(previousPage).toEqual(expect.any(Function));
	});

	test('setPerPage', () => {
		expect(setPerPage).toEqual(expect.any(Function));
	});
});
