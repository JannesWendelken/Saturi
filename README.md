# SATURI WALLET — Solana Chrome Extension

A dark terminal-inspired portfolio starter project: a Chrome Manifest V3 popup that reads public account balances from **Solana Devnet**.

## Included
- Custom SATURI WALLET identity and terminal-inspired interface.
- Public Solana address input.
- SOL balance lookup on Devnet.
- Solana Explorer link.

## Safety and scope
This is a **read-only prototype, not yet a functional signing wallet**. It does not generate/import keypairs, store secret material, connect to dApps, or sign/send transactions. It never asks for a seed phrase or private key.

## Requirements
- Node.js 18+
- Chrome or another Chromium browser

## Install and build
```bash
npm install
npm run build
```
Vite creates the extension in `dist/`.

## Load in Chrome
1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Choose **Load unpacked**.
4. Select this project's `dist` folder.
5. Pin SATURI WALLET from the extensions menu.

After editing source files, run `npm run build` and click Reload on the extension card.

## Test
Paste a public Solana address and click QUERY ACCOUNT. The query uses `https://api.devnet.solana.com`.

## Next milestones
1. Add key generation using a well-reviewed library.
2. Design password-based encryption and isolate signing from page scripts.
3. Add transaction preview, simulation and explicit approval.
4. Implement Solana Wallet Standard for dApp interoperability.
5. Add automated tests, threat modeling and independent security review before considering mainnet.

Never paste a seed phrase or private key into a website, issue, chat, or source file.
