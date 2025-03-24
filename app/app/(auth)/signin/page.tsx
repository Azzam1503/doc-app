"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleSignInBtn from "@/components/googleSignInBtn";

const formSchema = z.object({
  email: z.string().email("This is not a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-slate-200 p-10 rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your email"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your password"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6 py-4" type="submit">
              Sign in
            </Button>
          </form>
          <div
            className="mx-auto my-4 flex w-full items-center justify-evenly
before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
          >
            or
          </div>
          <div>
            <GoogleSignInBtn>Sign in with google</GoogleSignInBtn>
            <p className="text-sm text-center text-gray-600 mt-2">
              If you don't have an account, please{" "}
              <Link className="text-blue-500 hover:underline" href={"/signup"}>
                Signup
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};
