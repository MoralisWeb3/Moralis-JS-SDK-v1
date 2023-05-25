# Moralis SDK V1 & Wallet Connect V2 Demo

WalletConnect V1 is [deprecated and support will be removed in the future](https://medium.com/walletconnect/walletconnect-v1-0-sunset-notice-and-migration-schedule-8af9d3720d2e). This demo shows how to use WalletConnect V2 with Moralis SDK V1.

## Upgrade Your Project

1. Update the `moralis-v1` dependency to latest version.
2. Delete the `@walletconnect/web3-provider` dependency from your project.
3. Install `@walletconnect/ethereum-provider` and `@web3modal/standalone` dependencies.
4. Update the code calling the `Moralis.authenticate()` method. You need to pass the `projectId` option now. You can create the project id from the [WalletConnect dashboard](https://cloud.walletconnect.com/sign-in).

```ts
await Moralis.authenticate({
  provider: 'walletconnect',
  projectId: '<PROJECT_ID>',
  chainId: 1, // OPTIONAL
  newSession: true, // OPTIONAL
  rpcMap: { '1': 'https://rpc.domain.com/...' }, // OPTIONAL
  qrModalOptions: { themeMode: 'light' }, // OPTIONAL
});
```

5. The `mobileLinks` option is not supported anymore. Use `qrModalOptions` instead.

## Run This Demo Locally

1. Go to the `/` directory of this repository and run the `yarn link` command.
2. Build the SDK V1 by running the `npm ci && npm build` commands.
3. Open the `/demos/walletconnect-v2` directory and run the `yarn link-v1` command.
4. Copy `.env.example` to `.env` and fill out the required environment variables.
5. Build the demo by running the `yarn build` command.
6. Run the server by running the `yarn serve` command.
