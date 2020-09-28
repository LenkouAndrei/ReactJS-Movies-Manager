// const getCourses = state => next => action => {
//     if (typeof action.then !== 'function') {
//         return next(action)
//     }

// }

export const ping = (store: any) => (next: any) => (action: any) => {
    console.log(`Тип события: ${action.type}`);
    return next(action)
}