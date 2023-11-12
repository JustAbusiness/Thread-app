import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount, userCreateUserAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContent } from "@/context/AuthContext";


function SignupForm() {
  const {toast} = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContent();
  const { isPending: isCreatingAccount,  mutateAsync: createUserAccount} = userCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  // Define the form
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });


  // Handler
  const HandleSignup = async (user: z.infer<typeof SignupValidation>) => {
      try {
        const newUser = await createUserAccount(user);

        if (!newUser) {
          toast({ title: "Sign up failed. Please try again.", });          
          return;
        }


        const session = await signInAccount({
          email: user.email,
          password: user.password,
        });

        if (!session) {
          toast({ title: "Sign up failed. Please try again.", });      
          navigate("/sign-in");

          return;
        }

        // Check if user is logged in
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
          form.reset();

          navigate("/");
        } else {
          return toast({ title: "Sign up failed. Please try again.", });
        }
        

      } catch (error) {
        console.log(error)
      }

  };

  return (
    <Form {...form}>
      <div className="sm:w-420 px-4 py-3 flex-center flex-col border-1 h-full bg-purple-600 rounded-lg shadow-[16px 14px 20px #0000008c]">
        <img src="/assets/images/logo.svg" alt="logo" className="items-center ml-[40%] h-full" />
        <h2 className="text-3xl font-semibold text-white pt-5 sm:pt-12 text-center">
          Create a new account
        </h2>
        <p className=" text-white text-center small-medium md:base-regular mt-2">
          To use 2hkt Social Media, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(HandleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-white">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-white">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-white">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <Button type="submit" className="shad-button_primary">
          {isCreatingAccount  ? (
            <div className="flex-center gap-2">
               <Loader /> Loading...
            </div>
            ) : (
              "Sign Up"
            )}
        </Button>
        
        <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-slate-200 hover:text-slate-400 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm;
