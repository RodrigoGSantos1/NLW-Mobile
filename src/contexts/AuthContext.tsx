import { createContext, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    singIn: () => Promise<void>
    isUserLoading: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AutContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '513722185803-n9jlnbv8fj59dq5mlqfga2t0qq2oourm.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function singIn() {
        try {
            setIsUserLoading(true)
            await promptAsync();


        } catch (err) {
            console.log(err);
            throw err

        } finally {
            setIsUserLoading(false)
        }

    }

    async function singInWithGoogle(access_token: string){
        console.log("token", access_token);
        
    }

    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            singInWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AutContext.Provider value={{
            singIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AutContext.Provider>
    );
}