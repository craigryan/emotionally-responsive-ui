import { useAppStore, useAppDispatch, useAppSelector } from './hooks';

describe('useAppStore', () => {
    it('should define the app store wrappers', () => {
        // import the hook to trigger the withTypes call
        require('./hooks');

        expect(useAppStore).toBeDefined();
        expect(useAppSelector).toBeDefined();
        expect(useAppDispatch).toBeDefined();
    });
});
