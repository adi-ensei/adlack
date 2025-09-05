import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

import * as Sentry from "@sentry/react";
import CallPage from "./pages/CallPage";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return (
    <SentryRoutes>
      <Route
        path="/"
        element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />}
      />
      <Route
        path="/auth"
        element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
      />
      <Route
        path="/call/:id"
        element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
      />

      {/* add call page */}
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/*"
        element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />}
      />
    </SentryRoutes>
  );
};

export default App;

// Routes before optimization of code
{
  /* <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to={"/auth"} replace />} />
        </SentryRoutes>
      </SignedOut> */
}
