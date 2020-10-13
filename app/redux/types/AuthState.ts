export interface AuthState{
    token: string;
    isLoading: boolean;
    userEmail: string;
    permissions: string[];
    hasError: boolean;
}