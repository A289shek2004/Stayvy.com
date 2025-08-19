import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MenuIcon, 
  UserIcon, 
  HeartIcon, 
  SettingsIcon, 
  LogOutIcon,
  HomeIcon,
  CloudRainIcon
} from "lucide-react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-dusky-hawthorne rounded-xl">
              <CloudRainIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RoseStay</h1>
              <p className="text-xs text-dusky-rose">Elegant Getaways</p>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search">
              <Button variant="ghost" className="text-white hover:text-dusky-rose hover:bg-white/10">
                Stays
              </Button>
            </Link>
            <Link to="/experiences">
              <Button variant="ghost" className="text-white hover:text-dusky-rose hover:bg-white/10">
                Experiences
              </Button>
            </Link>
            <Link to="/host/create">
              <Button variant="ghost" className="text-white hover:text-dusky-rose hover:bg-white/10">
                Host your place
              </Button>
            </Link>
          </div>

          {/* Right side - Auth & Profile */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  Log in
                </Button>
                <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                  Sign up
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Wishlist */}
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <HeartIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Profile Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 p-2 rounded-full border border-white/30 hover:bg-white/10 text-white">
                      <MenuIcon className="h-4 w-4" />
                      <Avatar className="h-7 w-7">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>
                          <UserIcon className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                      <HeartIcon className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/host")}>
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Host Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
