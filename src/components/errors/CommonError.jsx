import { useTypedSelector } from "../../hooks/useTypedSelector";

export const CommonError = () => {


    const { errorCode} = useTypedSelector(state => state.points);
    
    return (
        <div>{`Пожалуйста, повторите операцию или обратитесь в службу поддержки. Status code: ${errorCode}`} </div>
    )
}