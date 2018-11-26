import React from 'react'

interface Props {
    url: string;
    isAuthInitialized: boolean;
    setAuthToken(token: string): Promise<any>;
    initializeAuth(): Promise<any>;
}

export class AuthConnector extends React.Component<Props> {
    element: HTMLIFrameElement | null = null;

    eventListener = async (e: WindowEventMap["message"]) => {
        const {origin, data} = e;
        const url = new URL(this.props.url);
        if (origin !== url.origin) {
            return;
        }
        const {action, name, value} = data;
        if (action !== "postMessageEnhancer/UPDATED" || name !== "jwt") {
            return;
        }

        await this.props.setAuthToken(value);
        await this.props.initializeAuth();
    };

    componentDidMount() {
        if (this.element == null) {
            throw new Error("element must be defined by the time componentDidMount runs");
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

    componentWillUnmount() {
        window.removeEventListener("message", this.eventListener);
    }

    render() {
        return (
            <>
                {this.props.isAuthInitialized ? this.props.children : null}
                <iframe src={this.props.url}
                        ref={element => this.element = element}
                        style={{display: "none"}}/>
            </>
        );
    }
}