//Reducers
//Actions describe the fact that something happened,
//but don't specify how the application's state changes in response.
//This is the job of reducers

//当action传入dispatch会立即触发reducer
export default function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return state + 1;
        case 'DECREMENT_COUNTER':
            return state - 1;
        default:
            return state
    }
};
