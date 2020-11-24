import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpan = {
    title: string
    onChange: (title: string) => void
}

export function EditableSpan(props: EditableSpan) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    let activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }

    let onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    return editMode ?
        <TextField value={title}
                   onChange={onChangeTitleHandler}
                   onBlur={activateViewMode}
                   variant={"outlined"}
                   autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
