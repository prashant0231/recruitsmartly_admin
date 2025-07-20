"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/redux/slices/auth/authSlice";
import Cookies from "js-cookie";
import { cookiesKey, localStorageKeys } from "@/constants/comman";

const navLinks = [
  { href: "/workspace/dashboard", label: "Dashboard" },
  //   { href: "/workspace/settings", label: "Settings" },
  //   { href: "/workspace/resumes", label: "Resumes" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(localStorageKeys.userDetails);
    Cookies.remove(cookiesKey.adminToken, { path: "/" });
    router.push("/auth/login");
  };

  return (
    <aside className="w-[20%] max-w-[200px] bg-white border-r shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold text-indigo-700  border-b">
          RecruitSmartly
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-md font-medium ${
                pathname === href
                  ? "bg-gray-200 text-black font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <UserCircle className="w-6 h-6 text-indigo-600" />
          <span>Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 transition"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
