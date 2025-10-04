'use client';

import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/LoginModal";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/"); // redirect if already logged in
  }, [user, router]);

  return <LoginModal />;
}