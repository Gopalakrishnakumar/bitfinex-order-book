const cacheLoader = key => ({getState}) => {
    return next => action => {
        let result = next(action);
        sessionStorage.setItem(key, JSON.stringify(getState()));
        return result;
    }
}

export default cacheLoader;