import React, { FC, FormEvent, useEffect, KeyboardEvent } from "react"
import { ymaps } from "../../../hooks/ymapsConstant";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { menuTexts } from "../../../texts/menutexts"


interface RefObject<T> {
    readonly current: T | null
}

interface Props {
    refValue: RefObject<HTMLInputElement>,
    pointVerify: (e:KeyboardEvent<HTMLInputElement>) => void;
    
}


export const AddressInput: FC<Props> = ({ refValue, pointVerify }) => {

    const { wrongPointError, isCorrectPoint } = useTypedSelector(state => state.points);

    // Suggesting options for an input field. 
    useEffect(() => {
        ymaps.ready(() => {
            const suggestView = new ymaps.SuggestView('suggest');
        })
    }, []);

    const cancelPageUpdating = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };


    return (
        <form onSubmit={e => cancelPageUpdating(e)}>
            <input
                id="suggest"
                className={`menuInput ${isCorrectPoint && "inputError"}`}
                placeholder={menuTexts.inputPointPlaceholder}
                ref={refValue}
                onKeyUp={(event) => pointVerify(event)}
            />
            <div className="pointErrorText">
                <p>{wrongPointError}</p>
            </div>

        </form>
    )
}