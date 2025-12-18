
import { Suspense } from 'react';
import AuthForm from './AuthForm';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  return (
    <Suspense fallback={
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
