import React, {createContext, useState} from 'react';

const RoutineContext = createContext([{}, () => {}])

const RoutineProvider = (props) => {
    const [state, setState] = useState(

        {
        title: "",
        location: "",
        checked ,
        lists: []
    }
    
    );
    
    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>
}

export { RoutineContext, RoutineProvider };