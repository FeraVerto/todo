import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'EditableSpan  component',
    component: EditableSpan
}

const changeCallback = action("Value changed")

//делаем акцент на контролируемом компоненте: то, что  извне передается
//должно всегда в компоненте отображаться, пока  извне мы не передадим что-то другое
export const EditableSpanBaseExample = () => {
    return (
        <EditableSpan value={"Start value"} onChange={changeCallback}/>
    )
}

