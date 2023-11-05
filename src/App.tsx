import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import './globals.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

function App() {
 

  return (
    <main className='flex h-screen bg-purple-500 h-auto'>
      <Routes>  
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>

      </Routes>
      <Toaster />
    </main>
  )
}

export default App
