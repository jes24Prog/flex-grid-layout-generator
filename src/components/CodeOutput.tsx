
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CodeOutputProps {
  code: string;
  language: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCode = (code: string): string => {
    if (!code) return '';
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Generated Code</CardTitle>
        <Button
          onClick={handleCopyCode}
          variant="outline"
          size="sm"
          className="h-8 gap-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Code</span>
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md overflow-hidden">
          <pre className="bg-gray-50 p-4 overflow-x-auto text-sm border border-border rounded-md">
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: formatCode(code) }}
            ></code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeOutput;
