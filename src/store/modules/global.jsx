// global.jsx
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'global',
    initialState: {
        contentState: 'loading',
        cards: [], // 添加这一行
    },
    reducers: {
        setCards: (state, action) => {
            // 添加这个 reducer
            state.cards = action.payload;
        },
    },
});

export const { setCards } = slice.actions; // 从 slice 中导出新的 action

export default slice.reducer;
