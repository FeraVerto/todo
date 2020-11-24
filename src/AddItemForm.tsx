import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type AddItemPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    }

    const addOnKeyDownItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        } else if (e.key === "Escape") {
            setTitle("");
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle);
        } else {
            setError("А че так пусто?");
        }
        setTitle("");
    }

    return (
        <div className="todoListInput">
            <TextField value={title}
                       error={!!error}
                       label={"Title"}
                       helperText={error}
                       onChange={onTitleChangeHandler}
                       onKeyDown={addOnKeyDownItem}
                       variant={"outlined"}
            />
            {/*<button onClick={addItem}>+</button>*/}
{/*
            <Button onClick={addItem} variant={"contained"} color={"primary"}>+</Button>
*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
           {/* {error && <div className={"error-message"}>{error}</div>*/}
        </div>
    )
}