import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';
const client_id=process.env.client_id as string;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

console.log(process.env.REACT_APP_CLIENT_ID!)
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
<App />
</GoogleOAuthProvider>);
