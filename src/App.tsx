import { useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  ArrowDownLeft, ArrowUpRight, Copy, ExternalLink, RefreshCw,
  ShieldCheck, Sparkles, Wallet
} from "lucide-react";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export default function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function checkBalance() {
    setError("");
    setBalance(null);
    let publicKey: PublicKey;

    try {
      publicKey = new PublicKey(address.trim());
    } catch {
      setError("INVALID PUBLIC KEY FORMAT.");
      return;
    }

    setBusy(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch {
      setError("NODE CONNECTION FAILED. RETRY.");
    } finally {
      setBusy(false);
    }
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setError("CLIPBOARD ACCESS DENIED.");
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={17} /></div>
          <span>SATURI<span className="brand-light">_WALLET</span></span>
        </div>
        <div className="network-pill"><span className="online-dot" /> DEVNET</div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> SOLANA PORTFOLIO PROJECT</div>
        <h1>ACCESS THE<br /><span>CHAIN.</span></h1>
        <p className="subtitle">SOLANA INTERFACE // DEVNET NODE</p>
      </section>

      <section className="balance-card">
        <div className="balance-top">
          <span className="muted-label">ACCOUNT BALANCE</span>
          <div className="sol-token">◎ <span>SOL</span></div>
        </div>
        <div className="balance-value">
          {balance === null ? "— — —" : balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          <span className="balance-unit">SOL</span>
        </div>
        <div className="balance-note">
          {balance === null ? "AWAITING PUBLIC KEY INPUT" : "NODE RESPONSE // SOLANA DEVNET"}
        </div>
        <div className="card-orbit orbit-one" />
        <div className="card-orbit orbit-two" />
      </section>

      <section className="address-section">
        <label htmlFor="address">TARGET PUBLIC ADDRESS</label>
        <div className="address-input-wrap">
          <Wallet size={17} className="input-icon" />
          <input
            id="address"
            value={address}
            onChange={(event) => { setAddress(event.target.value); setError(""); setBalance(null); }}
            placeholder="ENTER SOLANA PUBLIC KEY..."
            spellCheck={false}
            autoComplete="off"
          />
          {address.trim() && (
            <button className="icon-button" onClick={copyAddress} title="Copy address" type="button">
              <Copy size={15} />
            </button>
          )}
        </div>
        {copied && <p className="success-message">PUBLIC KEY COPIED</p>}
        {error && <p className="error-message">{error}</p>}
        <button className="primary-button" onClick={checkBalance} disabled={busy || !address.trim()}>
          {busy ? <RefreshCw size={16} className="spin" /> : <RefreshCw size={16} />}
          {busy ? "QUERYING NODE…" : "QUERY ACCOUNT"}
        </button>
      </section>

      <section className="quick-actions">
        <div className="action-tile">
          <div className="action-icon"><ArrowDownLeft size={18} /></div>
          <div><strong>Receive</strong><span>NOT INSTALLED</span></div>
        </div>
        <div className="action-tile">
          <div className="action-icon"><ArrowUpRight size={18} /></div>
          <div><strong>Send</strong><span>NOT INSTALLED</span></div>
        </div>
      </section>

      {address.trim() && (
        <a className="explorer-link" href={`https://explorer.solana.com/address/${encodeURIComponent(address.trim())}?cluster=devnet`} target="_blank" rel="noreferrer">
          OPEN ON-CHAIN EXPLORER <ExternalLink size={13} />
        </a>
      )}

      <footer className="footer">
        <ShieldCheck size={14} />
        <span>READ-ONLY BUILD // NO SECRET KEYS STORED</span>
      </footer>
    </main>
  );
}
