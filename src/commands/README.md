# Commands
When a message is [received from the VS Code extension](https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing), a "command" from this directory will be executed.

Every message received must contain a `command` property. This tells us which command from this folder to run (case sensitive).

## accessToken
Receives the GitHub access token of the user from VS Code.

**Message Received**
```js
{
    command: "accessToken",
    data: string
}
```

## localAddons
Receives the list of addons found in the VS Code global storage for the `vscode-lua` (`sumneko.lua`) extension.

**Message Received**
```ts
{
    command: "localAddons",
    totalSize: number,
    addons: [
        {
            name: string,
            enabled: boolean,
            description: string,
            size: number,
            installDate: number | undefined,
            hasPlugin: boolean
        },
        ...
    ]
}
```

## workspaceOpen
Receives whether or not a workspace is currently open. Used to show/hide the enable/disable buttons.

**Message Received**
```ts
{
    command: "workspaceOpen",
    data: boolean
}
```
