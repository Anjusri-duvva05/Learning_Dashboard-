"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Award,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "#" },
  { id: "analytics", label: "Analytics", icon: BarChart2, href: "#" },
  { id: "achievements", label: "Achievements", icon: Award, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-textSecondary" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-surface md:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                  <Zap className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-bold text-textPrimary tracking-wide">LearnOS</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-border"
              >
                <X className="h-4 w-4 text-textSecondary" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-2" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    active={active}
                    collapsed={false}
                    onSelect={(id) => { setActive(id); setMobileOpen(false); }}
                  />
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative hidden h-full flex-shrink-0 flex-col border-r border-border bg-surface md:flex"
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20 shadow-glow-sm">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="ml-3 text-sm font-bold tracking-wider text-textPrimary"
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                active={active}
                collapsed={collapsed}
                onSelect={setActive}
              />
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-border px-3 py-4">
          <button
            className={clsx(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-textSecondary transition-colors hover:bg-border/60 hover:text-textPrimary",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-textSecondary shadow-card transition-colors hover:border-accent hover:text-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </motion.aside>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-surface/95 px-2 py-2 backdrop-blur-md md:hidden"
        aria-label="Bottom navigation"
      >
        {NAV_ITEMS.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={clsx(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors",
                isActive ? "text-accent" : "text-textSecondary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function NavItem({
  item,
  active,
  collapsed,
  onSelect,
}: {
  item: (typeof NAV_ITEMS)[0];
  active: string;
  collapsed: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = item.icon;
  const isActive = active === item.id;

  return (
    <li>
      <button
        onClick={() => onSelect(item.id)}
        className={clsx(
          "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          collapsed && "justify-center",
          isActive ? "text-textPrimary" : "text-textSecondary hover:text-textPrimary"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="nav-highlight"
            className="absolute inset-0 rounded-xl bg-accent/15 border border-accent/20"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Icon className="relative h-4 w-4 flex-shrink-0" />
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="relative"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
}
