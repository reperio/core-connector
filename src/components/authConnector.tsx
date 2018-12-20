import React from 'react'
import {Redirect} from "./redirect";

interface Props {
    url: string;
    loginUrl: string;
    authToken: string;
    setAuthToken(token: string): Promise<any>;
}

interface State {
    isInitialized: boolean;
    iframeAuthToken: string | null;
}

export class AuthConnector extends React.Component<Props, State> {
    element: HTMLIFrameElement | null = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            isInitialized: false,
            iframeAuthToken: null
        };
    }

    eventListener = async (e: WindowEventMap["message"]) => {
        const {origin, data} = e;
        const url = new URL(this.props.url);
        if (origin !== url.origin) {
            return;
        }
        const {action, name, value} = data as {action: string, name: string, value: string};
        if (action !== "postMessageEnhancer/UPDATED" || name !== "jwt") {
            return;
        }

        await this.props.setAuthToken(value);

        this.setState({
            ...this.state,
            isInitialized: true,
            iframeAuthToken: value,
        });
    };

    componentDidMount() {
        if (this.element == null) {
            throw new Error("element must be defined");
        }

        const element: HTMLIFrameElement = this.element;

        window.addEventListener("message", this.eventListener);

        element.addEventListener("load", () => {
            if (element.contentWindow == null) {
                throw new Error("element.contentWindow must be defined");
            }
            const url = new URL(this.props.url);
            element.contentWindow.postMessage({action: "postMessageEnhancer/SUBSCRIBE", subscribeTo: "jwt"}, url.origin);
        });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!this.state.isInitialized) {
            return;
        }

        if (this.element == null) {
            throw new Error("element must be defined");
        }

        if (this.element.contentWindow == null) {
            throw new Error("element.contentWindow must be defined");
        }

        if (this.props.authToken !== prevState.iframeAuthToken && this.props.authToken !== this.state.iframeAuthToken) {
            const url = new URL(this.props.url);
            this.element.contentWindow.postMessage({action: "postMessageEnhancer/UPDATE", subscribeTo: "jwt", value: this.props.authToken}, url.origin);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.eventListener);
    }

    render() {
        return (
            <>
                {this.state.isInitialized && this.props.authToken != null ? this.props.children : null}
                {this.state.isInitialized && this.props.authToken == null ? <Redirect url={this.props.loginUrl} /> : null}

                <iframe src={this.props.url}
                        ref={element => this.element = element}
                        style={{display: "none"}}/>
            </>
        );
    }
}