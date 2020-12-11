//User:
export type StateType = {
    name: string
    age: number
    childrenCount: number
}

//action:
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'CHANGE-NAME':
            return {...state, name: action.name};
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1};
        default:
            throw new Error("I don't understand this type")
    }
}