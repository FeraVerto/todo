import AppWithRedux from "./AppWithRedux";
import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreRroviderDecorator";

export default {
    title: 'AppWithRedux  component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}