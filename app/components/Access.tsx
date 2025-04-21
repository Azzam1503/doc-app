"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Access() {
  const pathname = usePathname();
  const documentId = pathname?.split("/")[2];
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/document/get-user/" + documentId);
        const data = await res.json();
        console.log("These are permitted users", users);
        setUsers(data.users);
      };

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-black" variant="outline">
          Collabrate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Users</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <button
              disabled={email.length == 0}
              onClick={async () => {
                const res = await fetch("/api/document/add-user", {
                  method: "POST",
                  body: JSON.stringify({ email, documentId }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                const data = await res.json();
                console.log(data);
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          {users.map((user: any) => (
            <div key={user.userId} className="flex justify-between">
              <p className="text-black">{user.user.email}</p>
              <button>Remove</button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
