import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { ToDoService } from './../providers/todoService';
import { Injectable } from '@angular/core'



import { Reducer, Action } from '@ngrx/store';

export const TodoActions = {
    FETCH_TODOS: 'FETCH_TODOS',
    FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
    FETCH_TODOS_ERROR: 'FETCH_TODOS_ERROR',
}

var fetchToDosReducer = (state, action) => {
    return Object.assign({}, state, { inProgress: true, data: [] })
}

var fetchToDosSuccessReducer = (state, action) => {
    return Object.assign({}, state, { inProgress: false, data: action.payload })
}

export const TodoReducer: any = (state = {}, action: Action) => {
    console.log(state, action)
    switch (action.type) {

        case TodoActions.FETCH_TODOS: {
            return fetchToDosReducer(state, action)
        }
        case TodoActions.FETCH_TODOS_SUCCESS: {
            return fetchToDosSuccessReducer(state, action)
        }
        case TodoActions.FETCH_TODOS_ERROR: {
            return Object.assign({}, state, { inProgress: false, error: action.payload })
        }

        default:
            return state;
    }

}

@Injectable()
export class TodoEffects {
    constructor(
        private todoService: ToDoService,
        private actions$: Actions
    ) { }


    @Effect() fetchTodos$ = this.actions$
        // Listen for the 'LOGIN' action
        .ofType(TodoActions.FETCH_TODOS)
        // Map the payload into JSON to use as the request body
        //.map(action => JSON.stringify(action.payload))
        .switchMap(action => this.todoService.getAllItems())
        // If successful, dispatch success action with result
        .map((res: any) => {
            if (res) {
                return { type: TodoActions.FETCH_TODOS_SUCCESS, payload: res }
            } else {
                return { type: TodoActions.FETCH_TODOS_SUCCESS, payload: [] }
            }
        }).share(); 
}
