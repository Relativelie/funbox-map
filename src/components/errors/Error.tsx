import { FC, useState, useEffect } from 'react';

import { errorTexts } from './errorTexts';
import './Error.scss';

interface Props {
    errorType: [string, number | null];
}

export const Error: FC<Props> = ({ errorType }) => {
    const [error, setError] = useState('');

    useEffect(() => {
        if (errorType[0] === 'fatal') {
            setError(errorTexts.fatal);
        } else setError(`${errorTexts.error} ${errorType[1]}`);
    }, [errorType]);

    return (
        <div className="errorContainer">
            <h2>{error}</h2>
        </div>
    );
};
