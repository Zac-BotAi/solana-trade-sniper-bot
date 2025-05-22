
import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
  height?: number;
  interval?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({
  symbol = 'BTCUSD',
  theme = 'dark',
  autosize = true,
  height = 450,
  interval = '60',
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Create widget script
    const createWidget = () => {
      if (document.getElementById('tradingview-widget-script')) {
        initWidget();
        return;
      }
      
      // Create script element for TradingView widget
      const script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = initWidget;
      
      document.head.appendChild(script);
      scriptRef.current = script;
    };
    
    // Initialize widget after script loads
    const initWidget = () => {
      if (container.current && 'TradingView' in window) {
        const tradingViewObj = (window as any).TradingView;
        
        container.current.innerHTML = '';
        
        new tradingViewObj.widget({
          autosize,
          symbol,
          interval,
          timezone: 'Etc/UTC',
          theme,
          style: '1',
          locale: 'en',
          toolbar_bg: '#252A37',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: container.current.id,
          hide_volume: false,
          backgroundColor: theme === 'light' ? '#ffffff' : '#1A1F2C',
          gridColor: theme === 'light' ? '#F0F3FA' : '#232834',
        });
      }
    };

    createWidget();
    
    // Cleanup
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, interval, theme, autosize, height]);
  
  return (
    <div 
      id="tradingview-widget-container" 
      ref={container} 
      className={autosize ? "h-full w-full" : undefined}
      style={!autosize ? { height: `${height}px` } : undefined} 
    />
  );
});

TradingViewWidget.displayName = 'TradingViewWidget';

export default TradingViewWidget;
