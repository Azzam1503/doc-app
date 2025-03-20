import CredentialsProvider  from 'next-auth/providers/credentials';

const AuthOptions = {
    providers: [CredentialsProvider({
        name: "Login with email",
        credentials:{
            username: {label: "Username", type: "text", placeholder: "johndoe@email.com"},
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials, req){
            const username = credentials?.username;
            const password = credentials?.password;
            console.log(username, password);
            const user = {id: "1", name: "John Doe", email: "john@email.com"}

            if(user) return user;
            else return null;
        }
    })]
};

export default AuthOptions;