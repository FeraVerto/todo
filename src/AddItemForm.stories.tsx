import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm",
    component: AddItemForm
}

const callback = action("Button 'add' was pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AddItemForm addItem={callback}/>
    )
}