import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import cards from "./features/cards/cardsReducer";
import gameReducer from "./features/game/gameReducer";
import inGameReducer from "./features/ingame/inGameReducer";
const reducers = combineReducers({
    cards,
    gameReducer,
    inGameReducer
});
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
