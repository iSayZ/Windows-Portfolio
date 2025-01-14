import { WebViewProps } from './styles';

export const WebView: React.FC<WebViewProps> = ({ url }) => {
  return (
    <div className="w-full h-full bg-background backdrop-blur-2xl">
      <iframe
        src={url}
        className="w-full h-full border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
