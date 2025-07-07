# ViceForms Iframe Integration Guide

## Required Iframe Configuration

To ensure ViceForms works properly in your iframe, use these exact settings:

### ✅ Correct Iframe Implementation

```jsx
<iframe
  ref={iframeRef}
  src="https://vice-forms.vercel.app/"
  className="w-full h-full border-0"
  title="Vice IDE Forms"
  onLoad={handleIframeLoad}
  onError={handleIframeError}
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-downloads"
  allow="clipboard-read; clipboard-write; fullscreen"
/>
```

### 🔧 Key Sandbox Permissions Required

- `allow-same-origin` - Required for API calls
- `allow-scripts` - Required for React/Next.js functionality
- `allow-forms` - Required for form submissions
- `allow-popups` - Required for certain UI interactions
- `allow-popups-to-escape-sandbox` - Required for external links
- `allow-top-navigation` - Required for navigation within the app
- `allow-downloads` - Required for any file downloads

### 📡 Message Communication

ViceForms will send these messages to the parent window:

```javascript
// Listen for messages from ViceForms
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://vice-forms.vercel.app') return;
  
  switch (event.data.type) {
    case 'IFRAME_READY':
      console.log('ViceForms is ready');
      break;
      
    case 'IFRAME_FORM_START':
      console.log('Form submission started');
      break;
      
    case 'IFRAME_FORM_SUCCESS':
      console.log('Form submission successful:', event.data.data);
      break;
      
    case 'IFRAME_FORM_ERROR':
      console.error('Form submission error:', event.data.error);
      break;
      
    case 'IFRAME_API_SUCCESS':
      console.log('API call successful:', event.data.url);
      break;
      
    case 'IFRAME_API_ERROR':
      console.error('API call failed:', event.data.url, event.data.error);
      break;
  }
});
```

### 🚀 Enhanced FormsPanel Component

Replace your current FormsPanel with this updated version:

```jsx
const FormsPanel: React.FC<FormsPanelProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const FORMS_URL = 'https://vice-forms.vercel.app/';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://vice-forms.vercel.app') return;
      
      console.log('Received message from ViceForms:', event.data);
      
      switch (event.data.type) {
        case 'IFRAME_READY':
          setIsLoading(false);
          setConnectionStatus('connected');
          setError(null);
          break;
          
        case 'IFRAME_FORM_SUCCESS':
          toast({
            title: 'Success',
            description: 'Form operation completed successfully',
          });
          break;
          
        case 'IFRAME_FORM_ERROR':
          toast({
            title: 'Error',
            description: event.data.error || 'Form operation failed',
            variant: 'destructive',
          });
          break;
          
        case 'IFRAME_ERROR':
          setError(event.data.error);
          setConnectionStatus('error');
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toast]);

  // Rest of your component...
  
  return (
    <div className="h-full w-full bg-background flex flex-col">
      {/* Your existing toolbar */}
      
      <div className="flex-1 relative bg-background">
        {/* Your existing loading/error states */}
        
        <iframe
          ref={iframeRef}
          src={FORMS_URL}
          className="w-full h-full border-0"
          title="Vice IDE Forms"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-downloads"
          allow="clipboard-read; clipboard-write; fullscreen"
        />
      </div>
      
      {/* Your existing footer */}
    </div>
  );
};
```

### 🔍 Testing

1. Test the iframe status endpoint: `https://vice-forms.vercel.app/api/iframe/status`
2. Check browser console for ViceForms messages
3. Verify save/publish buttons work correctly
4. Test form submissions and navigation

### 🐛 Troubleshooting

If save/publish buttons still don't work:

1. **Check sandbox permissions** - Ensure all required permissions are included
2. **Check console errors** - Look for CORS or permission errors
3. **Test API endpoint** - Visit `/api/iframe/status` to verify the app is working
4. **Check network tab** - Verify API calls are being made successfully

The key issue was likely the missing `allow-top-navigation` and insufficient sandbox permissions.
