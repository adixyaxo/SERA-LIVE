import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { FloatingBackground } from '@/components/dashboard/FloatingBackground';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) toast.error(error.message);
    else {
      toast.success('Signed in successfully');
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) toast.error(error.message);
    else {
      toast.success('Account created successfully');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* === Floating Background === */}
      <FloatingBackground />
      
      {/* === Main Content === */}
      <main className="pt-20 sm:pt-32 pb-16 px-4 sm:px-8 min-h-screen relative z-10">
        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          
          {/* === Welcome Header === */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Welcome to SERA
            </h1>
            <p className="text-muted-foreground text-lg font-light">
              Your intelligent AI-powered routine assistant
            </p>
          </div>

          {/* === Auth Card === */}
          <Card className="glass border-white/20 backdrop-blur-xl shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-light">Get Started</CardTitle>
              <CardDescription className="text-base">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-muted/50">
                  <TabsTrigger 
                    value="signin" 
                    className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* === Sign In Form === */}
                <TabsContent value="signin" className="space-y-4 pt-6 animate-slide-in">
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-2xl h-12 border-border/50 bg-background/50 focus:bg-background/80 transition-all duration-200"
                      />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="rounded-2xl h-12 border-border/50 bg-background/50 focus:bg-background/80 transition-all duration-200"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full rounded-2xl h-12 text-base font-normal transition-all duration-200 hover:shadow-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* === Sign Up Form === */}
                <TabsContent value="signup" className="space-y-4 pt-6 animate-slide-in">
                  <form onSubmit={handleSignUp} className="space-y-5">
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="rounded-2xl h-12 border-border/50 bg-background/50 focus:bg-background/80 transition-all duration-200"
                      />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-2xl h-12 border-border/50 bg-background/50 focus:bg-background/80 transition-all duration-200"
                      />
                      <Input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="rounded-2xl h-12 border-border/50 bg-background/50 focus:bg-background/80 transition-all duration-200"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full rounded-2xl h-12 text-base font-normal transition-all duration-200 hover:shadow-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* === Additional Info === */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-light">
              Join thousands optimizing their daily routines with AI
            </p>
          </div>
        </div>
      </main>

      {/* === Signature === */}
      <div className="fixed bottom-2 right-2 text-[0.5rem] text-red-500 opacity-70 select-none z-50">
        made by aditya
      </div>
    </div>
  );
};

export default Auth;