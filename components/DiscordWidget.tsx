export default function DiscordWidget() {
  const truestring = true;
  return (
    <div className="bg-theme-surface/60 rounded-2xl p-4 shadow-soft">
      <iframe
        src="https://discord.com/widget?id=567897304908955649&theme=dark"
        width="100%"
        height="350"
        allowTransparency={truestring}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
      <div className="text-sm opacity-80 mt-2">
        <a className="underline" href="https://discord.gg/UnEKqTx" target="_blank">Open in Discord</a>
      </div>
    </div>
  );
}
