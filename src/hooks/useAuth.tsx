import { useContext } from 'react'

import { AutContext, AuthContextDataProps } from '../contexts/AuthContext'

export function useAuth(): AuthContextDataProps {
    const context = useContext(AutContext);

    return context
}