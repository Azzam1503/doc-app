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
import GoogleSignInBtn from "./googleSignInBtn";

const formSchema = z
  .object({
    name: z.string().min(1, "Enter you name"),
    email: z.string().email("This is not a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const res = await fetch("api/user/signup", {
        method: "POST",
        body: JSON.stringify(values),
      });

      console.log(res);
    } catch (error) {
      console.log("this is the error", error);
    }
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
              name="name"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-md">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your name"
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
                      placeholder="enter password"
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
              name="confirmPassword"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel className="text-md">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-6 py-4" type="submit">
              Sign up
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
            <GoogleSignInBtn>Sign up with google</GoogleSignInBtn>
            <p className="text-sm text-center text-gray-600 mt-2">
              If you already have an account, please{" "}
              <Link className="text-blue-500 hover:underline" href={"/signin"}>
                Signin
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};
