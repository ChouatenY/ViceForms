"use client";

import { useEffect, useState } from "react";

export default function IframeTestPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      setMessages(prev => [...prev, {
        timestamp: new Date().toISOString(),
        origin: event.origin,
        data: event.data
      }]);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ViceForms Iframe Test</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Embed ViceForms in iframe:</h2>
        <iframe
          src="/dashboard"
          width="100%"
          height="600"
          className="border border-gray-300 rounded-lg"
          title="ViceForms Dashboard"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Messages from iframe:</h2>
        <div className="bg-gray-100 p-4 rounded-lg max-h-60 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages received yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-white rounded text-sm">
                <div className="font-mono text-xs text-gray-500">{msg.timestamp}</div>
                <div className="font-semibold">Origin: {msg.origin}</div>
                <pre className="text-xs">{JSON.stringify(msg.data, null, 2)}</pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
