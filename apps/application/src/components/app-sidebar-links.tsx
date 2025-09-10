"use client";

import Link from "next/link";

import { ChevronDown } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigation } from "@/hooks/use-navigation";
import { mainItems, NavItem } from "@/lib/sidebar-links";
import { Logo } from "./logo";

export const AppSidebarLinks = () => {
  const { getNavItemClasses } = useNavigation();

  const renderNavItem = (item: NavItem) => {
    const { linkClasses, iconClasses, textClasses } = getNavItemClasses(item);

    // Se tem subitems, renderizar com Collapsible
    if (item.subitems && item.subitems.length > 0) {
      return (
        <Collapsible defaultOpen={false} className="group/collapsible">
          <CollapsibleTrigger asChild className="cursor-pointer">
            <SidebarMenuButton className={linkClasses}>
              <item.icon className={iconClasses} />
              <span className={textClasses}>{item.title}</span>
              <ChevronDown className="ml-auto cursor-pointer transition-transform group-data-[state=open]/collapsible:rotate-180 size-4" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subitems.map((subitem) => (
                <SidebarMenuSubItem key={subitem.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={subitem.url}
                      className="flex items-center gap-2"
                    >
                      <subitem.icon className="size-4" />
                      <span className="text-md">{subitem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    // Renderização padrão para itens sem subitems
    return (
      <SidebarMenuButton key={item.title} asChild>
        <Link href={item.url} className={linkClasses}>
          <item.icon className={iconClasses} />
          <span className={textClasses}>{item.title}</span>
          {item.items && item.items}
        </Link>
      </SidebarMenuButton>
    );
  };

  return (
    <SidebarGroup>
      <div className="mb-4 flex items-center border-b pb-4">
        <Logo />
      </div>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Main Navigation Items */}
          {mainItems.map((item) => (
            <SidebarMenuItem key={item.title} className="mb-2">
              {renderNavItem(item)}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
