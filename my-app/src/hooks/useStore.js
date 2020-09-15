import { useContext } from 'react'
import { store } from '../store/index.js'

export default () => {
    const globalState = useContext(store)

    return {dispatch: globalState.dispatch, state: globalState.state};
}